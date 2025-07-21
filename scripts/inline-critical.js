import beasties from "beasties";
import { glob } from "glob";
import path from "path";
import fs from "fs/promises";

async function inlineCriticalCSS() {
  const distDir = path.resolve("dist");
  const htmlFile = path.join(distDir, "index.html");
  const cssFiles = await glob(path.join(distDir, "assets", "index-*.css"));

  if (!cssFiles.length) {
    console.error("No CSS file found!");
    process.exit(1);
  }

  const beast = new beasties({
    preload: "swap",
    compress: true,
  });

  const html = await fs.readFile(htmlFile, "utf8");
  const processed = await beast.process(html, {
    css: cssFiles,
    html: htmlFile,
  });
  await fs.writeFile(htmlFile, processed);
  console.log("Critical CSS inlined successfully!");
}

inlineCriticalCSS();
