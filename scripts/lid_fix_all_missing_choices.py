# -*- coding: utf-8 -*-
import json

def fix_all_missing_choices():
    # Load questions
    with open('public/lid/general.json', 'r', encoding='utf-8') as f:
        questions = json.load(f)
    
    fixes = []
    
    for q in questions:
        qid = q['id']
        text = q['text']
        choices = [c['text'] for c in q['choices']]
        
        # Fix G067 - Bundesländer tasks
        if qid == 'G067':
            print(f"Fixing G067: {text[:80]}...")
            # The question asks about Bundesländer tasks
            # Based on the text, the correct answer should be about education/culture (Bundesländer competence)
            q['choices'][0]['text'] = "Verteidigungspolitik"
            q['choices'][1]['text'] = "Außenpolitik"
            q['choices'][2]['text'] = "Wirtschaftspolitik"  # This is already correct
            q['choices'][3]['text'] = "Schulpolitik"
            q['correctAnswer'] = 3  # D - Schulpolitik (education policy is a Bundesland competence)
            q['explanation'] = "Schulpolitik ist vor allem eine Aufgabe der Bundesländer. Jedes Bundesland ist für sein eigenes Bildungssystem zuständig."
            fixes.append("✅ G067: Fixed Bundesländer tasks")
        
        # Fix G097 - Social insurance
        elif qid == 'G097':
            print(f"Fixing G097: {text[:80]}...")
            q['choices'][0]['text'] = "Sozialversicherung"
            q['choices'][1]['text'] = "Sozialhilfe"
            q['choices'][2]['text'] = "Arbeitslosenversicherung"
            q['choices'][3]['text'] = "Wohngeld"  # This is already correct
            q['correctAnswer'] = 0  # A - Sozialversicherung (automatic for employees)
            q['explanation'] = "Wenn man fest angestellt ist, bezahlt man automatisch Sozialversicherung. Dazu gehören Kranken-, Renten-, Arbeitslosen- und Pflegeversicherung."
            fixes.append("✅ G097: Fixed social insurance")
        
        # Fix G110 - Bundestag election period
        elif qid == 'G110':
            print(f"Fixing G110: {text[:80]}...")
            q['choices'][0]['text'] = "2 Jahre"
            q['choices'][1]['text'] = "3 Jahre"
            q['choices'][2]['text'] = "4 Jahre"
            q['choices'][3]['text'] = "5 Jahre"
            q['correctAnswer'] = 2  # C - 4 Jahre (Bundestag is elected for 4 years)
            q['explanation'] = "Der Bundestag wird für 4 Jahre gewählt. Dies ist in Artikel 39 des Grundgesetzes festgelegt."
            fixes.append("✅ G110: Fixed Bundestag election period")
        
        # Fix G149 - Antisemitic behavior
        elif qid == 'G149':
            print(f"Fixing G149: {text[:80]}...")
            q['choices'][0]['text'] = "ein jüdisches Fest besuchen"
            q['choices'][1]['text'] = "die israelische Regierung kritisieren"
            q['choices'][2]['text'] = "den Holocaust leugnen"
            q['choices'][3]['text'] = "gegen Juden Fußball spielen"
            q['correctAnswer'] = 2  # C - Holocaust leugnen (denying the Holocaust is antisemitic)
            q['explanation'] = "Den Holocaust zu leugnen ist ein Beispiel für antisemitisches Verhalten. Dies ist in Deutschland strafbar."
            fixes.append("✅ G149: Fixed antisemitic behavior")
        
        # Fix G183 - Wirtschaftswunder
        elif qid == 'G183':
            print(f"Fixing G183: {text[:80]}...")
            q['choices'][0]['text'] = "40er Jahre"
            q['choices'][1]['text'] = "50er Jahre"
            q['choices'][2]['text'] = "70er Jahre"
            q['choices'][3]['text'] = "90er Jahre"
            q['correctAnswer'] = 1  # B - 50er Jahre (Wirtschaftswunder was in the 1950s)
            q['explanation'] = "Das 'Wirtschaftswunder' war in den 50er Jahren. Nach dem Zweiten Weltkrieg erlebte Deutschland einen starken wirtschaftlichen Aufschwung."
            fixes.append("✅ G183: Fixed Wirtschaftswunder period")
    
    # Save updated questions
    with open('public/lid/general.json', 'w', encoding='utf-8') as f:
        json.dump(questions, f, ensure_ascii=False, indent=2)
    
    print(f"\n✅ Applied {len(fixes)} fixes:")
    for fix in fixes:
        print(f"  {fix}")

if __name__ == "__main__":
    fix_all_missing_choices()
