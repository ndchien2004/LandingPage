import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { readFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const projectRoot = process.cwd();
const rootFolder = "GioTuLangLandingPage";
const folder = `${rootFolder}/map`;

const MAX_EDGE = 2752;
const JPEG_QUALITY = 90;

// Bản đồ di sản phiên bản NGANG (desktop/tablet) dùng cho MapHero.
// Giữ đúng public_id cũ "banner-di-san" để URL trong code không phải đổi.
const SOURCE_FILE =
  "C:\\Users\\ndcpr\\Downloads\\Logo + banner\\Gemini_Generated_Image_xe1ckdxe1ckdxe1c.png";
const PUBLIC_ID = "banner-di-san";

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

/** Xóa sạch ảnh cũ trên Cloudinary + invalidate CDN. */
async function destroyAsset(publicId, config) {
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const fullId = `${folder}/${publicId}`;
  const paramsToSign = { invalidate: "true", public_id: fullId, timestamp };
  const body = new URLSearchParams({
    ...paramsToSign,
    api_key: config.apiKey,
    signature: signParams(paramsToSign, config.apiSecret),
  });
  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${config.cloudName}/image/destroy`,
    { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body },
  );
  const result = await res.json();
  if (!res.ok) throw new Error(`destroy ${fullId}: ${result.error?.message ?? res.statusText}`);
  return result; // { result: "ok" | "not found" }
}

async function uploadAsset(filePath, publicId, config) {
  const buffer = await prepareImage(await readFile(filePath));
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const paramsToSign = {
    folder,
    invalidate: "true",
    overwrite: "true",
    public_id: publicId,
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
  if (!res.ok) throw new Error(`upload ${publicId}: ${result.error?.message ?? res.statusText}`);
  return { publicId: result.public_id, secureUrl: result.secure_url, width: result.width, height: result.height };
}

const env = loadCloudinaryEnv();
const config = {
  cloudName: env.CLOUDINARY_CLOUD_NAME,
  apiKey: env.CLOUDINARY_API_KEY,
  apiSecret: env.CLOUDINARY_API_SECRET,
};
for (const [k, v] of Object.entries(config)) if (!v) throw new Error(`Missing Cloudinary config: ${k}`);

const destroyed = await destroyAsset(PUBLIC_ID, config);
console.error(`🗑  destroy ${folder}/${PUBLIC_ID} → ${destroyed.result}`);

const uploaded = await uploadAsset(SOURCE_FILE, PUBLIC_ID, config);
console.error(`✓ upload → ${uploaded.publicId} (${uploaded.width}x${uploaded.height})`);
console.log(JSON.stringify(uploaded, null, 2));
