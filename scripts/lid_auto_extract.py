#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Method 2 - Full Automatic Text+Image Mapping with PyMuPDF
Extracts text blocks and images, maps images to answer choices using IOU/distance
"""

import fitz
import json
import os
import re
from PIL import Image

# Configuration
PDF = "public/data/gesamtfragenkatalog-lebenindeutschland.pdf"
OUT_IMG = "public/assets/lid/auto-extracted"
OUT_JSON = "public/data/auto-questions"
os.makedirs(OUT_IMG, exist_ok=True)
os.makedirs(OUT_JSON, exist_ok=True)

# State mapping
STATE_CODE = {
    "Berlin": "BE", "Bayern": "BY", "Brandenburg": "BB", "Baden-Württemberg": "BW",
    "Bremen": "HB", "Hamburg": "HH", "Hessen": "HE", "Mecklenburg-Vorpommern": "MV",
    "Niedersachsen": "NI", "Nordrhein-Westfalen": "NW", "Rheinland-Pfalz": "RP",
    "Saarland": "SL", "Sachsen": "SN", "Sachsen-Anhalt": "ST", "Schleswig-Holstein": "SH",
    "Thüringen": "TH"
}

def bbox_center(b):
    """Get center point of bounding box"""
    x0, y0, x1, y1 = b
    return ((x0 + x1) / 2, (y0 + y1) / 2)

def iou(a, b):
    """Calculate Intersection over Union of two bounding boxes"""
    ax0, ay0, ax1, ay1 = a
    bx0, by0, bx1, by1 = b
    
    # Calculate intersection
    inter_x0 = max(ax0, bx0)
    inter_y0 = max(ay0, by0)
    inter_x1 = min(ax1, bx1)
    inter_y1 = min(ay1, by1)
    
    if inter_x1 <= inter_x0 or inter_y1 <= inter_y0:
        return 0.0
    
    inter_area = (inter_x1 - inter_x0) * (inter_y1 - inter_y0)
    area_a = (ax1 - ax0) * (ay1 - ay0)
    area_b = (bx1 - bx0) * (by1 - by0)
    union_area = area_a + area_b - inter_area
    
    return inter_area / max(1, union_area)

def distance(a, b):
    """Calculate distance between centers of two bounding boxes"""
    center_a = bbox_center(a)
    center_b = bbox_center(b)
    return ((center_a[0] - center_b[0])**2 + (center_a[1] - center_b[1])**2)**0.5

def extract_question_text(blocks, question_bbox):
    """Extract question text from blocks within question bbox"""
    question_text = ""
    for block in blocks:
        x0, y0, x1, y1, text = block[:5]
        # Check if block is within question area and not a choice (no checkbox)
        if (y0 >= question_bbox[1] and y1 <= question_bbox[3] and 
            '☐' not in text and '□' not in text and
            not text.strip().startswith('Aufgabe') and
            not text.strip().startswith('Seite')):
            question_text += text + " "
    return question_text.strip()

def main():
    print("🚀 Starting automatic text+image extraction...")
    
    doc = fitz.open(PDF)
    all_questions = []
    qid_counter = 1
    current_section = "general"
    current_state = None
    
    for pno, page in enumerate(doc):
        print(f"📄 Processing page {pno + 1}...")
        
        # Check for section headers
        page_text = page.get_text()
        if "Teil I" in page_text or "Allgemeine Fragen" in page_text:
            current_section = "general"
            current_state = None
        elif "Teil II" in page_text:
            current_section = "state"
            # Extract state name
            for state_name, state_code in STATE_CODE.items():
                if state_name in page_text:
                    current_state = state_code
                    break
        
        # 1) Extract text blocks
        blocks = page.get_text("blocks")
        texts = [(b[0], b[1], b[2], b[3], b[4].strip()) for b in blocks if b[4].strip()]
        
        # Find answer choice blocks
        choice_boxes = {}
        question_bbox = None
        choice_counter = 0
        
        for (x0, y0, x1, y1, text) in texts:
            # Look for checkbox patterns (☐) - these are the answer choices
            if '☐' in text or '□' in text:
                choice_key = chr(65 + choice_counter)  # A, B, C, D
                choice_boxes[choice_key] = (x0, y0, x1, y1, text)  # Store text too
                choice_counter += 1
                
                # Set question bbox to encompass all choices
                if question_bbox is None:
                    question_bbox = (x0, y0, x1, y1)
                else:
                    question_bbox = (
                        min(question_bbox[0], x0),
                        min(question_bbox[1], y0),
                        max(question_bbox[2], x1),
                        max(question_bbox[3], y1)
                    )
        
        # Skip if no valid question found
        if len(choice_boxes) < 2:
            continue
        
        # 2) Extract images from page
        imglist = page.get_images(full=True)
        placed_images = []
        
        for idx, img in enumerate(imglist, start=1):
            try:
                xref = img[0]
                pix = fitz.Pixmap(doc, xref)
                
                # Handle alpha channel
                if pix.alpha:
                    pix = fitz.Pixmap(fitz.csRGB, pix)
                
                # Get image rectangle
                rects = page.get_image_rects(xref)
                if not rects:
                    continue
                
                r = rects[0]
                img_bbox = (r.x0, r.y0, r.x1, r.y1)
                
                # 3) Map image to closest choice using IOU
                best_key = None
                best_score = -1
                
                for key, choice_data in choice_boxes.items():
                    choice_bbox = choice_data[:4]  # Get only bbox coordinates
                    iou_score = iou(img_bbox, choice_bbox)
                    if iou_score > best_score:
                        best_score = iou_score
                        best_key = key
                
                # If IOU is too low, assign to question prompt
                target = best_key if best_score >= 0.05 else "PROMPT"
                
                # 4) Save image
                imgdata = doc.extract_image(xref)
                if imgdata:
                    # Generate filename
                    if current_section == "general":
                        qid = f"GEN{qid_counter:03d}"
                    else:
                        qid = f"{current_state}{qid_counter:02d}"
                    
                    fname = f"{qid}-{target.lower()}-{idx}.png"
                    out_path = os.path.join(OUT_IMG, fname)
                    
                    with open(out_path, "wb") as f:
                        f.write(imgdata["image"])
                    
                    placed_images.append((target, f"/assets/lid/auto-extracted/{fname}"))
                    
            except Exception as e:
                print(f"⚠️  Error processing image {idx}: {e}")
                continue
        
        # 5) Create JSON record
        choices = []
        for key in ["A", "B", "C", "D"]:
            if key in choice_boxes:
                # Extract text from choice box, remove checkbox symbol
                choice_text = choice_boxes[key][4].replace('☐', '').replace('□', '').strip()
                imgs = [url for tgt, url in placed_images if tgt == key]
                choices.append({
                    "key": key,
                    "text": choice_text,
                    "imageUrls": imgs
                })
            else:
                # Fallback for missing choices
                choices.append({
                    "key": key,
                    "text": f"Bild {key}",
                    "imageUrls": []
                })
        
        # Extract question text
        question_text = extract_question_text(blocks, question_bbox) if question_bbox else f"Question {qid_counter}"
        
        # Get prompt images
        prompt_imgs = [url for tgt, url in placed_images if tgt == "PROMPT"]
        
        # Generate question ID
        if current_section == "general":
            qid = f"GEN{qid_counter:03d}"
        else:
            qid = f"{current_state}{qid_counter:02d}"
        
        record = {
            "id": qid,
            "numberInCatalog": qid_counter,
            "category": current_section,
            "stateCode": current_state if current_section == "state" else None,
            "text": question_text,
            "choices": choices,
            "promptImages": prompt_imgs,
            "kind": "image-choice" if any(choice["imageUrls"] for choice in choices) else "text",
            "source": {
                "pdfUrl": "uploaded:/gesamtfragenkatalog-lebenindeutschland.pdf",
                "pdfStand": "07.05.2025"
            },
            "correctAnswer": 0,  # Placeholder
            "explanation": f"Automatisch extrahiert - {qid}"
        }
        
        all_questions.append(record)
        qid_counter += 1
        
        print(f"✅ Extracted question {qid} with {len(placed_images)} images")
    
    # 6) Save all questions
    with open(os.path.join(OUT_JSON, "all_questions.json"), "w", encoding="utf-8") as f:
        json.dump(all_questions, f, ensure_ascii=False, indent=2)
    
    # 7) Split by category
    general_questions = [q for q in all_questions if q["category"] == "general"]
    state_questions = [q for q in all_questions if q["category"] == "state"]
    
    # Save general questions
    with open(os.path.join(OUT_JSON, "general.json"), "w", encoding="utf-8") as f:
        json.dump(general_questions, f, ensure_ascii=False, indent=2)
    
    # Save state questions by state
    state_groups = {}
    for q in state_questions:
        state = q["stateCode"]
        if state not in state_groups:
            state_groups[state] = []
        state_groups[state].append(q)
    
    for state, questions in state_groups.items():
        with open(os.path.join(OUT_JSON, f"{state.lower()}.json"), "w", encoding="utf-8") as f:
            json.dump(questions, f, ensure_ascii=False, indent=2)
    
    print(f"\n🎉 Extraction complete!")
    print(f"📊 Total questions: {len(all_questions)}")
    print(f"📊 General questions: {len(general_questions)}")
    print(f"📊 State questions: {len(state_questions)}")
    print(f"📁 Images saved to: {OUT_IMG}")
    print(f"📁 JSON saved to: {OUT_JSON}")
    
    doc.close()

if __name__ == "__main__":
    main()
