import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { readFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

// Cloudinary free plan giới hạn 10MB/ảnh. Nén ảnh nguồn (PNG ~2-22MB) thành
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
const sourceDir = "C:\\Users\\ndcpr\\Downloads\\ảnh tin tức";
const rootFolder = "GioTuLangLandingPage";

// Media tin tức: mỗi "bài N" (đánh số theo file Word) một thư mục articles/bai-N.
// type: "image" | "video"; filePath tương đối so với sourceDir.
const assets = [
  // Bài 3 — Quạt cổ Việt Nam, di sản đang bị nhầm lẫn
  ...[
    "1.png",
    "2.png",
    "IMG_1105.png",
    "IMG_1106.png",
    "IMG_1107.png",
    "IMG_1108.png",
    "IMG_1129.png",
    "IMG_1130.png",
    "IMG_1131.png",
    "IMG_1132.png",
  ].map((f, i) => ({
    filePath: `bài 3\\ảnh thoại đã được xử lý\\${f}`,
    folder: "articles/bai-3",
    publicId: `anh-${i + 1}`,
    type: "image",
  })),
  // Bài 4 — Giới thiệu nghề làm quạt cổ (video)
  { filePath: "Bài 4 (final).mp4", folder: "articles/bai-4", publicId: "video", type: "video" },
  // Bài 5 — Chân dung nhân vật
  { filePath: "bài 5.png", folder: "articles/bai-5", publicId: "anh-1", type: "image" },
  // Bài 6 — Nỗi trăn trở sau những cánh quạt Chàng Sơn
  ...[1, 2, 3].map((n) => ({
    filePath: `Bài 6-20260719T071407Z-1-001\\Bài 6\\${n}.png`,
    folder: "articles/bai-6",
    publicId: `anh-${n}`,
    type: "image",
  })),
  // Bài 7 — Chi tiết thẩm mỹ
  ...[1, 2, 3, 4, 5, 6].map((n) => ({
    filePath: `Bài 7-20260719T071418Z-1-001\\Bài 7\\${n}.png`,
    folder: "articles/bai-7",
    publicId: `anh-${n}`,
    type: "image",
  })),
  // Bài 8 — Chiếc quạt cuối cùng bạn cầm trên tay là khi nào?
  { filePath: "bai 8.png", folder: "articles/bai-8", publicId: "anh-1", type: "image" },
  // Bài 9 — Chiếc quạt và lời ru (video)
  { filePath: "bài 9.MP4", folder: "articles/bai-9", publicId: "video", type: "video" },
  // Bài 10 — Chiếc quạt trong đời sống người Việt
  ...["1JSP0IQIC_8TBJ1D.jpg", "1JSP0IQIC_8TBJ1D 2.jpg", "1JSP0IQIC_8TBJ1D 3.jpg", "1JSP0IQIC_8TBJ1D 4.jpg"].map(
    (f, i) => ({
      filePath: `Bài 10-20260719T071617Z-1-001\\Bài 10\\${f}`,
      folder: "articles/bai-10",
      publicId: `anh-${i + 1}`,
      type: "image",
    }),
  ),
  // Bài 13 — Quy trình nghề (video)
  { filePath: "bài 13.MP4", folder: "articles/bai-13", publicId: "video", type: "video" },
  // Bài 14 — Decor nhà cửa
  ...[1, 2, 3, 4, 5].map((n) => ({
    filePath: `Bài 14-20260719T071658Z-1-001\\Bài 14\\${n}.png`,
    folder: "articles/bai-14",
    publicId: `anh-${n}`,
    type: "image",
  })),
  // Bài 15 — Thời trang
  ...[1, 2, 3, 4, 5, 6, 7].map((n) => ({
    filePath: `Bài 15-20260719T071701Z-1-001\\Bài 15\\${n}.jpg`,
    folder: "articles/bai-15",
    publicId: `anh-${n}`,
    type: "image",
  })),
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
  const filePath = path.join(sourceDir, asset.filePath);
  let buffer = await readFile(filePath);
  let mime = mimeByExt[path.extname(asset.filePath).toLowerCase()] ?? "application/octet-stream";

  if (asset.type === "image") {
    buffer = await prepareImage(buffer);
    mime = "image/jpeg";
  }

  const timestamp = Math.floor(Date.now() / 1000).toString();
  const paramsToSign = {
    folder: `${rootFolder}/${asset.folder}`,
    invalidate: "true",
    overwrite: "true",
    public_id: asset.publicId,
    timestamp,
  };
  const signature = signUpload(paramsToSign, config.apiSecret);
  const endpoint = `https://api.cloudinary.com/v1_1/${config.cloudName}/${asset.type}/upload`;

  let response;
  if (asset.type === "video") {
    // File lớn: gửi nhị phân qua multipart, tránh giới hạn data-URI base64.
    const form = new FormData();
    form.set("file", new Blob([buffer], { type: mime }), path.basename(asset.filePath));
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
    throw new Error(`${asset.filePath}: ${result.error?.message ?? response.statusText}`);
  }

  return {
    filePath: asset.filePath,
    type: asset.type,
    publicId: result.public_id,
    secureUrl: result.secure_url,
    width: result.width,
    height: result.height,
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

const only = process.env.ONLY; // lọc theo folder, vd: ONLY=articles/bai-9
const queue = only ? assets.filter((a) => a.folder === only) : assets;

const uploaded = [];
for (const asset of queue) {
  const r = await uploadAsset(asset, config);
  uploaded.push(r);
  console.error(
    `✓ [${r.type}] ${asset.folder}/${asset.publicId} (${(r.bytes / 1024).toFixed(0)}KB${r.duration ? `, ${r.duration}s` : ""}, ${r.width}x${r.height})`,
  );
}

console.log(JSON.stringify(uploaded, null, 2));
