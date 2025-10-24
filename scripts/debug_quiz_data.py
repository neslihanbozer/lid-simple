#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Debug script to check what data is actually being loaded by the quiz.
"""

import json
import os

def debug_quiz_data():
    print("🔍 Debugging quiz data loading...")
    
    # Check general questions
    general_json_path = "public/lid/general.json"
    if os.path.exists(general_json_path):
        print(f"\n📄 Checking {general_json_path}")
        with open(general_json_path, "r", encoding="utf-8") as f:
            questions = json.load(f)
            print(f"  Total questions: {len(questions)}")
            
            # Check first 5 questions
            for i, q in enumerate(questions[:5]):
                print(f"\n  Question {i+1}: {q.get('id', 'N/A')}")
                print(f"    Text: {q.get('text', 'N/A')[:50]}...")
                print(f"    Choices: {len(q.get('choices', []))}")
                for j, choice in enumerate(q.get('choices', [])[:4]):
                    print(f"      {choice.get('key', j)}: {choice.get('text', 'N/A')[:30]}...")
    
    # Check Berlin questions
    be_json_path = "public/lid/be.json"
    if os.path.exists(be_json_path):
        print(f"\n📄 Checking {be_json_path}")
        with open(be_json_path, "r", encoding="utf-8") as f:
            questions = json.load(f)
            print(f"  Total questions: {len(questions)}")
            
            # Check first 3 questions
            for i, q in enumerate(questions[:3]):
                print(f"\n  Question {i+1}: {q.get('id', 'N/A')}")
                print(f"    Text: {q.get('text', 'N/A')[:50]}...")
                print(f"    Choices: {len(q.get('choices', []))}")
                for j, choice in enumerate(q.get('choices', [])[:4]):
                    print(f"      {choice.get('key', j)}: {choice.get('text', 'N/A')[:30]}...")

if __name__ == "__main__":
    debug_quiz_data()
