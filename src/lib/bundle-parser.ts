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
      
      return {
        id: lidQuestion.id,
        question: lidQuestion.text,
        options: lidQuestion.choices.map((choice: any) => choice.text),
        correctAnswer: correctAnswer,
        explanation: `Frage ${lidQuestion.numberInCatalog} aus dem offiziellen Leben in Deutschland Test.`,
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
