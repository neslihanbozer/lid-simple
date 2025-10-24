#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script to check for questions with missing or incomplete choices in the original data files.
"""

import json
import os
import glob

def check_original_data():
    print("🔍 Checking original data files for missing choices...")
    
    missing_choices_found = False
    
    # Check general questions
    general_json_path = "public/lid/general.json"
    if os.path.exists(general_json_path):
        print(f"\n📄 Checking {general_json_path}")
        with open(general_json_path, "r", encoding="utf-8") as f:
            questions = json.load(f)
            for i, q in enumerate(questions):
                if not q.get('choices') or len(q['choices']) < 4:
                    print(f"  ❌ General Question {q.get('id', 'N/A')} has missing choices. Choices found: {len(q.get('choices', []))}")
                    missing_choices_found = True
                else:
                    for j, choice in enumerate(q['choices']):
                        if not choice.get('text') and not choice.get('imageUrls') and not choice.get('imageSrc'):
                            print(f"  ⚠️ General Question {q.get('id', 'N/A')} choice {choice.get('key', j)} has no text or image.")
                            missing_choices_found = True
                        elif choice.get('text') == '' or choice.get('text') is None:
                            print(f"  ⚠️ General Question {q.get('id', 'N/A')} choice {choice.get('key', j)} has empty text.")
                            missing_choices_found = True
    
    # Check state questions
    state_json_files = glob.glob("public/lid/*.json")
    for state_file in state_json_files:
        if os.path.basename(state_file) == "general.json":
            continue
        
        print(f"\n📄 Checking {state_file}")
        with open(state_file, "r", encoding="utf-8") as f:
            questions = json.load(f)
            for i, q in enumerate(questions):
                if not q.get('choices') or len(q['choices']) < 4:
                    print(f"  ❌ State Question {q.get('id', 'N/A')} ({os.path.basename(state_file)}) has missing choices. Choices found: {len(q.get('choices', []))}")
                    missing_choices_found = True
                else:
                    for j, choice in enumerate(q['choices']):
                        if not choice.get('text') and not choice.get('imageUrls') and not choice.get('imageSrc'):
                            print(f"  ⚠️ State Question {q.get('id', 'N/A')} ({os.path.basename(state_file)}) choice {choice.get('key', j)} has no text or image.")
                            missing_choices_found = True
                        elif choice.get('text') == '' or choice.get('text') is None:
                            print(f"  ⚠️ State Question {q.get('id', 'N/A')} ({os.path.basename(state_file)}) choice {choice.get('key', j)} has empty text.")
                            missing_choices_found = True

    if not missing_choices_found:
        print("  ✅ No questions found with missing or incomplete choices in original data.")

if __name__ == "__main__":
    check_original_data()
