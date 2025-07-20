import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { createHtmlPlugin } from "vite-plugin-html";
import { visualizer } from "rollup-plugin-visualizer";

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
        tags: [], // Remove CSS preload warning
      },
      minify: true,
      entry: "src/main.tsx",
      template: "index.html",
    }),
    visualizer({
      filename: "./dist/bundle-visualizer.html",
      open: true,
      gzipSize: true,
      brotliSize: true,
    }),
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
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-vendor';
            }
            if (id.includes('supabase')) {
              return 'supabase-vendor';
            }
            if (id.includes('sonner')) {
              return 'sonner-vendor';
            }
            if (id.includes('mdast-util-from-markdown')) {
              return 'markdown-vendor';
            }
            if (id.includes('@floating-ui')) {
              return 'floating-ui-vendor';
            }
            return 'vendor';
          }
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
