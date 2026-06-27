// Optimize all project videos in public/work/<slug>/ for the web.
// Run:  npm run optimize
// Compresses any video that isn't already web-sized (H.264, longest side
// 1280px, faststart) and converts .mov/.webm to .mp4. Already-optimized
// files are skipped, so it's safe to run repeatedly.

import { execSync } from "node:child_process";
import { readdirSync, statSync, renameSync, unlinkSync } from "node:fs";
import path from "node:path";

const ROOT = path.join(process.cwd(), "public", "work");
const VIDEO = /\.(mp4|mov|webm)$/i;

function longestSide(file) {
  try {
    const out = execSync(
      `ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=p=0 "${file}"`,
    )
      .toString()
      .trim();
    const [w, h] = out.split(",").map(Number);
    return Math.max(w || 0, h || 0);
  } catch {
    return 0;
  }
}

let optimized = 0;
let skipped = 0;

let folders = [];
try {
  folders = readdirSync(ROOT);
} catch {
  console.error("No public/work folder found.");
  process.exit(0);
}

for (const slug of folders) {
  const dir = path.join(ROOT, slug);
  if (!statSync(dir).isDirectory()) continue;

  for (const file of readdirSync(dir)) {
    if (!VIDEO.test(file)) continue;
    const full = path.join(dir, file);
    const sizeMB = statSync(full).size / 1024 / 1024;
    const isMp4 = /\.mp4$/i.test(file);
    const long = longestSide(full);

    // Already small + web-sized + mp4 → leave it alone.
    if (isMp4 && sizeMB < 3 && long > 0 && long <= 1280) {
      skipped++;
      continue;
    }

    const outMp4 = full.replace(VIDEO, ".mp4");
    const tmp = full.replace(VIDEO, ".opt.tmp.mp4");
    console.log(`Optimizing ${slug}/${file} (${sizeMB.toFixed(1)} MB)…`);
    execSync(
      `ffmpeg -y -i "${full}" -vf "scale='if(gt(iw,ih),min(1280,iw),-2)':'if(gt(iw,ih),-2,min(1280,ih))'" -c:v libx264 -pix_fmt yuv420p -crf 26 -preset veryfast -c:a aac -b:a 128k -movflags +faststart "${tmp}"`,
      { stdio: "ignore" },
    );
    if (!isMp4) unlinkSync(full); // drop the original .mov/.webm
    renameSync(tmp, outMp4);
    optimized++;
  }
}

console.log(`\nDone. Optimized ${optimized}, skipped ${skipped} already-optimized.`);
