/// <reference types="vitest" />
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import plugin from "@vitejs/plugin-react";
import fs from "fs";
import path from "path";
import child_process from "child_process";
import { env } from "process";
import dotenv from "dotenv";
import { chunkSplitPlugin } from 'vite-plugin-chunk-split';

const baseFolder =
  env.APPDATA !== undefined && env.APPDATA !== ""
    ? `${env.APPDATA}/ASP.NET/https`
    : `${env.HOME}/.aspnet/https`;

const certificateName = "playlistapp.client";
const certFilePath = path.join(baseFolder, `${certificateName}.pem`);
const keyFilePath = path.join(baseFolder, `${certificateName}.key`);

if (!fs.existsSync(certFilePath) || !fs.existsSync(keyFilePath)) {
  if (
    0 !==
    child_process.spawnSync(
      "dotnet",
      [
        "dev-certs",
        "https",
        "--export-path",
        certFilePath,
        "--format",
        "Pem",
        "--no-password",
      ],
      { stdio: "inherit" }
    ).status
  ) {
  }
}

// Load environment variables
dotenv.config();
const isNoCert = process.env.VITE_CERT === "true";

export default defineConfig({
  plugins: [plugin(), chunkSplitPlugin()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      // Add any additional aliases here
    },
  },
  server: {
    port: 5174,
    https: isNoCert
      ? {
          key: fs.readFileSync(keyFilePath),
          cert: fs.readFileSync(certFilePath),
        }
      : undefined,
  },
  
});
