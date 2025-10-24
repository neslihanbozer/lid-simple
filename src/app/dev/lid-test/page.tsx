import fs from "node:fs";
import path from "node:path";

export default function Page() {
  const p = path.join(process.cwd(), "public", "data", "questions_with_assets.json");
  if (!fs.existsSync(p)) {
    return (
      <div className="p-6 space-y-4">
        <h1 className="text-2xl font-semibold">LiD test</h1>
        <p className="text-sm text-neutral-600">questions_with_assets.json nicht gefunden. Diese Dev-Seite wird im Build übersprungen.</p>
      </div>
    )
  }
  const data = JSON.parse(fs.readFileSync(p, "utf8"));

  const pick = (ids:string[]) =>
    ids.map((id:string)=> data.questions.find((q:any)=>q.id===id)).filter(Boolean);

  const prefer = pick(["GEN021","BE01","BY01"]);
  const rest = data.questions.filter((q:any)=> q.kind !== "text" && !prefer.find((x:any)=>x.id===q.id)).slice(0,8);
  const show = [...prefer, ...rest];

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-semibold">LiD test</h1>
      {show.map((q:any)=>(
        <section key={q.id} className="space-y-2">
          <h2 className="text-lg font-medium">{q.id}{q.state?` (${q.state})`:""} — <span className="opacity-70">{q.kind}</span></h2>
          {q.kind === "image-choice" ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {["A","B","C","D"].map(ch=>(
                <figure key={ch} className="border rounded-xl p-2">
                  <img src={q.assets[ch]} alt={`${q.id} ${ch}`} className="w-full h-40 object-contain" />
                  <figcaption className="text-sm mt-1">Bild {{"A":1,"B":2,"C":3,"D":4}[ch as "A"|"B"|"C"|"D"]}</figcaption>
                </figure>
              ))}
            </div>
          ) : q.kind === "single-image" ? (
            <img src={q.asset} alt={`${q.id} stem`} className="w-full h-48 object-contain border rounded-xl p-2" />
          ) : (
            <p className="text-sm text-neutral-500 italic">Text-only question</p>
          )}
        </section>
      ))}
    </div>
  );
}
