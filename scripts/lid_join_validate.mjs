import fs from "node:fs/promises";
import path from "node:path";
import { parse } from "csv-parse/sync";

const PUB = path.join(process.cwd(), "public");
const DATA = path.join(PUB, "data");
const textPath = path.join(DATA, "questions_text.json");
const imgsPath = path.join(DATA, "images_map.json");
const outPath = path.join(DATA, "questions_full.json");
const AJSON = path.join(process.cwd(), "content", "answers.json");
const ACSV = path.join(process.cwd(), "content", "answers.csv");

const ChoiceIds = ["A", "B", "C", "D"];
const has = async p => !!(await fs.stat(p).catch(() => null));
const exists = async p => { try { await fs.access(p); return true; } catch { return false; } };

function normalizeStem(s) {
  return (s || "")
    .replace(/\s+/g, " ")
    .replace(/[\u25A0\u25A1\u25A2\u25A3\u25A9\u25AA\u25AB\u25CF\u25CB▪■□◻•●]/g, "")
    .replace(/(?:Bild\s*[1-4]\s*){1,8}/gi, "")
    .replace(/\s+/g, " ")
    .trim();
}
const normChoice = s => (s || "").replace(/^[^\wÄÖÜäöüß]+/, "").replace(/\s+/g, " ").trim();

const text = JSON.parse(await fs.readFile(textPath, "utf8"));
const imgs = JSON.parse(await fs.readFile(imgsPath, "utf8"));

let answers = {};
if (await has(AJSON)) {
  for (const r of JSON.parse(await fs.readFile(AJSON, "utf8"))) answers[r.id] = { answer: r.answer, explanation: r.explanation || "" };
} else if (await has(ACSV)) {
  for (const r of parse(await fs.readFile(ACSV, "utf8"), { columns: true, skip_empty_lines: true })) answers[r.id] = { answer: r.answer, explanation: r.explanation || "" };
} else {
  console.warn("⚠️ answers.json/csv missing — using placeholders (A).");
}

const imgById = {};
for (const it of (imgs.images || [])) {
  (imgById[it.id] ||= { slots: [], assets: {} }).slots.push(it.slot);
  if (it.slot === "STEM") imgById[it.id].assets.stem = it.path;
  else imgById[it.id].assets[it.slot] = it.path;
}

const out = [];
let errors = 0;
for (const q of text.questions || []) {
  const id = q.id;
  const stemImgs = imgById[id]?.assets?.stem ? [imgById[id].assets.stem] : [];
  const assets = q.choices.reduce((acc, c) => { acc[c.id] = imgById[id]?.assets?.[c.id]; return acc; }, {});
  const anyImg = Object.values(assets).some(Boolean);
  const allImg = ChoiceIds.every(k => !!assets[k]);
  const slots = imgById[id]?.slots || [];

  const ans = (answers[id]?.answer || "A").toUpperCase();
  const expl = answers[id]?.explanation || "";

  // fs existence
  async function ensureFile(rel) {
    if (!rel) return true;
    const fp = path.join(PUB, rel.replace(/^\/+/, ""));
    if (!(await exists(fp))) { console.error("❌ Missing file:", id, rel); errors++; return false; }
    return true;
  }
  for (const s of stemImgs) await ensureFile(s);
  for (const k of ChoiceIds) if (assets[k]) await ensureFile(assets[k]);

  out.push({
    id, section: q.section, state: q.state ?? null, number: q.number,
    text: normalizeStem(q.text),
    stem: { images: stemImgs },
    choices: q.choices.map(c => ({ id: c.id, text: normChoice(c.text), image: assets[c.id] || undefined })),
    answer: ChoiceIds.includes(ans) ? ans : "A",
    explanation: expl,
    source: { stand: "unknown", slots }
  });

  if (anyImg && !allImg) { console.error("❌", id, "image-choice incomplete (need 4)"); errors++; }
  if (!ChoiceIds.includes(ans)) { console.error("❌", id, "invalid answer id"); errors++; }
}
if (errors) { console.error("❌ LiD build failed with", errors, "error(s)"); process.exit(1); }

await fs.writeFile(outPath, JSON.stringify({ questions: out }, null, 2), "utf8");
console.log("✅ Wrote", outPath, "—", out.length, "questions");
