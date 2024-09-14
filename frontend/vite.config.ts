import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
import { UserConfig as VitestUserConfig } from "vitest/config";

dotenv.config();

const vitestConfig: VitestUserConfig = {
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./tests/setup.ts",
    css: true,
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    "process.env.VITE_DATABASE_IP": JSON.stringify(
      process.env.VITE_DATABASE_IP,
    ),
  },
  server: {
    port: 3000,
    headers: {
      "Referrer-Policy": "strict-origin-when-cross-origin",
    },
  },
  build: {
    outDir: "dist",
    assetsDir: "assets",
  },
  assetsInclude: ["**/*.ttf"],
  ...vitestConfig,
});
