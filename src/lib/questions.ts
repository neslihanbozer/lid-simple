// 300 soru veritabanı - Almanya'da yaşam hakkında
export const questions = [
  // Geschichte (Tarih) - 75 soru
  {
    id: 1,
    question: "Welche Farbe hat die deutsche Flagge?",
    options: ["Rot, Weiß, Grün", "Schwarz, Rot, Gold", "Blau, Weiß, Rot", "Grün, Weiß, Rot"],
    correctAnswer: 1,
    explanation: "Die deutsche Flagge hat die Farben Schwarz, Rot und Gold (Gelb).",
    category: "Geschichte",
    difficulty: "easy",
    isPremium: false
  },
  {
    id: 2,
    question: "Wann wurde die Bundesrepublik Deutschland gegründet?",
    options: ["1945", "1949", "1955", "1961"],
    correctAnswer: 1,
    explanation: "Die Bundesrepublik Deutschland wurde am 23. Mai 1949 gegründet.",
    category: "Geschichte",
    difficulty: "medium",
    isPremium: true
  },
  {
    id: 3,
    question: "Wer war der erste Bundeskanzler der BRD?",
    options: ["Willy Brandt", "Konrad Adenauer", "Helmut Kohl", "Theodor Heuss"],
    correctAnswer: 1,
    explanation: "Konrad Adenauer war der erste Bundeskanzler der Bundesrepublik Deutschland (1949-1963).",
    category: "Geschichte",
    difficulty: "medium",
    isPremium: true
  },
  {
    id: 4,
    question: "Wann fiel die Berliner Mauer?",
    options: ["1987", "1989", "1990", "1991"],
    correctAnswer: 1,
    explanation: "Die Berliner Mauer fiel am 9. November 1989.",
    category: "Geschichte",
    difficulty: "easy",
    isPremium: false
  },
  {
    id: 5,
    question: "Welches Ereignis führte zur deutschen Wiedervereinigung?",
    options: ["Der Mauerfall", "Die Währungsunion", "Der Zwei-plus-Vier-Vertrag", "Alle genannten"],
    correctAnswer: 3,
    explanation: "Alle genannten Ereignisse führten zur deutschen Wiedervereinigung am 3. Oktober 1990.",
    category: "Geschichte",
    difficulty: "hard",
    isPremium: true
  },

  // Politik (Politik) - 75 soru
  {
    id: 6,
    question: "Wie viele Bundesländer hat Deutschland?",
    options: ["14", "15", "16", "17"],
    correctAnswer: 2,
    explanation: "Deutschland hat 16 Bundesländer.",
    category: "Politik",
    difficulty: "easy",
    isPremium: false
  },
  {
    id: 7,
    question: "Wer ist das Staatsoberhaupt von Deutschland?",
    options: ["Bundeskanzler", "Bundespräsident", "Bundestagspräsident", "Ministerpräsident"],
    correctAnswer: 1,
    explanation: "Der Bundespräsident ist das Staatsoberhaupt der Bundesrepublik Deutschland.",
    category: "Politik",
    difficulty: "medium",
    isPremium: true
  },
  {
    id: 8,
    question: "Wie oft wird der Bundestag gewählt?",
    options: ["Alle 3 Jahre", "Alle 4 Jahre", "Alle 5 Jahre", "Alle 6 Jahre"],
    correctAnswer: 1,
    explanation: "Der Bundestag wird alle 4 Jahre gewählt.",
    category: "Politik",
    difficulty: "easy",
    isPremium: false
  },
  {
    id: 9,
    question: "Welche Partei stellt aktuell den Bundeskanzler?",
    options: ["CDU", "SPD", "FDP", "Die Linke"],
    correctAnswer: 1,
    explanation: "Die SPD stellt aktuell den Bundeskanzler (Stand 2024).",
    category: "Politik",
    difficulty: "medium",
    isPremium: true
  },
  {
    id: 10,
    question: "Wie viele Stimmen hat Deutschland im Europäischen Parlament?",
    options: ["72", "78", "81", "96"],
    correctAnswer: 3,
    explanation: "Deutschland hat 96 Sitze im Europäischen Parlament.",
    category: "Politik",
    difficulty: "hard",
    isPremium: true
  },

  // Gesellschaft (Toplum) - 75 soru
  {
    id: 11,
    question: "Welche Religion ist in Deutschland am weitesten verbreitet?",
    options: ["Islam", "Katholizismus", "Protestantismus", "Katholizismus und Protestantismus"],
    correctAnswer: 3,
    explanation: "Katholizismus und Protestantismus sind die beiden größten christlichen Konfessionen in Deutschland.",
    category: "Gesellschaft",
    difficulty: "medium",
    isPremium: true
  },
  {
    id: 12,
    question: "Wie viele Einwohner hat Deutschland ungefähr?",
    options: ["70 Millionen", "80 Millionen", "83 Millionen", "90 Millionen"],
    correctAnswer: 2,
    explanation: "Deutschland hat etwa 83 Millionen Einwohner.",
    category: "Gesellschaft",
    difficulty: "easy",
    isPremium: false
  },
  {
    id: 13,
    question: "Welche Sprache ist die Amtssprache in Deutschland?",
    options: ["Deutsch", "Englisch", "Französisch", "Alle genannten"],
    correctAnswer: 0,
    explanation: "Deutsch ist die Amtssprache in Deutschland.",
    category: "Gesellschaft",
    difficulty: "easy",
    isPremium: false
  },
  {
    id: 14,
    question: "Welche Währung wird in Deutschland verwendet?",
    options: ["Deutsche Mark", "Euro", "Dollar", "Pfund"],
    correctAnswer: 1,
    explanation: "In Deutschland wird der Euro als Währung verwendet.",
    category: "Gesellschaft",
    difficulty: "easy",
    isPremium: false
  },
  {
    id: 15,
    question: "Welches ist das bevölkerungsreichste Bundesland?",
    options: ["Bayern", "Nordrhein-Westfalen", "Baden-Württemberg", "Niedersachsen"],
    correctAnswer: 1,
    explanation: "Nordrhein-Westfalen ist mit etwa 18 Millionen Einwohnern das bevölkerungsreichste Bundesland.",
    category: "Gesellschaft",
    difficulty: "medium",
    isPremium: true
  },

  // Integration (Entegrasyon) - 75 soru
  {
    id: 16,
    question: "Welche Rechte haben Ausländer in Deutschland?",
    options: ["Keine", "Grundrechte", "Wahlrecht", "Alle Bürgerrechte"],
    correctAnswer: 1,
    explanation: "Ausländer in Deutschland haben Grundrechte, aber nicht alle Bürgerrechte wie das Wahlrecht.",
    category: "Integration",
    difficulty: "medium",
    isPremium: true
  },
  {
    id: 17,
    question: "Wie lange muss man in Deutschland leben, um die deutsche Staatsbürgerschaft zu bekommen?",
    options: ["5 Jahre", "6 Jahre", "8 Jahre", "10 Jahre"],
    correctAnswer: 2,
    explanation: "Man muss in der Regel 8 Jahre in Deutschland leben, um die deutsche Staatsbürgerschaft zu bekommen.",
    category: "Integration",
    difficulty: "hard",
    isPremium: true
  },
  {
    id: 18,
    question: "Welche Sprache muss man für die Einbürgerung lernen?",
    options: ["Englisch", "Deutsch", "Französisch", "Keine bestimmte"],
    correctAnswer: 1,
    explanation: "Für die Einbürgerung muss man Deutsch lernen und nachweisen können.",
    category: "Integration",
    difficulty: "easy",
    isPremium: false
  },
  {
    id: 19,
    question: "Welche Werte sind in Deutschland wichtig?",
    options: ["Demokratie", "Menschenrechte", "Toleranz", "Alle genannten"],
    correctAnswer: 3,
    explanation: "Demokratie, Menschenrechte und Toleranz sind wichtige Werte in Deutschland.",
    category: "Integration",
    difficulty: "easy",
    isPremium: false
  },
  {
    id: 20,
    question: "Welche Organisation hilft bei der Integration?",
    options: ["BAMF", "Bundesagentur für Arbeit", "Volkshochschule", "Alle genannten"],
    correctAnswer: 3,
    explanation: "BAMF, Bundesagentur für Arbeit und Volkshochschulen helfen bei der Integration.",
    category: "Integration",
    difficulty: "medium",
    isPremium: true
  }
]

// Daha fazla soru eklemek için bu array'i genişletebiliriz
// Toplam 300 soru için 280 soru daha eklenmeli
