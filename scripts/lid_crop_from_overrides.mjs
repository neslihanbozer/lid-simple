import fs from "node:fs/promises";
import path from "node:path";
import { createCanvas, loadImage } from "canvas";

const PUB = path.join(process.cwd(), "public");
const OVERRIDES_FILE = path.join(PUB, "data", "overrides.json");
const SNAPS_DIR = path.join(PUB, "assets", "lid", "snapshots");
const ASSETS_DIR = path.join(PUB, "assets", "lid");

async function cropFromOverrides() {
  try {
    const overridesRaw = await fs.readFile(OVERRIDES_FILE, "utf8");
    const overrides = JSON.parse(overridesRaw);
    
    const imageMap = {};
    const questions = [];
    
    for (const [qid, override] of Object.entries(overrides)) {
      if (override.kind === "image-choice") {
        const assets = {};
        const snapPath = path.join(SNAPS_DIR, `${qid}.png`);
        
        try {
          const img = await loadImage(snapPath);
          const canvas = createCanvas(img.width, img.height);
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0);
          
          for (const [choiceId, box] of Object.entries(override.boxes)) {
            if (box) {
              const cropCanvas = createCanvas(box.w, box.h);
              const cropCtx = cropCanvas.getContext("2d");
              cropCtx.drawImage(canvas, box.x, box.y, box.w, box.h, 0, 0, box.w, box.h);
              
              const outDir = qid.startsWith("GEN") 
                ? path.join(ASSETS_DIR, "general")
                : path.join(ASSETS_DIR, "states", qid.substring(0, 2));
              
              await fs.mkdir(outDir, { recursive: true });
              
              const filename = `${qid}_${choiceId}.png`;
              const filepath = path.join(outDir, filename);
              
              const buffer = cropCanvas.toBuffer("image/png");
              await fs.writeFile(filepath, buffer);
              
              assets[choiceId] = `/assets/lid/${qid.startsWith("GEN") ? "general" : `states/${qid.substring(0, 2)}`}/${filename}`;
            }
          }
          
          imageMap[qid] = {
            kind: "image-choice",
            state: qid.startsWith("GEN") ? null : qid.substring(0, 2),
            assets,
            page: 1 // Placeholder
          };
          
          questions.push({
            id: qid,
            section: qid.startsWith("GEN") ? "general" : "state",
            state: qid.startsWith("GEN") ? null : qid.substring(0, 2),
            text: `Question ${qid}`,
            choices: [
              { id: "A", text: "Bild 1" },
              { id: "B", text: "Bild 2" },
              { id: "C", text: "Bild 3" },
              { id: "D", text: "Bild 4" }
            ],
            kind: "image-choice",
            assets
          });
          
        } catch (error) {
          console.error(`Error processing ${qid}:`, error);
        }
      } else if (override.kind === "single-image") {
        const snapPath = path.join(SNAPS_DIR, `${qid}.png`);
        
        try {
          const img = await loadImage(snapPath);
          const canvas = createCanvas(override.box.w, override.box.h);
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, override.box.x, override.box.y, override.box.w, override.box.h, 0, 0, override.box.w, override.box.h);
          
          const outDir = qid.startsWith("GEN") 
            ? path.join(ASSETS_DIR, "general")
            : path.join(ASSETS_DIR, "states", qid.substring(0, 2));
          
          await fs.mkdir(outDir, { recursive: true });
          
          const filename = `${qid}.png`;
          const filepath = path.join(outDir, filename);
          
          const buffer = canvas.toBuffer("image/png");
          await fs.writeFile(filepath, buffer);
          
          const asset = `/assets/lid/${qid.startsWith("GEN") ? "general" : `states/${qid.substring(0, 2)}`}/${filename}`;
          
          imageMap[qid] = {
            kind: "single-image",
            state: qid.startsWith("GEN") ? null : qid.substring(0, 2),
            asset,
            page: 1 // Placeholder
          };
          
          questions.push({
            id: qid,
            section: qid.startsWith("GEN") ? "general" : "state",
            state: qid.startsWith("GEN") ? null : qid.substring(0, 2),
            text: `Question ${qid}`,
            choices: [
              { id: "A", text: "Option A" },
              { id: "B", text: "Option B" },
              { id: "C", text: "Option C" },
              { id: "D", text: "Option D" }
            ],
            kind: "single-image",
            asset
          });
          
        } catch (error) {
          console.error(`Error processing ${qid}:`, error);
        }
      }
    }
    
    // Save imageMap
    await fs.writeFile(
      path.join(ASSETS_DIR, "imageChoiceMap.json"),
      JSON.stringify(imageMap, null, 2),
      "utf8"
    );
    
    // Save questions
    await fs.writeFile(
      path.join(PUB, "data", "questions_with_assets.json"),
      JSON.stringify({ questions }, null, 2),
      "utf8"
    );
    
    console.log(`✅ Processed ${Object.keys(overrides).length} overrides`);
    console.log(`✅ Generated ${questions.length} questions`);
    
  } catch (error) {
    console.error("Error in cropFromOverrides:", error);
  }
}

cropFromOverrides();
