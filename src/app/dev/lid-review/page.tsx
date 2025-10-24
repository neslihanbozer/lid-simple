"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import type { ChoiceId, Box, Overrides } from "@/types/lid-review";

type SnapIndex = Record<string, { file: string }>;
const LABELS: ChoiceId[] = ["A","B","C","D"];

export default function Page() {
  const [idx, setIdx] = useState<SnapIndex>({});
  const [ids, setIds] = useState<string[]>([]);
  const [cur, setCur] = useState(0);
  const [overrides, setOverrides] = useState<Overrides>({});
  const [active, setActive] = useState<ChoiceId>("A");
  const [drawing, setDrawing] = useState<{startX:number; startY:number} | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [boxes, setBoxes] = useState<Partial<Record<ChoiceId, Box>>>({});

  useEffect(() => {
    fetch("/assets/lid/snapshots/index.json").then(r=>r.json()).then((j: any) => {
      const ordered = Object.keys(j).sort((a,b)=>a.localeCompare(b));
      setIdx(j); setIds(ordered);
    });
    fetch("/api/lid/overrides").then(r=>r.json()).then((j:Overrides)=> setOverrides(j));
  }, []);

  const qid = ids[cur];
  useEffect(() => {
    if (!qid) return;
    const ov = overrides[qid];
    if (ov && ov.kind === "image-choice") setBoxes({ ...ov.boxes });
    else setBoxes({});
  }, [qid, overrides]);

  const src = useMemo(() => (qid ? idx[qid]?.file : ""), [qid, idx]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imgRef.current || !qid) return;
    const rect = imgRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const y = Math.max(0, Math.min(e.clientY - rect.top, rect.height));
    const scaleX = (imgRef.current.naturalWidth / rect.width);
    const scaleY = (imgRef.current.naturalHeight / rect.height);
    const px = Math.round(x * scaleX);
    const py = Math.round(y * scaleY);
    const W = 320, H = 240;
    const bx = Math.max(0, px - Math.round(W/2));
    const by = Math.max(0, py - Math.round(H/2));
    const box: Box = { x: bx, y: by, w: W, h: H };
    setBoxes(prev => ({ ...prev, [active]: box }));
  };

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imgRef.current) return;
    const rect = imgRef.current.getBoundingClientRect();
    setDrawing({ startX: e.clientX - rect.left, startY: e.clientY - rect.top });
  };

  const onMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imgRef.current || !drawing) return;
    const rect = imgRef.current.getBoundingClientRect();
    const ex = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const ey = Math.max(0, Math.min(e.clientY - rect.top, rect.height));
    const x = Math.min(drawing.startX, ex);
    const y = Math.min(drawing.startY, ey);
    const w = Math.abs(ex - drawing.startX);
    const h = Math.abs(ey - drawing.startY);
    const scaleX = (imgRef.current.naturalWidth / rect.width);
    const scaleY = (imgRef.current.naturalHeight / rect.height);
    const box: Box = { x: Math.round(x*scaleX), y: Math.round(y*scaleY), w: Math.round(w*scaleX), h: Math.round(h*scaleY) };
    setBoxes(prev => ({ ...prev, [active]: box }));
    setDrawing(null);
  };

  const save = async () => {
    if (!qid) return;
    const next: Overrides = { ...overrides, [qid]: { kind: "image-choice", boxes } };
    const res = await fetch("/api/lid/overrides", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(next) });
    if (res.ok) setOverrides(next); else alert("Save failed");
  };

  useEffect(() => {
    const onKey = (ev: KeyboardEvent) => {
      if (ev.key === "1") setActive("A");
      else if (ev.key === "2") setActive("B");
      else if (ev.key === "3") setActive("C");
      else if (ev.key === "4") setActive("D");
      else if (ev.key.toLowerCase() === "n") setCur(c => Math.min(c+1, Math.max(0, ids.length-1)));
      else if (ev.key.toLowerCase() === "p") setCur(c => Math.max(0, c-1));
      else if (ev.key === "Enter") save();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [ids.length, boxes, overrides, qid]);

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">LiD Reviewer</h1>
      <div className="flex items-center gap-3">
        <select className="border rounded px-2 py-1" value={qid || ""} onChange={(e)=> setCur(Math.max(0, ids.indexOf(e.target.value)))}>
          {ids.map(id => <option key={id} value={id}>{id}</option>)}
        </select>
        <div className="flex gap-2">
          {["A","B","C","D"].map(l => (
            <button key={l as ChoiceId}
              onClick={()=> setActive(l as ChoiceId)}
              className={`px-3 py-1 rounded border ${active===l ? "bg-black text-white" : ""}`}>{l}</button>
          ))}
        </div>
        <button onClick={()=> setCur(c => Math.max(0, c-1))} className="px-3 py-1 rounded border">Prev (P)</button>
        <button onClick={()=> setCur(c => Math.min(c+1, Math.max(0, ids.length-1)))} className="px-3 py-1 rounded border">Next (N)</button>
        <button onClick={save} className="px-3 py-1 rounded border">Save (Enter)</button>
      </div>

      <div className="relative border rounded-xl overflow-hidden select-none"
        onMouseDown={onMouseDown} onMouseUp={onMouseUp} onClick={handleClick}>
        {src && <img ref={imgRef} src={src} alt={qid} className="w-full h-auto block" />}
        {(["A","B","C","D"] as ChoiceId[]).map(l => {
          const b = (boxes as any)[l]; if (!b) return null;
          return (
            <div key={l}
              style={{ position:"absolute", left:0, top:0, border:"2px solid #10b981",
                           transform:`translate(${b.x}px, ${b.y}px)`, width: b.w, height: b.h,
                           pointerEvents:"none" }}>
              <span style={{ position:"absolute", left:4, top:4, background:"rgba(0,0,0,.6)", color:"#fff", padding:"2px 6px", borderRadius:6, fontSize:12 }}>{l}</span>
            </div>
          );
        })}
      </div>

      <p className="text-sm text-gray-500">
        Kısayollar: 1–4=A–D, N/P, Enter. Tek tık sabit kutu, sürükle-bırak özel kutu.
      </p>
    </div>
  );
}
