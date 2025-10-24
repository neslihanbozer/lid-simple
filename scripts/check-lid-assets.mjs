import fs from "node:fs/promises";
import path from "node:path";

const PUB = path.join(process.cwd(), "public");
const JSON_PATH = path.join(PUB, "data", "questions_with_assets.json");

try {
  const raw = await fs.readFile(JSON_PATH, "utf8");
  const data = JSON.parse(raw);
  let missing = 0;

  for (const q of data.questions) {
    if (q.kind === "image-choice") {
      for (const c of ["A","B","C","D"]) {
          const rel = q.assets?.[c];
          if (!rel) { console.error("Missing asset field:", q.id, c); missing++; continue; }
          const fp = path.join(PUB, rel);
          try { await fs.access(fp); } catch { console.error("File not found:", q.id, c, fp); missing++; }
        }
    } else if (q.kind === "single-image") {
      const fp = path.join(PUB, q.asset);
      try { await fs.access(fp); } catch { console.error("File not found:", q.id, "STEM", fp); missing++; }
    }
  }
  
  if (missing) { 
    console.error(`❌ LiD assets missing: ${missing}`); 
    process.exit(1); 
  }
  console.log("✅ LiD assets OK.");
} catch (error) {
  console.error("❌ Error validating assets:", error);
  process.exit(1);
}
