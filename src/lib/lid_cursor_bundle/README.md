# LiD Question Dataset (Cursor-ready)

This bundle contains the full **Leben in Deutschland** question set extracted from your uploaded PDF (Stand: 07.05.2025).

## Contents
- `data/lid/general.json` — 300 general questions
- `data/lid/states/*.json` — 16 state files × 10 questions each (160 total)
- `data/lid/meta.json` — source and counts
- `src/lib/lid/types.ts` — TypeScript types
- `src/lib/lid/index.ts` — helpers to load and build an exam set (30 general + 3 state)

> Source: your uploaded PDF (BAMF Gesamtfragenkatalog).  
> Generated: 2025-10-04T12:22:25.417679Z

## How to use in Cursor
1. Create/open a project in Cursor.
2. **Drag & drop** this folder (or the ZIP) into the workspace.
3. If you're using Node/Next.js server-side:
   ```ts
   import { buildExamSetNode } from "@/src/lib/lid";
   const set = buildExamSetNode("BE"); // 30 general + 3 Berlin
   ```
4. If you want to use the data in the browser:
   - Move `data/lid` under your framework's **public** directory (e.g. `public/lid` in Next.js).
   - Then:
     ```ts
     import { loadGeneralHttp, loadStateHttp, sample } from "@/src/lib/lid";
     const general = await loadGeneralHttp("/lid");
     const berlin = await loadStateHttp("BE", "/lid");
     const mock = [...sample(general, 30), ...sample(berlin, 3)];
     ```

### Notes
- Answers are **not included** in the PDF text; if you maintain an official answer key, you can merge it by `id`.
- `kind` is `"text"` or `"image-choice"` depending on whether the question references images.
- State codes: `BW BY BE BB HB HH HE MV NI NW RP SL SN ST SH TH`.

---
