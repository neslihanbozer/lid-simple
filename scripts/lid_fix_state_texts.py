# -*- coding: utf-8 -*-
import os
import json

def fix_state_texts():
    """Fix state question texts with proper German questions"""
    
    # Sample state questions for each state
    state_questions = {
        "BW": [
            "Welches ist das Wappen von Baden-Württemberg?",
            "Wie heißt die Hauptstadt von Baden-Württemberg?",
            "Welcher Fluss fließt durch Baden-Württemberg?",
            "Welches Bundesland grenzt an Baden-Württemberg?",
            "Welche Stadt ist die größte in Baden-Württemberg?",
            "Welches Gebirge liegt in Baden-Württemberg?",
            "Welcher See liegt in Baden-Württemberg?",
            "Welche Universität ist in Baden-Württemberg?",
            "Welches Schloss liegt in Baden-Württemberg?",
            "Welche Industrie ist wichtig in Baden-Württemberg?"
        ],
        "BE": [
            "Welches ist das Wappen von Berlin?",
            "Wie heißt der Fluss, der durch Berlin fließt?",
            "Welches Tor ist ein Wahrzeichen von Berlin?",
            "Welcher Park ist berühmt in Berlin?",
            "Welches Museum liegt auf der Museumsinsel?",
            "Welche Straße ist berühmt in Berlin?",
            "Welcher Platz ist zentral in Berlin?",
            "Welches Gebäude ist das Parlament?",
            "Welche Universität ist in Berlin?",
            "Welches Schloss liegt in Berlin?"
        ],
        "BY": [
            "Welches ist das Wappen von Bayern?",
            "Wie heißt die Hauptstadt von Bayern?",
            "Welches Gebirge liegt in Bayern?",
            "Welcher See liegt in Bayern?",
            "Welche Stadt ist berühmt für Bier?",
            "Welches Schloss liegt in Bayern?",
            "Welcher Fluss fließt durch Bayern?",
            "Welche Universität ist in Bayern?",
            "Welches Gebirge ist höchste in Bayern?",
            "Welche Industrie ist wichtig in Bayern?"
        ],
        "BB": [
            "Welches ist das Wappen von Brandenburg?",
            "Wie heißt die Hauptstadt von Brandenburg?",
            "Welcher Fluss fließt durch Brandenburg?",
            "Welches Bundesland grenzt an Brandenburg?",
            "Welche Stadt ist die größte in Brandenburg?",
            "Welcher See liegt in Brandenburg?",
            "Welches Schloss liegt in Brandenburg?",
            "Welche Universität ist in Brandenburg?",
            "Welches Gebirge liegt in Brandenburg?",
            "Welche Industrie ist wichtig in Brandenburg?"
        ],
        "HB": [
            "Welches ist das Wappen von Bremen?",
            "Wie heißt die Hauptstadt von Bremen?",
            "Welcher Fluss fließt durch Bremen?",
            "Welches Bundesland grenzt an Bremen?",
            "Welche Stadt ist die größte in Bremen?",
            "Welcher Hafen ist wichtig in Bremen?",
            "Welches Schloss liegt in Bremen?",
            "Welche Universität ist in Bremen?",
            "Welches Gebirge liegt in Bremen?",
            "Welche Industrie ist wichtig in Bremen?"
        ],
        "HH": [
            "Welches ist das Wappen von Hamburg?",
            "Wie heißt die Hauptstadt von Hamburg?",
            "Welcher Fluss fließt durch Hamburg?",
            "Welches Bundesland grenzt an Hamburg?",
            "Welche Stadt ist die größte in Hamburg?",
            "Welcher Hafen ist wichtig in Hamburg?",
            "Welches Schloss liegt in Hamburg?",
            "Welche Universität ist in Hamburg?",
            "Welches Gebirge liegt in Hamburg?",
            "Welche Industrie ist wichtig in Hamburg?"
        ],
        "HE": [
            "Welches ist das Wappen von Hessen?",
            "Wie heißt die Hauptstadt von Hessen?",
            "Welcher Fluss fließt durch Hessen?",
            "Welches Bundesland grenzt an Hessen?",
            "Welche Stadt ist die größte in Hessen?",
            "Welcher See liegt in Hessen?",
            "Welches Schloss liegt in Hessen?",
            "Welche Universität ist in Hessen?",
            "Welches Gebirge liegt in Hessen?",
            "Welche Industrie ist wichtig in Hessen?"
        ],
        "MV": [
            "Welches ist das Wappen von Mecklenburg-Vorpommern?",
            "Wie heißt die Hauptstadt von Mecklenburg-Vorpommern?",
            "Welcher Fluss fließt durch Mecklenburg-Vorpommern?",
            "Welches Bundesland grenzt an Mecklenburg-Vorpommern?",
            "Welche Stadt ist die größte in Mecklenburg-Vorpommern?",
            "Welcher See liegt in Mecklenburg-Vorpommern?",
            "Welches Schloss liegt in Mecklenburg-Vorpommern?",
            "Welche Universität ist in Mecklenburg-Vorpommern?",
            "Welches Gebirge liegt in Mecklenburg-Vorpommern?",
            "Welche Industrie ist wichtig in Mecklenburg-Vorpommern?"
        ],
        "NI": [
            "Welches ist das Wappen von Niedersachsen?",
            "Wie heißt die Hauptstadt von Niedersachsen?",
            "Welcher Fluss fließt durch Niedersachsen?",
            "Welches Bundesland grenzt an Niedersachsen?",
            "Welche Stadt ist die größte in Niedersachsen?",
            "Welcher See liegt in Niedersachsen?",
            "Welches Schloss liegt in Niedersachsen?",
            "Welche Universität ist in Niedersachsen?",
            "Welches Gebirge liegt in Niedersachsen?",
            "Welche Industrie ist wichtig in Niedersachsen?"
        ],
        "NW": [
            "Welches ist das Wappen von Nordrhein-Westfalen?",
            "Wie heißt die Hauptstadt von Nordrhein-Westfalen?",
            "Welcher Fluss fließt durch Nordrhein-Westfalen?",
            "Welches Bundesland grenzt an Nordrhein-Westfalen?",
            "Welche Stadt ist die größte in Nordrhein-Westfalen?",
            "Welcher See liegt in Nordrhein-Westfalen?",
            "Welches Schloss liegt in Nordrhein-Westfalen?",
            "Welche Universität ist in Nordrhein-Westfalen?",
            "Welches Gebirge liegt in Nordrhein-Westfalen?",
            "Welche Industrie ist wichtig in Nordrhein-Westfalen?"
        ],
        "RP": [
            "Welches ist das Wappen von Rheinland-Pfalz?",
            "Wie heißt die Hauptstadt von Rheinland-Pfalz?",
            "Welcher Fluss fließt durch Rheinland-Pfalz?",
            "Welches Bundesland grenzt an Rheinland-Pfalz?",
            "Welche Stadt ist die größte in Rheinland-Pfalz?",
            "Welcher See liegt in Rheinland-Pfalz?",
            "Welches Schloss liegt in Rheinland-Pfalz?",
            "Welche Universität ist in Rheinland-Pfalz?",
            "Welches Gebirge liegt in Rheinland-Pfalz?",
            "Welche Industrie ist wichtig in Rheinland-Pfalz?"
        ],
        "SL": [
            "Welches ist das Wappen von Saarland?",
            "Wie heißt die Hauptstadt von Saarland?",
            "Welcher Fluss fließt durch Saarland?",
            "Welches Bundesland grenzt an Saarland?",
            "Welche Stadt ist die größte in Saarland?",
            "Welcher See liegt in Saarland?",
            "Welches Schloss liegt in Saarland?",
            "Welche Universität ist in Saarland?",
            "Welches Gebirge liegt in Saarland?",
            "Welche Industrie ist wichtig in Saarland?"
        ],
        "SN": [
            "Welches ist das Wappen von Sachsen?",
            "Wie heißt die Hauptstadt von Sachsen?",
            "Welcher Fluss fließt durch Sachsen?",
            "Welches Bundesland grenzt an Sachsen?",
            "Welche Stadt ist die größte in Sachsen?",
            "Welcher See liegt in Sachsen?",
            "Welches Schloss liegt in Sachsen?",
            "Welche Universität ist in Sachsen?",
            "Welches Gebirge liegt in Sachsen?",
            "Welche Industrie ist wichtig in Sachsen?"
        ],
        "ST": [
            "Welches ist das Wappen von Sachsen-Anhalt?",
            "Wie heißt die Hauptstadt von Sachsen-Anhalt?",
            "Welcher Fluss fließt durch Sachsen-Anhalt?",
            "Welches Bundesland grenzt an Sachsen-Anhalt?",
            "Welche Stadt ist die größte in Sachsen-Anhalt?",
            "Welcher See liegt in Sachsen-Anhalt?",
            "Welches Schloss liegt in Sachsen-Anhalt?",
            "Welche Universität ist in Sachsen-Anhalt?",
            "Welches Gebirge liegt in Sachsen-Anhalt?",
            "Welche Industrie ist wichtig in Sachsen-Anhalt?"
        ],
        "SH": [
            "Welches ist das Wappen von Schleswig-Holstein?",
            "Wie heißt die Hauptstadt von Schleswig-Holstein?",
            "Welcher Fluss fließt durch Schleswig-Holstein?",
            "Welches Bundesland grenzt an Schleswig-Holstein?",
            "Welche Stadt ist die größte in Schleswig-Holstein?",
            "Welcher See liegt in Schleswig-Holstein?",
            "Welches Schloss liegt in Schleswig-Holstein?",
            "Welche Universität ist in Schleswig-Holstein?",
            "Welches Gebirge liegt in Schleswig-Holstein?",
            "Welche Industrie ist wichtig in Schleswig-Holstein?"
        ],
        "TH": [
            "Welches ist das Wappen von Thüringen?",
            "Wie heißt die Hauptstadt von Thüringen?",
            "Welcher Fluss fließt durch Thüringen?",
            "Welches Bundesland grenzt an Thüringen?",
            "Welche Stadt ist die größte in Thüringen?",
            "Welcher See liegt in Thüringen?",
            "Welches Schloss liegt in Thüringen?",
            "Welche Universität ist in Thüringen?",
            "Welches Gebirge liegt in Thüringen?",
            "Welche Industrie ist wichtig in Thüringen?"
        ]
    }
    
    for state_code, questions in state_questions.items():
        print(f"Processing {state_code}...")
        
        # Load state JSON
        json_path = f"public/lid/{state_code.lower()}.json"
        if not os.path.exists(json_path):
            print(f"  Skipping {state_code} - JSON not found")
            continue
            
        with open(json_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        # Update each question
        for i, question in enumerate(data):
            if i < len(questions):
                question['text'] = questions[i]
                question['explanation'] = f"Dies ist eine landesspezifische Frage für {state_code}."
        
        # Save updated JSON
        with open(json_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        
        print(f"  Updated {len(questions)} questions for {state_code}")

if __name__ == "__main__":
    fix_state_texts()
    print("✅ State question texts updated!")
