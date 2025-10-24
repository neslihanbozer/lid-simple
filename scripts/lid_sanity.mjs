import fs from "node:fs/promises";
import path from "node:path";

const DATA = path.join(process.cwd(), "public", "data", "questions_full.json");
const raw = JSON.parse(await fs.readFile(DATA, "utf8"));
let bad = 0, notes = [];

for (const q of raw.questions) {
  if (/Bild\s*1/i.test(q.text)) { bad++; notes.push(`${q.id}: stem contains 'Bild 1..4' text`); }
  const any = q.choices.some((c) => !!c.image), all = q.choices.every((c) => !!c.image || c.image === undefined ? !!c.image : false);
  if (any && !q.choices.every(c => !!c.image)) { bad++; notes.push(`${q.id}: image-choice missing one or more A-D images`); }
  if (!["A", "B", "C", "D"].includes(q.answer)) { bad++; notes.push(`${q.id}: invalid answer '${q.answer}'`); }
  for (const c of q.choices) {
    if (/^[^\wÄÖÜäöüß]/.test(c.text || "")) { bad++; notes.push(`${q.id} ${c.id}: leading bullet/box in choice text`); }
  }
}
if (bad) { console.error("❌ Sanity errors:", bad, "\n" + notes.slice(0, 50).join("\n")); process.exit(1); }
console.log("✅ sanity ok on", raw.questions.length, "questions");
