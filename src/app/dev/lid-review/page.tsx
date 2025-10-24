import fs from "node:fs";
import path from "node:path";

export const dynamic = "force-static";

export default function Page() {
  const p = path.join(process.cwd(), "public", "data", "questions_full.json");
  const data = JSON.parse(fs.readFileSync(p, "utf8"));
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-semibold">LiD Data Review</h1>
      <p className="text-sm text-neutral-600">İlk 30 soru</p>
      {data.questions.slice(0, 30).map((q: any) => (
        <details key={q.id} className="border rounded p-3">
          <summary className="cursor-pointer">{q.id} — {q.section}{q.state ? ` (${q.state})` : ""} — Antwort: {q.answer}</summary>
          {q.stem.images?.[0] ? <img src={q.stem.images[0]} className="max-h-32 object-contain mt-2" /> : null}
          <p className="mt-2 text-sm">{q.text}</p>
          <ul className="mt-2 grid gap-1">
            {q.choices.map((c: any) => (
              <li key={c.id} className="flex items-center gap-2">{c.image && <img src={c.image} className="w-10 h-10 object-contain" />} <span>({c.id}) {c.text}</span></li>
            ))}
          </ul>
        </details>
      ))}
    </div>
  );
}