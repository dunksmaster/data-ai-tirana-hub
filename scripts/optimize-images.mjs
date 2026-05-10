/**
 * Generates WebP variants for meetup JPEGs, organizer PNGs, and og-cover.webp.
 * Run: npm run optimize-images
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const meetupsDir = path.join(root, "public", "meetups");
const assetsDir = path.join(root, "src", "assets");

async function main() {
  const meetupFiles = fs.readdirSync(meetupsDir).filter((f) => /\.jpe?g$/i.test(f));
  if (!meetupFiles.length) {
    console.warn("No JPEG meetup images found in public/meetups");
  }

  for (const file of meetupFiles) {
    const inputPath = path.join(meetupsDir, file);
    const outName = file.replace(/\.jpe?g$/i, ".webp");
    const outputPath = path.join(meetupsDir, outName);
    await sharp(inputPath)
      .rotate()
      .resize({ width: 1600, withoutEnlargement: true })
      .webp({ quality: 82, effort: 4 })
      .toFile(outputPath);
    const inStat = fs.statSync(inputPath);
    const outStat = fs.statSync(outputPath);
    console.log(`${file} → ${outName} (${(inStat.size / 1e6).toFixed(2)} MB → ${(outStat.size / 1e3).toFixed(0)} KB)`);
  }

  const firstMeetup = meetupFiles[0] && path.join(meetupsDir, meetupFiles[0]);
  if (firstMeetup && fs.existsSync(firstMeetup)) {
    const ogPath = path.join(root, "public", "og-cover.webp");
    await sharp(firstMeetup)
      .rotate()
      .resize({ width: 1200, height: 630, fit: "cover", position: "attention" })
      .webp({ quality: 82, effort: 4 })
      .toFile(ogPath);
    console.log("og-cover.webp written for social previews");
  }

  for (const name of ["dhimiter-gero", "dorian-kane"]) {
    const pngPath = path.join(assetsDir, `${name}.png`);
    const webpPath = path.join(assetsDir, `${name}.webp`);
    if (!fs.existsSync(pngPath)) {
      console.warn(`Skip ${name}: ${pngPath} missing`);
      continue;
    }
    await sharp(pngPath)
      .resize({ width: 320, withoutEnlargement: true })
      .webp({ quality: 88, effort: 4 })
      .toFile(webpPath);
    console.log(`${name}.png → ${name}.webp`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
