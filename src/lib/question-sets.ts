// Soru setleri - konulara göre gruplandırılmış
export const questionSets = {
  // TEMEL KONULAR (50 ücretsiz soru)
  basic: {
    id: 'basic',
    name: 'Temel Bilgiler',
    description: 'Almanya hakkında temel bilgiler',
    isPremium: false,
    questions: [
      {
        id: 1,
        question: "Welche Farbe hat die deutsche Flagge?",
        options: ["Rot, Weiß, Grün", "Schwarz, Rot, Gold", "Blau, Weiß, Rot", "Grün, Weiß, Rot"],
        correctAnswer: 1,
        explanation: "Die deutsche Flagge hat die Farben Schwarz, Rot und Gold (Gelb).",
        category: "Geschichte",
        difficulty: "easy"
      },
      {
        id: 2,
        question: "Wie viele Bundesländer hat Deutschland?",
        options: ["14", "15", "16", "17"],
        correctAnswer: 2,
        explanation: "Deutschland hat 16 Bundesländer.",
        category: "Politik",
        difficulty: "easy"
      }
      // ... 48 soru daha
    ]
  },

  // GESCHICHTE (Tarih) - Premium
  geschichte: {
    id: 'geschichte',
    name: 'Deutsche Geschichte',
    description: 'Alman tarihi ve kültürü',
    isPremium: true,
    questions: [
      {
        id: 101,
        question: "Wann wurde die Bundesrepublik Deutschland gegründet?",
        options: ["1945", "1949", "1955", "1961"],
        correctAnswer: 1,
        explanation: "Die Bundesrepublik Deutschland wurde am 23. Mai 1949 gegründet.",
        category: "Geschichte",
        difficulty: "medium"
      },
      {
        id: 102,
        question: "Wer war der erste Bundeskanzler der BRD?",
        options: ["Willy Brandt", "Konrad Adenauer", "Helmut Kohl", "Theodor Heuss"],
        correctAnswer: 1,
        explanation: "Konrad Adenauer war der erste Bundeskanzler der Bundesrepublik Deutschland (1949-1963).",
        category: "Geschichte",
        difficulty: "medium"
      }
      // ... 48 soru daha
    ]
  },

  // POLITIK (Politik) - Premium
  politik: {
    id: 'politik',
    name: 'Politisches System',
    description: 'Alman politik sistemi ve haklar',
    isPremium: true,
    questions: [
      {
        id: 201,
        question: "Wer ist das Staatsoberhaupt von Deutschland?",
        options: ["Bundeskanzler", "Bundespräsident", "Bundestagspräsident", "Ministerpräsident"],
        correctAnswer: 1,
        explanation: "Der Bundespräsident ist das Staatsoberhaupt der Bundesrepublik Deutschland.",
        category: "Politik",
        difficulty: "medium"
      }
      // ... 49 soru daha
    ]
  },

  // GESELLSCHAFT (Toplum) - Premium
  gesellschaft: {
    id: 'gesellschaft',
    name: 'Gesellschaft und Werte',
    description: 'Alman toplumu ve değerleri',
    isPremium: true,
    questions: [
      {
        id: 301,
        question: "Welche Religion ist in Deutschland am weitesten verbreitet?",
        options: ["Islam", "Katholizismus", "Protestantismus", "Katholizismus und Protestantismus"],
        correctAnswer: 3,
        explanation: "Katholizismus und Protestantismus sind die beiden größten christlichen Konfessionen in Deutschland.",
        category: "Gesellschaft",
        difficulty: "medium"
      }
      // ... 49 soru daha
    ]
  },

  // INTEGRATION (Entegrasyon) - Premium
  integration: {
    id: 'integration',
    name: 'Integration und Teilhabe',
    description: 'Entegrasyon süreci ve katılım',
    isPremium: true,
    questions: [
      {
        id: 401,
        question: "Welche Rechte haben Ausländer in Deutschland?",
        options: ["Keine", "Grundrechte", "Wahlrecht", "Alle Bürgerrechte"],
        correctAnswer: 1,
        explanation: "Ausländer in Deutschland haben Grundrechte, aber nicht alle Bürgerrechte wie das Wahlrecht.",
        category: "Integration",
        difficulty: "medium"
      }
      // ... 49 soru daha
    ]
  }
}

// EYALET BAZLI SORU SETLERİ - Premium
export const stateQuestionSets = {
  // BAYERN (Bavyera)
  bayern: {
    id: 'bayern',
    name: 'Bayern',
    description: 'Bavyera eyaleti hakkında özel sorular',
    isPremium: true,
    questions: [
      {
        id: 501,
        question: "Welche Hauptstadt hat Bayern?",
        options: ["München", "Nürnberg", "Augsburg", "Regensburg"],
        correctAnswer: 0,
        explanation: "München ist die Hauptstadt von Bayern.",
        category: "Bundesländer",
        difficulty: "easy"
      },
      {
        id: 502,
        question: "Welche Partei regiert aktuell in Bayern?",
        options: ["CSU", "SPD", "Grüne", "FDP"],
        correctAnswer: 0,
        explanation: "Die CSU (Christlich-Soziale Union) regiert aktuell in Bayern.",
        category: "Bundesländer",
        difficulty: "medium"
      }
      // ... 48 soru daha
    ]
  },

  // NRW (Kuzey Ren-Vestfalya)
  nrw: {
    id: 'nrw',
    name: 'Nordrhein-Westfalen',
    description: 'Kuzey Ren-Vestfalya eyaleti hakkında özel sorular',
    isPremium: true,
    questions: [
      {
        id: 601,
        question: "Welche Hauptstadt hat Nordrhein-Westfalen?",
        options: ["Köln", "Düsseldorf", "Dortmund", "Essen"],
        correctAnswer: 1,
        explanation: "Düsseldorf ist die Hauptstadt von Nordrhein-Westfalen.",
        category: "Bundesländer",
        difficulty: "easy"
      }
      // ... 49 soru daha
    ]
  },

  // BADEN-WÜRTTEMBERG
  bw: {
    id: 'bw',
    name: 'Baden-Württemberg',
    description: 'Baden-Württemberg eyaleti hakkında özel sorular',
    isPremium: true,
    questions: [
      {
        id: 701,
        question: "Welche Hauptstadt hat Baden-Württemberg?",
        options: ["Stuttgart", "Karlsruhe", "Freiburg", "Tübingen"],
        correctAnswer: 0,
        explanation: "Stuttgart ist die Hauptstadt von Baden-Württemberg.",
        category: "Bundesländer",
        difficulty: "easy"
      }
      // ... 49 soru daha
    ]
  },

  // BERLIN
  berlin: {
    id: 'berlin',
    name: 'Berlin',
    description: 'Berlin eyaleti hakkında özel sorular',
    isPremium: true,
    questions: [
      {
        id: 801,
        question: "Welche Funktion hat Berlin in Deutschland?",
        options: ["Nur Hauptstadt", "Hauptstadt und Bundesland", "Nur Bundesland", "Keine besondere Funktion"],
        correctAnswer: 1,
        explanation: "Berlin ist sowohl die Hauptstadt als auch ein Bundesland von Deutschland.",
        category: "Bundesländer",
        difficulty: "easy"
      }
      // ... 49 soru daha
    ]
  }

  // ... diğer 12 eyalet için de benzer yapı
}

// Tüm soru setlerini birleştiren fonksiyon
export const getAllQuestionSets = () => {
  return {
    ...questionSets,
    ...stateQuestionSets
  }
}

// Kullanıcının erişebileceği soru setlerini filtreleyen fonksiyon
export const getAvailableQuestionSets = (isPremium: boolean) => {
  const allSets = getAllQuestionSets()
  
  if (isPremium) {
    return allSets
  } else {
    return Object.fromEntries(
      Object.entries(allSets).filter(([_, set]) => !set.isPremium)
    )
  }
}
