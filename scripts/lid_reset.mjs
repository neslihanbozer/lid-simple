import fs from "node:fs/promises";
import path from "node:path";

const PUB = path.join(process.cwd(), "public");
const DATA = path.join(PUB, "data");
const LID = path.join(PUB, "assets", "lid");

const rm = async p => fs.rm(p, { recursive: true, force: true }).catch(() => {});

await fs.mkdir(DATA, { recursive: true });
await fs.mkdir(LID, { recursive: true });
await rm(path.join(DATA, "questions_text.json"));
await rm(path.join(DATA, "images_map.json"));
await rm(path.join(DATA, "questions_full.json"));
await rm(path.join(LID, "export"));

console.log("✅ LiD reset: derived files cleaned.");
