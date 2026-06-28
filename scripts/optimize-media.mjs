// Optimize all project videos in public/work/<slug>/ for the web AND generate
// a poster image for each video (used as the hover thumbnail + fast first
// paint in the gallery).
//   Run:  npm run optimize
// - Compresses any video that isn't already web-sized (H.264, longest side
//   1280px, faststart) and converts .mov/.webm to .mp4.
// - Writes posters to public/work/<slug>/posters/<name>.jpg.
// Safe to run repeatedly — already-optimized files and existing posters are
// skipped.

import { execSync } from "node:child_process";
import {
  readdirSync,
  statSync,
  renameSync,
  unlinkSync,
  existsSync,
  mkdirSync,
} from "node:fs";
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

function makePoster(video, poster) {
  // grab a frame ~1s in (skips black intros); fall back to the first frame
  try {
    execSync(
      `ffmpeg -y -ss 1 -i "${video}" -frames:v 1 -vf "scale=720:-2" "${poster}"`,
      { stdio: "ignore" },
    );
  } catch {
    execSync(`ffmpeg -y -i "${video}" -frames:v 1 -vf "scale=720:-2" "${poster}"`, {
      stdio: "ignore",
    });
  }
}

let optimized = 0;
let posters = 0;
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
    const outMp4 = full.replace(VIDEO, ".mp4");

    if (isMp4 && sizeMB < 3 && long > 0 && long <= 1280) {
      skipped++;
    } else {
      const tmp = full.replace(VIDEO, ".opt.tmp.mp4");
      console.log(`Optimizing ${slug}/${file} (${sizeMB.toFixed(1)} MB)…`);
      execSync(
        `ffmpeg -y -i "${full}" -vf "scale='if(gt(iw,ih),min(1280,iw),-2)':'if(gt(iw,ih),-2,min(1280,ih))'" -c:v libx264 -pix_fmt yuv420p -crf 26 -preset veryfast -c:a aac -b:a 128k -movflags +faststart "${tmp}"`,
        { stdio: "ignore" },
      );
      if (!isMp4) unlinkSync(full);
      renameSync(tmp, outMp4);
      optimized++;
    }

    // Ensure a poster exists for this video.
    const base = path.basename(outMp4, ".mp4");
    const postersDir = path.join(dir, "posters");
    const poster = path.join(postersDir, `${base}.jpg`);
    if (!existsSync(poster)) {
      mkdirSync(postersDir, { recursive: true });
      console.log(`  poster → posters/${base}.jpg`);
      makePoster(outMp4, poster);
      posters++;
    }
  }
}

console.log(
  `\nDone. Optimized ${optimized} video(s), made ${posters} poster(s), skipped ${skipped} already-optimized.`,
);
