import fs from "node:fs";
import path from "node:path";
import { normalizeStem, normalizeChoice } from "@/lib/lid/text";

export const dynamic = "force-static";

function Img({ src, alt }: { src: string; alt: string }) {
  return <img src={src} alt={alt} className="w-16 h-16 object-contain" loading="lazy" decoding="async" />;
}

export default function Page() {
  const p = path.join(process.cwd(), "public", "data", "questions_full.json");
  const data = JSON.parse(fs.readFileSync(p, "utf8"));
  const list = data.questions.slice(0, 10);
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Leben in Deutschland – Quiz</h1>
      {list.map((q: any) => (
        <section key={q.id} className="border rounded-xl p-4 space-y-3">
          {!!q.stem.images?.length && (
            <div className="flex flex-wrap gap-3">
              {q.stem.images.map((s: string, i: number) => (
                <img key={i} src={s} alt={`${q.id}-stem-${i}`} className="max-h-32 object-contain border rounded p-1" />
              ))}
            </div>
          )}
          <p className="text-lg leading-relaxed">{normalizeStem(q.text)}</p>
          <div className="space-y-2">
            {q.choices.map((c: any) => (
              <label key={c.id} className="flex items-center gap-3 border rounded-md p-3">
                <input type="radio" name={q.id} value={c.id} />
                {c.image ? <Img src={c.image} alt={`${q.id}-${c.id}`} /> : null}
                <span className="text-sm">({c.id}) {normalizeChoice(c.text)}</span>
              </label>
            ))}
          </div>
          <p className="text-xs text-neutral-500">Antwort: {q.answer}</p>
        </section>
      ))}
    </div>
  );
}