# -*- coding: utf-8 -*-
import os
import json
import re
import fitz  # PyMuPDF
from PIL import Image
import io

# State codes and names
STATE_INFO = {
    "BW": "Baden-Württemberg",
    "BY": "Bayern", 
    "BE": "Berlin",
    "BB": "Brandenburg",
    "HB": "Bremen",
    "HH": "Hamburg",
    "HE": "Hessen",
    "MV": "Mecklenburg-Vorpommern",
    "NI": "Niedersachsen",
    "NW": "Nordrhein-Westfalen",
    "RP": "Rheinland-Pfalz",
    "SL": "Saarland",
    "SN": "Sachsen",
    "ST": "Sachsen-Anhalt",
    "SH": "Schleswig-Holstein",
    "TH": "Thüringen"
}

def clean_text(text):
    """Clean text from PDF parsing issues"""
    if not text:
        return ""
    
    # Fix common concatenation issues
    text = re.sub(r'(\w)([A-ZÄÖÜ])', r'\1 \2', text)  # Add space before capital letters
    text = re.sub(r'(\w)\s*-\s*(\w)', r'\1-\2', text)  # Fix hyphens
    text = re.sub(r'\s+', ' ', text)  # Multiple spaces to single space
    text = text.strip()
    
    return text

def extract_text_from_snapshot(snapshot_path):
    """Extract text from a snapshot image using OCR-like approach"""
    # For now, return placeholder text - this would need OCR implementation
    return "Placeholder question text"

def create_state_question(state_code, question_num, snapshot_path, assets_dir):
    """Create a state question entry"""
    question_id = f"{state_code}{question_num:02d}"
    
    # Check if this is an image-choice question (has A, B, C, D assets)
    has_image_choices = all(
        os.path.exists(os.path.join(assets_dir, f"{question_id}_{choice}.png"))
        for choice in ["A", "B", "C", "D"]
    )
    
    # Check if this is a single-image question (has just the question image)
    has_single_image = os.path.exists(os.path.join(assets_dir, f"{question_id}.png"))
    
    question = {
        "id": question_id,
        "numberInCatalog": question_num,
        "text": f"State question {question_num} for {STATE_INFO[state_code]}",
        "choices": [
            {"id": "A", "text": "Option A"},
            {"id": "B", "text": "Option B"}, 
            {"id": "C", "text": "Option C"},
            {"id": "D", "text": "Option D"}
        ],
        "state": state_code,
        "kind": "text",
        "source": {
            "pdfUrl": "uploaded:/gesamtfragenkatalog-lebenindeutschland.pdf",
            "pdfStand": "07.05.2025"
        },
        "correctAnswer": 0,  # Default to A
        "explanation": f"This is a state-specific question for {STATE_INFO[state_code]}."
    }
    
    # Update based on available assets
    if has_image_choices:
        question["kind"] = "image-choice"
        question["assets"] = {}
        for choice in ["A", "B", "C", "D"]:
            question["assets"][choice] = f"/assets/lid/states/{state_code}/{question_id}_{choice}.png"
        # Update choices to reference images
        for i, choice in enumerate(["A", "B", "C", "D"]):
            question["choices"][i]["text"] = f"Bild {i+1}"
            question["choices"][i]["imageSrc"] = f"/assets/lid/states/{state_code}/{question_id}_{choice}.png"
    elif has_single_image:
        question["kind"] = "single-image"
        question["asset"] = f"/assets/lid/states/{state_code}/{question_id}.png"
    
    return question

def main():
    snapshots_dir = "public/assets/lid/snapshots"
    states_dir = "public/assets/lid/states"
    output_dir = "public/lid"
    
    # Create output directory
    os.makedirs(output_dir, exist_ok=True)
    
    for state_code, state_name in STATE_INFO.items():
        print(f"Processing {state_name} ({state_code})...")
        
        state_questions = []
        state_assets_dir = os.path.join(states_dir, state_code)
        
        # Process questions 1-10 for each state
        for question_num in range(1, 11):
            question_id = f"{state_code}{question_num:02d}"
            snapshot_path = os.path.join(snapshots_dir, f"{question_id}.png")
            
            if os.path.exists(snapshot_path):
                question = create_state_question(
                    state_code, 
                    question_num, 
                    snapshot_path, 
                    state_assets_dir
                )
                state_questions.append(question)
            else:
                print(f"  Warning: Snapshot not found for {question_id}")
        
        # Save state questions to JSON
        state_file = os.path.join(output_dir, f"{state_code.lower()}.json")
        with open(state_file, 'w', encoding='utf-8') as f:
            json.dump(state_questions, f, ensure_ascii=False, indent=2)
        
        print(f"  Created {len(state_questions)} questions for {state_name}")
    
    print(f"\n✅ Created state-specific JSON files for all 16 states")

if __name__ == "__main__":
    main()
