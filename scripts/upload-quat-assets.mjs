import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { readFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

// Cloudinary free plan giới hạn 10MB/ảnh. Nén ảnh nguồn (PNG ~20-34MB) thành
// JPEG chất lượng cao, cạnh dài tối đa 3000px — vẫn thừa nét cho web.
const MAX_EDGE = 3000;
const JPEG_QUALITY = 86;

async function prepareImage(buffer) {
  return sharp(buffer)
    .rotate()
    .resize({ width: MAX_EDGE, height: MAX_EDGE, fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
    .toBuffer();
}

const projectRoot = process.cwd();
const sourceDir = "C:\\Users\\ndcpr\\Downloads\\Làng Quạt";
const rootFolder = "GioTuLangLandingPage";
const craftFolder = `${rootFolder}/crafts/quat`;

// type: "image" | "video"
const assets = [
  // Di sản & câu chuyện làng
  { fileName: "ảnh chính.png", publicId: "thuy-dinh", type: "image" },
  { fileName: "ảnh chính (2).png", publicId: "dinh-lang", type: "image" },
  { fileName: "ảnh chính 3.png", publicId: "bia-di-tich", type: "image" },
  { fileName: "ảnh chính 4.png", publicId: "bia-den-van-vo", type: "image" },
  // Sản phẩm quạt
  { fileName: "ảnh quạt.png", publicId: "quat-tranh-lang-que", type: "image" },
  { fileName: "ảnh quạt (2).png", publicId: "quat-ve-nhan-vat", type: "image" },
  { fileName: "ảnh quạt 3.png", publicId: "quat-ve-tich-co", type: "image" },
  { fileName: "ảnh quạt 4.png", publicId: "quat-nan-xuyen-sang", type: "image" },
  { fileName: "ảnh quạt 5.png", publicId: "quat-rong", type: "image" },
  { fileName: "ảnh quạt 6.png", publicId: "quat-the-bong", type: "image" },
  // Quy trình & con người
  { fileName: "xưởng sản xuất quạt.png", publicId: "xuong-san-xuat", type: "image" },
  { fileName: "chỗ người dân làm quạt, lưu trữ quạt.png", publicId: "nguoi-dan-lam-quat", type: "image" },
  { fileName: "quá trình phơi khô quạt.png", publicId: "phoi-nan-quat", type: "image" },
  { fileName: "quạt bày dưới đất.png", publicId: "quat-bay-phoi", type: "image" },
  // Video
  { fileName: "video chính 1.mp4", publicId: "video-lang-quat-1", type: "video" },
  { fileName: "video chính 2(video dài).mp4", publicId: "video-lang-quat-2", type: "video" },
];

const mimeByExt = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".mp4": "video/mp4",
};

function readEnvFile(filePath) {
  if (!existsSync(filePath)) return {};
  return readFileSync(filePath, "utf8")
    .split(/\r?\n/)
    .reduce((env, line) => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) return env;
      const match = trimmed.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
      if (!match) return env;
      const [, key, rawValue] = match;
      const value = rawValue.replace(/^['"]|['"]$/g, "").trim();
      if (value) env[key] = value;
      return env;
    }, {});
}

function loadCloudinaryEnv() {
  return {
    ...readEnvFile(path.join(projectRoot, ".env")),
    ...readEnvFile(path.join(projectRoot, ".env.local")),
    ...process.env,
  };
}

function signUpload(params, apiSecret) {
  const payload = Object.entries(params)
    .filter(([, value]) => value !== undefined && value !== null && value !== "")
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
  return createHash("sha1").update(`${payload}${apiSecret}`).digest("hex");
}

async function uploadAsset(asset, config) {
  const filePath = path.join(sourceDir, asset.fileName);
  let buffer = await readFile(filePath);
  let mime = mimeByExt[path.extname(asset.fileName).toLowerCase()] ?? "application/octet-stream";

  if (asset.type === "image") {
    buffer = await prepareImage(buffer);
    mime = "image/jpeg";
  }

  const timestamp = Math.floor(Date.now() / 1000).toString();
  const paramsToSign = {
    folder: craftFolder,
    invalidate: "true",
    overwrite: "true",
    public_id: asset.publicId,
    timestamp,
  };
  const signature = signUpload(paramsToSign, config.apiSecret);
  const endpoint = `https://api.cloudinary.com/v1_1/${config.cloudName}/${asset.type}/upload`;

  let response;
  if (asset.type === "video") {
    // File lớn: gửi nhị phân qua multipart, tránh giới hạn data-URI base64 (~60MB).
    const form = new FormData();
    form.set("file", new Blob([buffer], { type: mime }), asset.fileName);
    form.set("api_key", config.apiKey);
    form.set("signature", signature);
    for (const [k, v] of Object.entries(paramsToSign)) form.set(k, v);
    response = await fetch(endpoint, { method: "POST", body: form });
  } else {
    const body = new URLSearchParams({
      ...paramsToSign,
      api_key: config.apiKey,
      file: `data:${mime};base64,${buffer.toString("base64")}`,
      signature,
    });
    response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    });
  }

  const result = await response.json();
  if (!response.ok) {
    throw new Error(`${asset.fileName}: ${result.error?.message ?? response.statusText}`);
  }

  return {
    fileName: asset.fileName,
    type: asset.type,
    publicId: result.public_id,
    secureUrl: result.secure_url,
    bytes: result.bytes,
    duration: result.duration,
  };
}

const env = loadCloudinaryEnv();
const config = {
  cloudName: env.CLOUDINARY_CLOUD_NAME,
  apiKey: env.CLOUDINARY_API_KEY,
  apiSecret: env.CLOUDINARY_API_SECRET,
};

for (const [key, value] of Object.entries(config)) {
  if (!value) throw new Error(`Missing Cloudinary config: ${key}`);
}

const only = process.env.ONLY; // lọc theo publicId, vd: ONLY=video-lang-quat-2
const queue = only ? assets.filter((a) => a.publicId === only) : assets;

const uploaded = [];
for (const asset of queue) {
  const r = await uploadAsset(asset, config);
  uploaded.push(r);
  console.error(`✓ [${r.type}] ${asset.fileName} → ${r.publicId}${r.duration ? ` (${r.duration}s)` : ""}`);
}

console.log(JSON.stringify(uploaded, null, 2));
