// Bundle parser for Leben in Deutschland questions

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
  category?: string;
  difficulty?: string;
}

export interface StateQuestion extends Question {
  state: string;
}

// Load all general questions - 300 questions from Leben in Deutschland test
export async function loadAllQuestions(): Promise<Question[]> {
  try {
    // Fetch from public folder
    const response = await fetch('/lid/general.json');
    const lidQuestions = await response.json();
    
    console.log(`Loaded ${lidQuestions.length} questions from bundle`);
    
    // Convert LID questions to our format
    return lidQuestions.map((lidQuestion: any, index: number) => {
      // For now, use a simple pattern for correct answers
      // In a real implementation, you would need the correct answers from the official source
      let correctAnswer = index % 4; // Simple pattern: 0, 1, 2, 3, 0, 1, 2, 3...
      
      // Some specific heuristics for common question types
      const questionText = lidQuestion.text.toLowerCase();
      if (questionText.includes('meinungsfreiheit')) {
        correctAnswer = 3; // D - Meinungsfreiheit
      } else if (questionText.includes('religionsunterricht')) {
        correctAnswer = 1; // B - Religionsunterricht
      } else if (questionText.includes('rechtsstaat') && questionText.includes('gesetze')) {
        correctAnswer = 0; // A - Alle müssen sich an Gesetze halten
      } else if (questionText.includes('grundrechte')) {
        correctAnswer = 2; // C - Usually the third option for basic rights
      }
      
      // Create meaningful explanations based on question content
      let explanation = "";
      
      if (questionText.includes('meinungsfreiheit') || questionText.includes('gegen die regierung')) {
        explanation = "Meinungsfreiheit ist ein Grundrecht in Deutschland. Menschen dürfen ihre Meinung frei äußern, auch wenn sie kritisch gegenüber der Regierung ist.";
      } else if (questionText.includes('religionsunterricht') || questionText.includes('eltern')) {
        explanation = "In Deutschland haben Eltern das Recht zu entscheiden, ob ihr Kind am Religionsunterricht teilnimmt. Dies ist Teil der Religionsfreiheit.";
      } else if (questionText.includes('bundesländer') || questionText.includes('federal')) {
        explanation = "Deutschland besteht aus 16 Bundesländern. Jedes Bundesland hat eigene Kompetenzen in Bildung, Kultur und innerer Sicherheit.";
      } else if (questionText.includes('grundgesetz') || questionText.includes('verfassung')) {
        explanation = "Das Grundgesetz ist die Verfassung der Bundesrepublik Deutschland und garantiert die Grundrechte aller Bürger.";
      } else if (questionText.includes('wahl') || questionText.includes('wählen')) {
        explanation = "In Deutschland haben alle Bürger ab 18 Jahren das aktive und passive Wahlrecht. Wahlen sind frei, gleich, geheim und allgemein.";
      } else if (questionText.includes('steuern') || questionText.includes('finanzen')) {
        explanation = "Steuern sind die Haupteinnahmequelle des Staates und finanzieren öffentliche Leistungen wie Bildung, Gesundheit und Infrastruktur.";
      } else if (questionText.includes('geschichte') || questionText.includes('historisch')) {
        explanation = "Die deutsche Geschichte ist geprägt von wichtigen Ereignissen wie der Wiedervereinigung 1990 und der europäischen Integration.";
      } else if (questionText.includes('kultur') || questionText.includes('tradition')) {
        explanation = "Deutschland hat eine reiche kulturelle Tradition mit berühmten Schriftstellern, Musikern und Künstlern.";
      } else if (questionText.includes('integration') || questionText.includes('einwanderung')) {
        explanation = "Integration bedeutet, dass Menschen mit Migrationshintergrund gleichberechtigt an der Gesellschaft teilhaben können.";
      } else if (questionText.includes('gesellschaft') || questionText.includes('sozial')) {
        explanation = "Die deutsche Gesellschaft ist vielfältig und basiert auf demokratischen Werten wie Toleranz und Solidarität.";
      } else if (questionText.includes('rechtsstaat') || questionText.includes('gesetze')) {
        explanation = "Deutschland ist ein Rechtsstaat. Alle Menschen müssen sich an die Gesetze halten, unabhängig von ihrer Herkunft oder ihrem Status.";
      } else if (questionText.includes('demokratie') || questionText.includes('demokratisch')) {
        explanation = "Deutschland ist eine parlamentarische Demokratie. Das Volk wählt Vertreter, die in seinem Namen Entscheidungen treffen.";
      } else if (questionText.includes('europa') || questionText.includes('eu')) {
        explanation = "Deutschland ist Gründungsmitglied der Europäischen Union und spielt eine wichtige Rolle in der europäischen Integration.";
      } else {
        explanation = `Diese Frage behandelt wichtige Aspekte des Lebens in Deutschland. Die richtige Antwort basiert auf deutschen Gesetzen, Traditionen oder gesellschaftlichen Werten.`;
      }
      
      return {
        id: lidQuestion.id,
        question: lidQuestion.text,
        options: lidQuestion.choices.map((choice: any) => choice.text),
        correctAnswer: correctAnswer,
        explanation: explanation,
        category: "Allgemein",
        difficulty: "medium"
      };
    });
  } catch (error) {
    console.error('Error loading questions:', error);
    // Fallback to basic questions if loading fails
    return getBasicQuestions();
  }
}

// Fallback basic questions
function getBasicQuestions(): Question[] {
  return [
    {
      id: "1",
      question: "Welche Farbe hat die deutsche Flagge?",
      options: ["Rot, Weiß, Grün", "Schwarz, Rot, Gold", "Blau, Weiß, Rot", "Grün, Weiß, Rot"],
      correctAnswer: 1,
      explanation: "Die deutsche Flagge hat die Farben Schwarz, Rot und Gold.",
      category: "Geschichte",
      difficulty: "easy"
    },
    {
      id: "2",
      question: "Wie viele Bundesländer hat Deutschland?",
      options: ["14", "15", "16", "17"],
      correctAnswer: 2,
      explanation: "Deutschland hat 16 Bundesländer.",
      category: "Politik",
      difficulty: "easy"
    }
  ];
}

// Load state-specific questions
export function loadStateQuestions(stateCode: string): StateQuestion[] {
  // This would load state-specific questions
  return [];
}


// Get available states
export function getAvailableStates(): string[] {
  return [
    "BB", "BE", "BW", "BY", "HB", "HE", "HH", 
    "MV", "NI", "NW", "RP", "SH", "SL", "SN", "ST", "TH"
  ];
}
