import { generate } from 'critical';
import { glob } from 'glob';

const cssFiles = await glob('dist/assets/index-*.css');
if (!cssFiles.length) {
  console.error('No CSS file found!');
  process.exit(1);
}

const targets = [
  { width: 375, height: 667 }, // mobile
  { width: 1300, height: 900 }, // desktop
];

(async () => {
  for (const { width, height } of targets) {
    await generate({
      inline: true,
      base: 'dist/',
      src: 'index.html',
      css: cssFiles,
      width,
      height,
      target: {
        html: 'index.html',
      },
      ignore: {
        atrule: ['@font-face', '@import'],
      },
      strict: true,
    });
  }
  console.log('Critical CSS inlined successfully!');
})();
