import fs from "node:fs/promises";
import path from "node:path";

const PUB = path.join(process.cwd(), "public");

const removeList = [
  "data/questions.json", "data/lid_questions.json", "data/general.json", "data/be.json", "data/by.json", "data/state.json",
  "assets/lid/raw", "assets/lid/tmp", "assets/lid/imageMap.json", "assets/lid/imageChoiceMap.json"
];

async function rm(rel) { 
  try { 
    await fs.rm(path.join(PUB, rel), { recursive: true, force: true }); 
    console.log("Removed:", rel);
  } catch {} 
}

for (const r of removeList) await rm(r);

await fs.mkdir(path.join(PUB, "assets", "lid", "states"), { recursive: true });
await fs.mkdir(path.join(PUB, "assets", "lid", "general"), { recursive: true });
await fs.mkdir(path.join(PUB, "assets", "lid", "snapshots"), { recursive: true });
await fs.mkdir(path.join(PUB, "assets", "lid", "qa_preview"), { recursive: true });

console.log("✅ Cleanup done.");
