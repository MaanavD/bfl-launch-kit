import dotenv from "dotenv";
dotenv.config();

import { createInterface } from "node:readline";
import { runPipeline } from "./pipeline.js";

const videoId = process.argv[2];

if (!videoId) {
  console.error("\n\u274c Usage: node src/trigger.js <youtube-video-id> [--face headshot.jpg] [--desc \"description\"]\n");
  console.error("   Example: node src/trigger.js dQw4w9WgXcQ --face ../examples/headshot.jpg\n");
  process.exit(1);
}

// Check for --face flag
const faceFlagIndex = process.argv.indexOf("--face");
const facePath = faceFlagIndex !== -1 ? process.argv[faceFlagIndex + 1] : null;

// Check for --desc flag or prompt interactively
const descFlagIndex = process.argv.indexOf("--desc");
let customDescription = descFlagIndex !== -1 ? process.argv[descFlagIndex + 1] : null;

if (!customDescription) {
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  customDescription = await new Promise((resolve) => {
    rl.question(
      "\n📝 Enter a description for the thumbnail (or press Enter to use the YouTube description):\n> ",
      (answer) => {
        rl.close();
        resolve(answer.trim() || null);
      }
    );
  });
}

runPipeline(videoId, { customDescription, facePath }).catch((err) => {
  console.error(`\n💥 Pipeline failed: ${err.message}\n`);
  process.exit(1);
});
