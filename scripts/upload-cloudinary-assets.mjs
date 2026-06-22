import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { readFile } from "node:fs/promises";
import path from "node:path";

const projectRoot = process.cwd();
const sourceDir = "C:\\Users\\ndcpr\\Downloads\\Logo + banner";
const rootFolder = "GioTuLangLandingPage";

const assets = [
  {
    fileName: "Banner.png",
    folder: `${rootFolder}/banner`,
    publicId: "main-banner",
    label: "heroBanner",
  },
  {
    fileName: "Logo no background.png",
    folder: `${rootFolder}/logo`,
    publicId: "logo-transparent",
    label: "logoTransparent",
  },
  {
    fileName: "Logo normal.png",
    folder: `${rootFolder}/logo`,
    publicId: "logo-normal",
    label: "logoNormal",
  },
  {
    fileName: "Logo black version (2).png",
    folder: `${rootFolder}/logo`,
    publicId: "logo-black",
    label: "logoBlack",
  },
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
    folder: asset.folder,
    invalidate: "true",
    overwrite: "true",
    public_id: asset.publicId,
    timestamp,
  };

  const body = new URLSearchParams({
    ...paramsToSign,
    api_key: config.apiKey,
    file: `data:image/png;base64,${buffer.toString("base64")}`,
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
}

console.log(JSON.stringify(uploaded, null, 2));
