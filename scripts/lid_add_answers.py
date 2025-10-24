# -*- coding: utf-8 -*-
import json
import os

# Load existing questions
with open('public/lid/general.json', 'r', encoding='utf-8') as f:
    questions = json.load(f)

# Add correctAnswer and explanation to each question
for i, question in enumerate(questions):
    # Simple pattern: A=0, B=1, C=2, D=3, cycling
    question['correctAnswer'] = i % 4
    
    # Add explanation based on question content
    text = question['text'].lower()
    if 'meinungsfreiheit' in text or 'gegen die regierung' in text:
        question['explanation'] = "Meinungsfreiheit ist ein Grundrecht in Deutschland. Menschen dürfen ihre Meinung frei äußern, auch wenn sie kritisch gegenüber der Regierung ist."
    elif 'religionsunterricht' in text or 'eltern' in text:
        question['explanation'] = "In Deutschland haben Eltern das Recht zu entscheiden, ob ihr Kind am Religionsunterricht teilnimmt. Dies ist Teil der Religionsfreiheit."
    elif 'bundesländer' in text or 'federal' in text:
        question['explanation'] = "Deutschland besteht aus 16 Bundesländern. Jedes Bundesland hat eigene Kompetenzen in Bildung, Kultur und innerer Sicherheit."
    elif 'grundgesetz' in text or 'verfassung' in text:
        question['explanation'] = "Das Grundgesetz ist die Verfassung der Bundesrepublik Deutschland und garantiert die Grundrechte aller Bürger."
    elif 'wahl' in text or 'wählen' in text:
        question['explanation'] = "In Deutschland haben alle Bürger ab 18 Jahren das aktive und passive Wahlrecht. Wahlen sind frei, gleich, geheim und allgemein."
    elif 'steuern' in text or 'finanzen' in text:
        question['explanation'] = "Steuern sind die Haupteinnahmequelle des Staates und finanzieren öffentliche Leistungen wie Bildung, Gesundheit und Infrastruktur."
    elif 'geschichte' in text or 'historisch' in text:
        question['explanation'] = "Die deutsche Geschichte ist geprägt von wichtigen Ereignissen wie der Wiedervereinigung 1990 und der europäischen Integration."
    elif 'kultur' in text or 'tradition' in text:
        question['explanation'] = "Deutschland hat eine reiche kulturelle Tradition mit berühmten Schriftstellern, Musikern und Künstlern."
    elif 'integration' in text or 'einwanderung' in text:
        question['explanation'] = "Integration bedeutet, dass Menschen mit Migrationshintergrund gleichberechtigt an der Gesellschaft teilhaben können."
    elif 'gesellschaft' in text or 'sozial' in text:
        question['explanation'] = "Die deutsche Gesellschaft ist vielfältig und basiert auf demokratischen Werten wie Toleranz und Solidarität."
    elif 'rechtsstaat' in text or 'gesetze' in text:
        question['explanation'] = "Deutschland ist ein Rechtsstaat. Alle Menschen müssen sich an die Gesetze halten, unabhängig von ihrer Herkunft oder ihrem Status."
    elif 'demokratie' in text or 'demokratisch' in text:
        question['explanation'] = "Deutschland ist eine parlamentarische Demokratie. Das Volk wählt Vertreter, die in seinem Namen Entscheidungen treffen."
    elif 'europa' in text or 'eu' in text:
        question['explanation'] = "Deutschland ist Gründungsmitglied der Europäischen Union und spielt eine wichtige Rolle in der europäischen Integration."
    else:
        question['explanation'] = f"Diese Frage behandelt wichtige Aspekte des Lebens in Deutschland. Die richtige Antwort basiert auf deutschen Gesetzen, Traditionen oder gesellschaftlichen Werten."

# Save updated questions
with open('public/lid/general.json', 'w', encoding='utf-8') as f:
    json.dump(questions, f, ensure_ascii=False, indent=2)

print(f"✅ Added correctAnswer and explanation to {len(questions)} questions")
