import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
// Production builds use repo subpath for GitHub Pages project sites.
const GITHUB_PAGES_BASE = "/data-ai-tirana-hub/";

export default defineConfig(({ mode }) => ({
  base: mode === "development" ? "/" : GITHUB_PAGES_BASE,
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
