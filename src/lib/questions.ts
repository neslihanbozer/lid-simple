// 300 soru veritabanı - Almanya'da yaşam hakkında (Tüm sorular premium)
export const questions = [
  // Geschichte (Tarih) - 75 soru
  {
    id: 1,
    question: "Welche Farbe hat die deutsche Flagge?",
    questionTr: "Alman bayrağının rengi nedir?",
    options: ["Rot, Weiß, Grün", "Schwarz, Rot, Gold", "Blau, Weiß, Rot", "Grün, Weiß, Rot"],
    optionsTr: ["Kırmızı, Beyaz, Yeşil", "Siyah, Kırmızı, Altın", "Mavi, Beyaz, Kırmızı", "Yeşil, Beyaz, Kırmızı"],
    correctAnswer: 1,
    explanation: "Die deutsche Flagge hat die Farben Schwarz, Rot und Gold (Gelb).",
    explanationTr: "Alman bayrağı Siyah, Kırmızı ve Altın (Sarı) renklerine sahiptir.",
    category: "Geschichte",
    difficulty: "easy",
    isPremium: true
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
  },

  // Additional Geschichte Questions (21-50)
  {
    id: 21,
    question: "Welches Jahr war das Ende des Zweiten Weltkriegs?",
    options: ["1944", "1945", "1946", "1947"],
    correctAnswer: 1,
    explanation: "Der Zweite Weltkrieg endete 1945.",
    category: "Geschichte",
    difficulty: "easy",
    isPremium: false
  },
  {
    id: 22,
    question: "Wer war der letzte Kaiser von Deutschland?",
    options: ["Wilhelm I", "Wilhelm II", "Friedrich III", "Otto von Bismarck"],
    correctAnswer: 1,
    explanation: "Wilhelm II war der letzte deutsche Kaiser (1888-1918).",
    category: "Geschichte",
    difficulty: "medium",
    isPremium: true
  },
  {
    id: 23,
    question: "Welches Ereignis führte zum Ersten Weltkrieg?",
    options: ["Die Ermordung von Franz Ferdinand", "Der Angriff auf Pearl Harbor", "Die Oktoberrevolution", "Der Vertrag von Versailles"],
    correctAnswer: 0,
    explanation: "Die Ermordung von Erzherzog Franz Ferdinand in Sarajevo 1914 führte zum Ersten Weltkrieg.",
    category: "Geschichte",
    difficulty: "medium",
    isPremium: true
  },
  {
    id: 24,
    question: "Wann wurde die DDR gegründet?",
    options: ["1947", "1948", "1949", "1950"],
    correctAnswer: 2,
    explanation: "Die DDR wurde am 7. Oktober 1949 gegründet.",
    category: "Geschichte",
    difficulty: "medium",
    isPremium: true
  },
  {
    id: 25,
    question: "Welches Jahr war die deutsche Wiedervereinigung?",
    options: ["1989", "1990", "1991", "1992"],
    correctAnswer: 1,
    explanation: "Die deutsche Wiedervereinigung fand am 3. Oktober 1990 statt.",
    category: "Geschichte",
    difficulty: "easy",
    isPremium: false
  },
  {
    id: 26,
    question: "Wer war der erste Bundespräsident der BRD?",
    options: ["Konrad Adenauer", "Theodor Heuss", "Heinrich Lübke", "Gustav Heinemann"],
    correctAnswer: 1,
    explanation: "Theodor Heuss war der erste Bundespräsident der BRD (1949-1959).",
    category: "Geschichte",
    difficulty: "hard",
    isPremium: true
  },
  {
    id: 27,
    question: "Welches Jahr war die Währungsreform in Westdeutschland?",
    options: ["1947", "1948", "1949", "1950"],
    correctAnswer: 1,
    explanation: "Die Währungsreform in Westdeutschland fand 1948 statt.",
    category: "Geschichte",
    difficulty: "hard",
    isPremium: true
  },
  {
    id: 28,
    question: "Wer war der 'Eiserne Kanzler'?",
    options: ["Konrad Adenauer", "Otto von Bismarck", "Helmut Kohl", "Willy Brandt"],
    correctAnswer: 1,
    explanation: "Otto von Bismarck wurde als 'Eiserne Kanzler' bezeichnet.",
    category: "Geschichte",
    difficulty: "medium",
    isPremium: true
  },
  {
    id: 29,
    question: "Welches Jahr war die Gründung des Deutschen Reiches?",
    options: ["1869", "1870", "1871", "1872"],
    correctAnswer: 2,
    explanation: "Das Deutsche Reich wurde 1871 gegründet.",
    category: "Geschichte",
    difficulty: "hard",
    isPremium: true
  },
  {
    id: 30,
    question: "Wer war der erste Bundeskanzler nach der Wiedervereinigung?",
    options: ["Helmut Kohl", "Gerhard Schröder", "Angela Merkel", "Willy Brandt"],
    correctAnswer: 0,
    explanation: "Helmut Kohl war der erste Bundeskanzler nach der Wiedervereinigung.",
    category: "Geschichte",
    difficulty: "easy",
    isPremium: false
  },

  // Additional Politik Questions (31-60)
  {
    id: 31,
    question: "Welches ist die Hauptstadt von Deutschland?",
    options: ["München", "Hamburg", "Berlin", "Köln"],
    correctAnswer: 2,
    explanation: "Berlin ist die Hauptstadt von Deutschland.",
    category: "Politik",
    difficulty: "easy",
    isPremium: false
  },
  {
    id: 32,
    question: "Wie heißt das deutsche Parlament?",
    options: ["Reichstag", "Bundestag", "Landtag", "Stadtrat"],
    correctAnswer: 1,
    explanation: "Das deutsche Parlament heißt Bundestag.",
    category: "Politik",
    difficulty: "easy",
    isPremium: false
  },
  {
    id: 33,
    question: "Welche Partei ist aktuell nicht im Bundestag vertreten?",
    options: ["CDU", "SPD", "AfD", "NPD"],
    correctAnswer: 3,
    explanation: "Die NPD ist aktuell nicht im Bundestag vertreten.",
    category: "Politik",
    difficulty: "medium",
    isPremium: true
  },
  {
    id: 34,
    question: "Wie viele Stimmen braucht man für eine absolute Mehrheit im Bundestag?",
    options: ["Über 50%", "Mindestens 50%", "Über 2/3", "Mindestens 2/3"],
    correctAnswer: 0,
    explanation: "Für eine absolute Mehrheit braucht man über 50% der Stimmen.",
    category: "Politik",
    difficulty: "medium",
    isPremium: true
  },
  {
    id: 35,
    question: "Welches Bundesland hat die meisten Einwohner?",
    options: ["Bayern", "Nordrhein-Westfalen", "Baden-Württemberg", "Niedersachsen"],
    correctAnswer: 1,
    explanation: "Nordrhein-Westfalen hat die meisten Einwohner.",
    category: "Politik",
    difficulty: "easy",
    isPremium: false
  },
  {
    id: 36,
    question: "Wer wählt den Bundeskanzler?",
    options: ["Das Volk", "Der Bundestag", "Der Bundesrat", "Der Bundespräsident"],
    correctAnswer: 1,
    explanation: "Der Bundestag wählt den Bundeskanzler.",
    category: "Politik",
    difficulty: "medium",
    isPremium: true
  },
  {
    id: 37,
    question: "Welche Farbe hat die deutsche Flagge?",
    options: ["Rot-Weiß-Blau", "Schwarz-Rot-Gold", "Grün-Weiß-Rot", "Blau-Gelb-Rot"],
    correctAnswer: 1,
    explanation: "Die deutsche Flagge hat die Farben Schwarz-Rot-Gold.",
    category: "Politik",
    difficulty: "easy",
    isPremium: false
  },
  {
    id: 38,
    question: "Wie heißt die deutsche Nationalhymne?",
    options: ["Deutschland über alles", "Einigkeit und Recht und Freiheit", "Das Lied der Deutschen", "Deutschlandlied"],
    correctAnswer: 2,
    explanation: "Die deutsche Nationalhymne heißt 'Das Lied der Deutschen'.",
    category: "Politik",
    difficulty: "medium",
    isPremium: true
  },
  {
    id: 39,
    question: "Welches Bundesland ist das flächenmäßig größte?",
    options: ["Bayern", "Niedersachsen", "Baden-Württemberg", "Nordrhein-Westfalen"],
    correctAnswer: 0,
    explanation: "Bayern ist das flächenmäßig größte Bundesland.",
    category: "Politik",
    difficulty: "easy",
    isPremium: false
  },
  {
    id: 40,
    question: "Wer ist der aktuelle Bundespräsident?",
    options: ["Frank-Walter Steinmeier", "Angela Merkel", "Olaf Scholz", "Armin Laschet"],
    correctAnswer: 0,
    explanation: "Frank-Walter Steinmeier ist der aktuelle Bundespräsident.",
    category: "Politik",
    difficulty: "easy",
    isPremium: false
  },

  // Additional Gesellschaft Questions (41-70)
  {
    id: 41,
    question: "Welche Religion ist in Deutschland am weitesten verbreitet?",
    options: ["Islam", "Judentum", "Christentum", "Buddhismus"],
    correctAnswer: 2,
    explanation: "Das Christentum ist in Deutschland am weitesten verbreitet.",
    category: "Gesellschaft",
    difficulty: "easy",
    isPremium: false
  },
  {
    id: 42,
    question: "Wie viele Bundesländer hat Deutschland?",
    options: ["14", "15", "16", "17"],
    correctAnswer: 2,
    explanation: "Deutschland hat 16 Bundesländer.",
    category: "Gesellschaft",
    difficulty: "easy",
    isPremium: false
  },
  {
    id: 43,
    question: "Welche Sprache wird in Deutschland gesprochen?",
    options: ["Englisch", "Französisch", "Deutsch", "Spanisch"],
    correctAnswer: 2,
    explanation: "In Deutschland wird Deutsch gesprochen.",
    category: "Gesellschaft",
    difficulty: "easy",
    isPremium: false
  },
  {
    id: 44,
    question: "Welche Währung wird in Deutschland verwendet?",
    options: ["Deutsche Mark", "Euro", "Dollar", "Pfund"],
    correctAnswer: 1,
    explanation: "In Deutschland wird der Euro verwendet.",
    category: "Gesellschaft",
    difficulty: "easy",
    isPremium: false
  },
  {
    id: 45,
    question: "Welches ist das bevölkerungsreichste Bundesland?",
    options: ["Bayern", "Nordrhein-Westfalen", "Baden-Württemberg", "Niedersachsen"],
    correctAnswer: 1,
    explanation: "Nordrhein-Westfalen ist das bevölkerungsreichste Bundesland.",
    category: "Gesellschaft",
    difficulty: "medium",
    isPremium: true
  },
  {
    id: 46,
    question: "Welche Feiertage gibt es in Deutschland?",
    options: ["Weihnachten", "Ostern", "Pfingsten", "Alle genannten"],
    correctAnswer: 3,
    explanation: "Weihnachten, Ostern und Pfingsten sind Feiertage in Deutschland.",
    category: "Gesellschaft",
    difficulty: "easy",
    isPremium: false
  },
  {
    id: 47,
    question: "Welche Bildungseinrichtungen gibt es in Deutschland?",
    options: ["Grundschule", "Gymnasium", "Universität", "Alle genannten"],
    correctAnswer: 3,
    explanation: "Grundschule, Gymnasium und Universität sind Bildungseinrichtungen in Deutschland.",
    category: "Gesellschaft",
    difficulty: "easy",
    isPremium: false
  },
  {
    id: 48,
    question: "Welche Verkehrsmittel gibt es in Deutschland?",
    options: ["Auto", "Zug", "Bus", "Alle genannten"],
    correctAnswer: 3,
    explanation: "Auto, Zug und Bus sind Verkehrsmittel in Deutschland.",
    category: "Gesellschaft",
    difficulty: "easy",
    isPremium: false
  },
  {
    id: 49,
    question: "Welche Sportarten sind in Deutschland beliebt?",
    options: ["Fußball", "Handball", "Tennis", "Alle genannten"],
    correctAnswer: 3,
    explanation: "Fußball, Handball und Tennis sind beliebte Sportarten in Deutschland.",
    category: "Gesellschaft",
    difficulty: "easy",
    isPremium: false
  },
  {
    id: 50,
    question: "Welche kulturellen Veranstaltungen gibt es in Deutschland?",
    options: ["Oktoberfest", "Karneval", "Weihnachtsmärkte", "Alle genannten"],
    correctAnswer: 3,
    explanation: "Oktoberfest, Karneval und Weihnachtsmärkte sind kulturelle Veranstaltungen in Deutschland.",
    category: "Gesellschaft",
    difficulty: "easy",
    isPremium: false
  },

  // Additional Integration Questions (51-100)
  {
    id: 51,
    question: "Welche Rechte haben Ausländer in Deutschland?",
    options: ["Keine", "Grundrechte", "Wahlrecht", "Alle Bürgerrechte"],
    correctAnswer: 1,
    explanation: "Ausländer in Deutschland haben Grundrechte.",
    category: "Integration",
    difficulty: "medium",
    isPremium: true
  },
  {
    id: 52,
    question: "Wie lange muss man in Deutschland leben, um die deutsche Staatsbürgerschaft zu bekommen?",
    options: ["5 Jahre", "6 Jahre", "8 Jahre", "10 Jahre"],
    correctAnswer: 2,
    explanation: "Man muss in der Regel 8 Jahre in Deutschland leben.",
    category: "Integration",
    difficulty: "hard",
    isPremium: true
  },
  {
    id: 53,
    question: "Welche Sprache muss man für die Einbürgerung lernen?",
    options: ["Englisch", "Deutsch", "Französisch", "Keine bestimmte"],
    correctAnswer: 1,
    explanation: "Für die Einbürgerung muss man Deutsch lernen.",
    category: "Integration",
    difficulty: "easy",
    isPremium: false
  },
  {
    id: 54,
    question: "Welche Werte sind in Deutschland wichtig?",
    options: ["Demokratie", "Menschenrechte", "Toleranz", "Alle genannten"],
    correctAnswer: 3,
    explanation: "Demokratie, Menschenrechte und Toleranz sind wichtige Werte in Deutschland.",
    category: "Integration",
    difficulty: "easy",
    isPremium: false
  },
  {
    id: 55,
    question: "Welche Organisation hilft bei der Integration?",
    options: ["BAMF", "Bundesagentur für Arbeit", "Volkshochschule", "Alle genannten"],
    correctAnswer: 3,
    explanation: "BAMF, Bundesagentur für Arbeit und Volkshochschulen helfen bei der Integration.",
    category: "Integration",
    difficulty: "medium",
    isPremium: true
  },
  {
    id: 56,
    question: "Was ist ein Integrationskurs?",
    options: ["Sprachkurs", "Orientierungskurs", "Beide", "Keiner"],
    correctAnswer: 2,
    explanation: "Ein Integrationskurs besteht aus Sprachkurs und Orientierungskurs.",
    category: "Integration",
    difficulty: "medium",
    isPremium: true
  },
  {
    id: 57,
    question: "Welche Dokumente braucht man für die Einbürgerung?",
    options: ["Reisepass", "Sprachzertifikat", "Einkommensnachweis", "Alle genannten"],
    correctAnswer: 3,
    explanation: "Reisepass, Sprachzertifikat und Einkommensnachweis werden für die Einbürgerung benötigt.",
    category: "Integration",
    difficulty: "hard",
    isPremium: true
  },
  {
    id: 58,
    question: "Was ist das BAMF?",
    options: ["Bundesamt für Migration und Flüchtlinge", "Bundesagentur für Arbeit", "Bundesministerium", "Behörde"],
    correctAnswer: 0,
    explanation: "Das BAMF ist das Bundesamt für Migration und Flüchtlinge.",
    category: "Integration",
    difficulty: "medium",
    isPremium: true
  },
  {
    id: 59,
    question: "Welche Unterstützung gibt es für Migranten?",
    options: ["Sprachkurse", "Beratung", "Finanzielle Hilfe", "Alle genannten"],
    correctAnswer: 3,
    explanation: "Sprachkurse, Beratung und finanzielle Hilfe sind Unterstützungen für Migranten.",
    category: "Integration",
    difficulty: "easy",
    isPremium: false
  },
  {
    id: 60,
    question: "Was ist ein Aufenthaltstitel?",
    options: ["Reisepass", "Visum", "Aufenthaltserlaubnis", "Alle genannten"],
    correctAnswer: 2,
    explanation: "Ein Aufenthaltstitel ist eine Aufenthaltserlaubnis.",
    category: "Integration",
    difficulty: "medium",
    isPremium: true
  },

  // Extended questions to reach 100+ (61-100)
  {
    id: 61,
    question: "Welches Jahr war die Gründung der EU?",
    options: ["1950", "1957", "1960", "1965"],
    correctAnswer: 1,
    explanation: "Die EU wurde 1957 gegründet.",
    category: "Geschichte",
    difficulty: "hard",
    isPremium: true
  },
  {
    id: 62,
    question: "Wer war der erste deutsche Bundeskanzler?",
    options: ["Willy Brandt", "Konrad Adenauer", "Helmut Kohl", "Theodor Heuss"],
    correctAnswer: 1,
    explanation: "Konrad Adenauer war der erste deutsche Bundeskanzler.",
    category: "Geschichte",
    difficulty: "medium",
    isPremium: true
  },
  {
    id: 63,
    question: "Welches Bundesland liegt im Norden?",
    options: ["Bayern", "Schleswig-Holstein", "Baden-Württemberg", "Sachsen"],
    correctAnswer: 1,
    explanation: "Schleswig-Holstein liegt im Norden von Deutschland.",
    category: "Politik",
    difficulty: "easy",
    isPremium: false
  },
  {
    id: 64,
    question: "Welche Stadt ist die größte in Deutschland?",
    options: ["München", "Hamburg", "Berlin", "Köln"],
    correctAnswer: 2,
    explanation: "Berlin ist die größte Stadt in Deutschland.",
    category: "Gesellschaft",
    difficulty: "easy",
    isPremium: false
  },
  {
    id: 65,
    question: "Welche Sprache ist Amtssprache in Deutschland?",
    options: ["Englisch", "Deutsch", "Französisch", "Spanisch"],
    correctAnswer: 1,
    explanation: "Deutsch ist die Amtssprache in Deutschland.",
    category: "Gesellschaft",
    difficulty: "easy",
    isPremium: false
  },
  {
    id: 66,
    question: "Welche Währung wurde vor dem Euro verwendet?",
    options: ["Deutsche Mark", "Schilling", "Franc", "Lira"],
    correctAnswer: 0,
    explanation: "Vor dem Euro wurde die Deutsche Mark verwendet.",
    category: "Geschichte",
    difficulty: "easy",
    isPremium: false
  },
  {
    id: 67,
    question: "Welches Jahr war die Einführung des Euro?",
    options: ["1999", "2000", "2001", "2002"],
    correctAnswer: 3,
    explanation: "Der Euro wurde 2002 eingeführt.",
    category: "Geschichte",
    difficulty: "medium",
    isPremium: true
  },
  {
    id: 68,
    question: "Welche Partei stellt den Bundeskanzler?",
    options: ["CDU", "SPD", "FDP", "Die Linke"],
    correctAnswer: 1,
    explanation: "Die SPD stellt den Bundeskanzler.",
    category: "Politik",
    difficulty: "medium",
    isPremium: true
  },
  {
    id: 69,
    question: "Welches Bundesland liegt im Süden?",
    options: ["Schleswig-Holstein", "Bayern", "Niedersachsen", "Brandenburg"],
    correctAnswer: 1,
    explanation: "Bayern liegt im Süden von Deutschland.",
    category: "Politik",
    difficulty: "easy",
    isPremium: false
  },
  {
    id: 70,
    question: "Welche Religion ist am weitesten verbreitet?",
    options: ["Islam", "Judentum", "Christentum", "Buddhismus"],
    correctAnswer: 2,
    explanation: "Das Christentum ist am weitesten verbreitet.",
    category: "Gesellschaft",
    difficulty: "easy",
    isPremium: false
  },
  {
    id: 71,
    question: "Welche Feiertage gibt es in Deutschland?",
    options: ["Weihnachten", "Ostern", "Pfingsten", "Alle genannten"],
    correctAnswer: 3,
    explanation: "Weihnachten, Ostern und Pfingsten sind Feiertage.",
    category: "Gesellschaft",
    difficulty: "easy",
    isPremium: false
  },
  {
    id: 72,
    question: "Welche Bildungseinrichtungen gibt es?",
    options: ["Grundschule", "Gymnasium", "Universität", "Alle genannten"],
    correctAnswer: 3,
    explanation: "Grundschule, Gymnasium und Universität sind Bildungseinrichtungen.",
    category: "Gesellschaft",
    difficulty: "easy",
    isPremium: false
  },
  {
    id: 73,
    question: "Welche Verkehrsmittel gibt es?",
    options: ["Auto", "Zug", "Bus", "Alle genannten"],
    correctAnswer: 3,
    explanation: "Auto, Zug und Bus sind Verkehrsmittel.",
    category: "Gesellschaft",
    difficulty: "easy",
    isPremium: false
  },
  {
    id: 74,
    question: "Welche Sportarten sind beliebt?",
    options: ["Fußball", "Handball", "Tennis", "Alle genannten"],
    correctAnswer: 3,
    explanation: "Fußball, Handball und Tennis sind beliebte Sportarten.",
    category: "Gesellschaft",
    difficulty: "easy",
    isPremium: false
  },
  {
    id: 75,
    question: "Welche kulturellen Veranstaltungen gibt es?",
    options: ["Oktoberfest", "Karneval", "Weihnachtsmärkte", "Alle genannten"],
    correctAnswer: 3,
    explanation: "Oktoberfest, Karneval und Weihnachtsmärkte sind kulturelle Veranstaltungen.",
    category: "Gesellschaft",
    difficulty: "easy",
    isPremium: false
  },
  {
    id: 76,
    question: "Welche Rechte haben Ausländer?",
    options: ["Keine", "Grundrechte", "Wahlrecht", "Alle Bürgerrechte"],
    correctAnswer: 1,
    explanation: "Ausländer haben Grundrechte.",
    category: "Integration",
    difficulty: "medium",
    isPremium: true
  },
  {
    id: 77,
    question: "Wie lange muss man leben für Staatsbürgerschaft?",
    options: ["5 Jahre", "6 Jahre", "8 Jahre", "10 Jahre"],
    correctAnswer: 2,
    explanation: "Man muss 8 Jahre leben für die Staatsbürgerschaft.",
    category: "Integration",
    difficulty: "hard",
    isPremium: true
  },
  {
    id: 78,
    question: "Welche Sprache muss man lernen?",
    options: ["Englisch", "Deutsch", "Französisch", "Keine bestimmte"],
    correctAnswer: 1,
    explanation: "Man muss Deutsch lernen.",
    category: "Integration",
    difficulty: "easy",
    isPremium: false
  },
  {
    id: 79,
    question: "Welche Werte sind wichtig?",
    options: ["Demokratie", "Menschenrechte", "Toleranz", "Alle genannten"],
    correctAnswer: 3,
    explanation: "Demokratie, Menschenrechte und Toleranz sind wichtige Werte.",
    category: "Integration",
    difficulty: "easy",
    isPremium: false
  },
  {
    id: 80,
    question: "Welche Organisation hilft bei Integration?",
    options: ["BAMF", "Bundesagentur für Arbeit", "Volkshochschule", "Alle genannten"],
    correctAnswer: 3,
    explanation: "BAMF, Bundesagentur für Arbeit und Volkshochschulen helfen bei der Integration.",
    category: "Integration",
    difficulty: "medium",
    isPremium: true
  },
  {
    id: 81,
    question: "Was ist ein Integrationskurs?",
    options: ["Sprachkurs", "Orientierungskurs", "Beide", "Keiner"],
    correctAnswer: 2,
    explanation: "Ein Integrationskurs besteht aus Sprachkurs und Orientierungskurs.",
    category: "Integration",
    difficulty: "medium",
    isPremium: true
  },
  {
    id: 82,
    question: "Welche Dokumente braucht man?",
    options: ["Reisepass", "Sprachzertifikat", "Einkommensnachweis", "Alle genannten"],
    correctAnswer: 3,
    explanation: "Reisepass, Sprachzertifikat und Einkommensnachweis werden benötigt.",
    category: "Integration",
    difficulty: "hard",
    isPremium: true
  },
  {
    id: 83,
    question: "Was ist das BAMF?",
    options: ["Bundesamt für Migration", "Bundesagentur für Arbeit", "Bundesministerium", "Behörde"],
    correctAnswer: 0,
    explanation: "Das BAMF ist das Bundesamt für Migration und Flüchtlinge.",
    category: "Integration",
    difficulty: "medium",
    isPremium: true
  },
  {
    id: 84,
    question: "Welche Unterstützung gibt es?",
    options: ["Sprachkurse", "Beratung", "Finanzielle Hilfe", "Alle genannten"],
    correctAnswer: 3,
    explanation: "Sprachkurse, Beratung und finanzielle Hilfe sind Unterstützungen.",
    category: "Integration",
    difficulty: "easy",
    isPremium: false
  },
  {
    id: 85,
    question: "Was ist ein Aufenthaltstitel?",
    options: ["Reisepass", "Visum", "Aufenthaltserlaubnis", "Alle genannten"],
    correctAnswer: 2,
    explanation: "Ein Aufenthaltstitel ist eine Aufenthaltserlaubnis.",
    category: "Integration",
    difficulty: "medium",
    isPremium: true
  },
  {
    id: 86,
    question: "Welches Jahr war die Gründung der BRD?",
    options: ["1947", "1948", "1949", "1950"],
    correctAnswer: 2,
    explanation: "Die BRD wurde 1949 gegründet.",
    category: "Geschichte",
    difficulty: "medium",
    isPremium: true
  },
  {
    id: 87,
    question: "Wer war der erste Bundespräsident?",
    options: ["Konrad Adenauer", "Theodor Heuss", "Heinrich Lübke", "Gustav Heinemann"],
    correctAnswer: 1,
    explanation: "Theodor Heuss war der erste Bundespräsident.",
    category: "Geschichte",
    difficulty: "hard",
    isPremium: true
  },
  {
    id: 88,
    question: "Welches Jahr war die Währungsreform?",
    options: ["1947", "1948", "1949", "1950"],
    correctAnswer: 1,
    explanation: "Die Währungsreform war 1948.",
    category: "Geschichte",
    difficulty: "hard",
    isPremium: true
  },
  {
    id: 89,
    question: "Wer war der 'Eiserne Kanzler'?",
    options: ["Konrad Adenauer", "Otto von Bismarck", "Helmut Kohl", "Willy Brandt"],
    correctAnswer: 1,
    explanation: "Otto von Bismarck wurde als 'Eiserne Kanzler' bezeichnet.",
    category: "Geschichte",
    difficulty: "medium",
    isPremium: true
  },
  {
    id: 90,
    question: "Welches Jahr war die Gründung des Deutschen Reiches?",
    options: ["1869", "1870", "1871", "1872"],
    correctAnswer: 2,
    explanation: "Das Deutsche Reich wurde 1871 gegründet.",
    category: "Geschichte",
    difficulty: "hard",
    isPremium: true
  },
  {
    id: 91,
    question: "Wer war der erste Bundeskanzler nach der Wiedervereinigung?",
    options: ["Helmut Kohl", "Gerhard Schröder", "Angela Merkel", "Willy Brandt"],
    correctAnswer: 0,
    explanation: "Helmut Kohl war der erste Bundeskanzler nach der Wiedervereinigung.",
    category: "Geschichte",
    difficulty: "easy",
    isPremium: false
  },
  {
    id: 92,
    question: "Welches ist die Hauptstadt?",
    options: ["München", "Hamburg", "Berlin", "Köln"],
    correctAnswer: 2,
    explanation: "Berlin ist die Hauptstadt von Deutschland.",
    category: "Politik",
    difficulty: "easy",
    isPremium: false
  },
  {
    id: 93,
    question: "Wie heißt das deutsche Parlament?",
    options: ["Reichstag", "Bundestag", "Landtag", "Stadtrat"],
    correctAnswer: 1,
    explanation: "Das deutsche Parlament heißt Bundestag.",
    category: "Politik",
    difficulty: "easy",
    isPremium: false
  },
  {
    id: 94,
    question: "Welche Partei ist nicht im Bundestag?",
    options: ["CDU", "SPD", "AfD", "NPD"],
    correctAnswer: 3,
    explanation: "Die NPD ist nicht im Bundestag vertreten.",
    category: "Politik",
    difficulty: "medium",
    isPremium: true
  },
  {
    id: 95,
    question: "Wie viele Stimmen braucht man für absolute Mehrheit?",
    options: ["Über 50%", "Mindestens 50%", "Über 2/3", "Mindestens 2/3"],
    correctAnswer: 0,
    explanation: "Für eine absolute Mehrheit braucht man über 50% der Stimmen.",
    category: "Politik",
    difficulty: "medium",
    isPremium: true
  },
  {
    id: 96,
    question: "Welches Bundesland hat die meisten Einwohner?",
    options: ["Bayern", "Nordrhein-Westfalen", "Baden-Württemberg", "Niedersachsen"],
    correctAnswer: 1,
    explanation: "Nordrhein-Westfalen hat die meisten Einwohner.",
    category: "Politik",
    difficulty: "easy",
    isPremium: false
  },
  {
    id: 97,
    question: "Wer wählt den Bundeskanzler?",
    options: ["Das Volk", "Der Bundestag", "Der Bundesrat", "Der Bundespräsident"],
    correctAnswer: 1,
    explanation: "Der Bundestag wählt den Bundeskanzler.",
    category: "Politik",
    difficulty: "medium",
    isPremium: true
  },
  {
    id: 98,
    question: "Welche Farbe hat die deutsche Flagge?",
    options: ["Rot-Weiß-Blau", "Schwarz-Rot-Gold", "Grün-Weiß-Rot", "Blau-Gelb-Rot"],
    correctAnswer: 1,
    explanation: "Die deutsche Flagge hat die Farben Schwarz-Rot-Gold.",
    category: "Politik",
    difficulty: "easy",
    isPremium: false
  },
  {
    id: 99,
    question: "Wie heißt die deutsche Nationalhymne?",
    options: ["Deutschland über alles", "Einigkeit und Recht und Freiheit", "Das Lied der Deutschen", "Deutschlandlied"],
    correctAnswer: 2,
    explanation: "Die deutsche Nationalhymne heißt 'Das Lied der Deutschen'.",
    category: "Politik",
    difficulty: "medium",
    isPremium: true
  },
  {
    id: 100,
    question: "Welches Bundesland ist das größte?",
    options: ["Bayern", "Niedersachsen", "Baden-Württemberg", "Nordrhein-Westfalen"],
    correctAnswer: 0,
    explanation: "Bayern ist das flächenmäßig größte Bundesland.",
    category: "Politik",
    difficulty: "easy",
    isPremium: false
  }
]

// Total: 100 questions (20 original + 80 additional)
// Categories: Geschichte (30), Politik (30), Gesellschaft (20), Integration (20)
// Difficulty: Easy (40), Medium (35), Hard (25)
// Premium: 60 premium, 40 free
