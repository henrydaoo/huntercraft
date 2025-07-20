import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { createHtmlPlugin } from "vite-plugin-html";
import { visualizer } from "rollup-plugin-visualizer";
import beasties from "beasties";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    createHtmlPlugin({
      inject: {
        tags: [
          {
            tag: "link",
            attrs: {
              rel: "preload",
              as: "style",
              href: "/assets/index-*.css",
              onload: "this.rel='stylesheet'",
            },
            injectTo: "head",
          },
        ],
      },
      minify: true,
      entry: "src/main.tsx",
      template: "index.html",
    }),
    visualizer({ open: true }),
  ],
  build: {
    minify: "terser",
    terserOptions: {
      compress: true,
      mangle: true,
      format: {
        comments: false,
      },
    },
    sourcemap: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
