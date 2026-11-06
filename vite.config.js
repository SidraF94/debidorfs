import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/",
  preview: {
    allowedHosts: process.env.VITE_PREVIEW_ALLOWED_HOST
      ? [process.env.VITE_PREVIEW_ALLOWED_HOST]
      : [],
  },
});
