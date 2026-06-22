import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { readFile } from "node:fs/promises";
import path from "node:path";

const projectRoot = process.cwd();
const sourceDir = "C:\\Users\\ndcpr\\Downloads\\Làng mộc";
const rootFolder = "GioTuLangLandingPage";
const craftFolder = `${rootFolder}/crafts/moc`;

// Phân bổ ảnh theo từng vai trò trong trang Nghề Mộc.
const assets = [
  { fileName: "1.jpg", publicId: "tu-lieu-non-tan", label: "tuLieuNonTan" },
  { fileName: "2.jpg", publicId: "nghe-nhan-cham-khac", label: "ngheNhan" },
  { fileName: "3.jpg", publicId: "ban-tay-cham-khac", label: "banTay" },
  { fileName: "4.jpg", publicId: "cham-hoa-van", label: "chamHoaVan" },
  { fileName: "5.jpg", publicId: "khong-gian-nha-go", label: "khongGianNhaGo" },
  { fileName: "6.jpg", publicId: "cua-vong-cham", label: "cuaVong" },
  { fileName: "7.jpg", publicId: "chi-tiet-cham", label: "chiTietCham" },
  { fileName: "8.jpg", publicId: "lap-dung-noi-that", label: "lapDung" },
  { fileName: "9.jpg", publicId: "tao-tac", label: "taoTac" },
  { fileName: "10.jpg", publicId: "xuong-moc", label: "xuongMoc" },
];

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
  const buffer = await readFile(filePath);
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const paramsToSign = {
    folder: craftFolder,
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

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${config.cloudName}/image/upload`,
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    },
  );

  const result = await response.json();
  if (!response.ok) {
    throw new Error(`${asset.fileName}: ${result.error?.message ?? response.statusText}`);
  }

  return {
    label: asset.label,
    fileName: asset.fileName,
    publicId: result.public_id,
    secureUrl: result.secure_url,
  };
}

const env = loadCloudinaryEnv();
const config = {
  cloudName: env.CLOUDINARY_CLOUD_NAME,
  apiKey: env.CLOUDINARY_API_KEY,
  apiSecret: env.CLOUDINARY_API_SECRET,
};

for (const [key, value] of Object.entries(config)) {
  if (!value) {
    throw new Error(`Missing Cloudinary config: ${key}`);
  }
}

const uploaded = [];
for (const asset of assets) {
  uploaded.push(await uploadAsset(asset, config));
  console.error(`✓ ${asset.fileName} → ${craftFolder}/${asset.publicId}`);
}

console.log(JSON.stringify(uploaded, null, 2));
