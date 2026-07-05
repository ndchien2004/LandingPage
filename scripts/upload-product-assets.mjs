import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { readFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const projectRoot = process.cwd();
const rootFolder = "GioTuLangLandingPage";
// Thư mục mới trên Cloudinary dành riêng cho ảnh sản phẩm.
const folder = `${rootFolder}/products`;

const MAX_EDGE = 1600;
const JPEG_QUALITY = 86;

const sourceDir =
  "C:\\Users\\ndcpr\\Downloads\\Ảnh sản phẩm web-20260703T074859Z-3-001\\Ảnh sản phẩm web";

// 11 ảnh sản phẩm thật (tab Sản phẩm) + 7 ảnh quy trình xử lý tre (để dành cho trang Nghề Tre).
const assets = [
  // — Quạt —
  { file: "Ảnh quạt\\Quạt Cổ - Cổ Nâu Trầm.png", publicId: "quat-co-nau-tram" },
  { file: "Ảnh quạt\\quạt giấy đông hồ-lợn đàn.png", publicId: "quat-dong-ho-lon-dan" },
  { file: "Ảnh quạt\\Quạt Tư Pháp.png", publicId: "quat-thu-phap" },
  { file: "Ảnh quạt\\Quạt đại gỗ - Phong Cảnh Làng Quê Việt.png", publicId: "quat-dai-go-phong-canh" },
  // — Mộc —
  { file: "ảnh mộc\\Bộ hoành phi câu đối sơn son thếp vàng.png", publicId: "moc-hoanh-phi-cau-doi" },
  { file: "ảnh mộc\\Bộ Đồ Thờ Chạm Khắc Cổ.png", publicId: "moc-do-tho-cham-khac" },
  { file: "ảnh mộc\\Nội thất gỗ truyền thống.png", publicId: "moc-noi-that-truyen-thong" },
  { file: "ảnh mộc\\Tượng Nghê Gỗ.png", publicId: "moc-tuong-nghe-go" },
  // — Tre (sản phẩm) —
  { file: "ảnh nghề tre\\Chuồn chuồn tre.png", publicId: "tre-chuon-chuon" },
  { file: "ảnh nghề tre\\Dỏ tre.png", publicId: "tre-gio-tre" },
  { file: "ảnh nghề tre\\Đồ gia dụng đan tre.png", publicId: "tre-do-gia-dung" },
  // — Tre (ảnh quy trình, chưa dùng ở tab Sản phẩm) —
  { file: "ảnh nghề tre\\xử lý tre.png", publicId: "tre-xu-ly-1" },
  { file: "ảnh nghề tre\\xử lý tre 2.png", publicId: "tre-xu-ly-2" },
  { file: "ảnh nghề tre\\xử lý tre 3.png", publicId: "tre-xu-ly-3" },
  { file: "ảnh nghề tre\\xử lý tre 4.png", publicId: "tre-xu-ly-4" },
  { file: "ảnh nghề tre\\xử lý tre 5.png", publicId: "tre-xu-ly-5" },
  { file: "ảnh nghề tre\\xử lý tre 6.png", publicId: "tre-xu-ly-6" },
  { file: "ảnh nghề tre\\xử lý che 7.png", publicId: "tre-xu-ly-7" },
];

async function prepareImage(buffer) {
  return sharp(buffer)
    .rotate()
    .resize({ width: MAX_EDGE, height: MAX_EDGE, fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
    .toBuffer();
}

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

function signParams(params, apiSecret) {
  const payload = Object.entries(params)
    .filter(([, v]) => v !== undefined && v !== null && v !== "")
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => `${k}=${v}`)
    .join("&");
  return createHash("sha1").update(`${payload}${apiSecret}`).digest("hex");
}

async function uploadAsset(asset, config) {
  const buffer = await prepareImage(await readFile(path.join(sourceDir, asset.file)));
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const paramsToSign = {
    folder,
    invalidate: "true",
    overwrite: "true",
    public_id: asset.publicId,
    timestamp,
  };
  const body = new URLSearchParams({
    ...paramsToSign,
    api_key: config.apiKey,
    file: `data:image/jpeg;base64,${buffer.toString("base64")}`,
    signature: signParams(paramsToSign, config.apiSecret),
  });
  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${config.cloudName}/image/upload`,
    { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body },
  );
  const result = await res.json();
  if (!res.ok) throw new Error(`${asset.publicId}: ${result.error?.message ?? res.statusText}`);
  return { publicId: result.public_id, width: result.width, height: result.height };
}

const env = loadCloudinaryEnv();
const config = {
  cloudName: env.CLOUDINARY_CLOUD_NAME,
  apiKey: env.CLOUDINARY_API_KEY,
  apiSecret: env.CLOUDINARY_API_SECRET,
};
for (const [k, v] of Object.entries(config)) if (!v) throw new Error(`Missing Cloudinary config: ${k}`);

const uploaded = [];
for (const asset of assets) {
  const r = await uploadAsset(asset, config);
  uploaded.push(r);
  console.error(`✓ ${r.publicId} (${r.width}x${r.height})`);
}
console.log(JSON.stringify(uploaded, null, 2));
