#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script to check for questions with missing or incomplete choices in the auto-extracted data.
"""

import json
import os
import glob

OUT_JSON_DIR = "public/data/auto-questions"

def check_missing_choices():
    print("🔍 Checking for questions with missing or incomplete choices...")
    
    missing_choices_found = False
    
    # Check general questions
    general_json_path = os.path.join(OUT_JSON_DIR, "general.json")
    if os.path.exists(general_json_path):
        with open(general_json_path, "r", encoding="utf-8") as f:
            questions = json.load(f)
            for q in questions:
                if not q.get('choices') or len(q['choices']) < 4:
                    print(f"  ❌ General Question {q.get('id', 'N/A')} has missing choices. Choices found: {len(q.get('choices', []))}")
                    missing_choices_found = True
                else:
                    for choice in q['choices']:
                        if not choice.get('text') and not choice.get('imageUrls'):
                            print(f"  ⚠️ General Question {q.get('id', 'N/A')} choice {choice.get('key', 'N/A')} has no text or image.")
                            missing_choices_found = True
    
    # Check state questions
    state_json_files = glob.glob(os.path.join(OUT_JSON_DIR, "*.json"))
    for state_file in state_json_files:
        if os.path.basename(state_file) == "general.json":
            continue
        
        with open(state_file, "r", encoding="utf-8") as f:
            questions = json.load(f)
            for q in questions:
                if not q.get('choices') or len(q['choices']) < 4:
                    print(f"  ❌ State Question {q.get('id', 'N/A')} ({os.path.basename(state_file)}) has missing choices. Choices found: {len(q.get('choices', []))}")
                    missing_choices_found = True
                else:
                    for choice in q['choices']:
                        if not choice.get('text') and not choice.get('imageUrls'):
                            print(f"  ⚠️ State Question {q.get('id', 'N/A')} ({os.path.basename(state_file)}) choice {choice.get('key', 'N/A')} has no text or image.")
                            missing_choices_found = True

    if not missing_choices_found:
        print("  ✅ No questions found with missing or incomplete choices.")

if __name__ == "__main__":
    check_missing_choices()
