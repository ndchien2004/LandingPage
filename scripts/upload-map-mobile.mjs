import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { readFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const projectRoot = process.cwd();
const rootFolder = "GioTuLangLandingPage";
const folder = `${rootFolder}/map`;

const MAX_EDGE = 3000;
const JPEG_QUALITY = 86;

// Bản đồ di sản phiên bản DỌC dùng cho MapHero trên mobile.
const assets = [
  {
    filePath: "C:\\Users\\ndcpr\\Downloads\\Logo + banner\\z7969821708454_2cf6130825f1c448a092d4a44d564b10.jpg",
    publicId: "banner-di-san-mobile",
  },
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

function signUpload(params, apiSecret) {
  const payload = Object.entries(params)
    .filter(([, v]) => v !== undefined && v !== null && v !== "")
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => `${k}=${v}`)
    .join("&");
  return createHash("sha1").update(`${payload}${apiSecret}`).digest("hex");
}

async function uploadAsset(asset, config) {
  const buffer = await prepareImage(await readFile(asset.filePath));
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
    signature: signUpload(paramsToSign, config.apiSecret),
  });

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${config.cloudName}/image/upload`,
    { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body },
  );
  const result = await res.json();
  if (!res.ok) throw new Error(`${asset.publicId}: ${result.error?.message ?? res.statusText}`);
  return { publicId: result.public_id, secureUrl: result.secure_url, width: result.width, height: result.height };
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
  console.error(`✓ ${asset.publicId} → ${r.publicId} (${r.width}x${r.height})`);
}
console.log(JSON.stringify(uploaded, null, 2));
