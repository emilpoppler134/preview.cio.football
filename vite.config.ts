import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  preview: {
    host: "0.0.0.0",
    port: 4173,
    allowedHosts: ["cio.football", "localhost", "127.0.0.1"],
  },
  server: {
    host: "0.0.0.0",
    allowedHosts: ["cio.football", "localhost", "127.0.0.1"],
  },
});
