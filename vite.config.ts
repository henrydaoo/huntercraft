import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
// @ts-expect-error: No types for critters
import Critters from "critters";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    {
      name: "vite:critters",
      enforce: "post",
      apply: "build",
      async generateBundle(_, bundle) {
        const critters = new Critters({
          // You can customize Critters options here
          preload: "swap",
        });
        for (const file of Object.values(bundle)) {
          if (file.type === "asset" && file.fileName.endsWith(".html")) {
            file.source = await critters.process(file.source.toString());
          }
        }
      },
    },
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
