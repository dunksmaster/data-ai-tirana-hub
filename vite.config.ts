import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
// Relative base in production so assets resolve on GitHub Pages project sites
// (any repo name, with or without trailing-slash redirects).
export default defineConfig(({ mode }) => ({
  base: mode === "development" ? "/" : "./",
  server: {
    // `true` binds all interfaces and tends to behave better on Windows than `::` alone.
    host: true,
    port: 8080,
    strictPort: false,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
