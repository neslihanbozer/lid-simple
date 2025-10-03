'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { questions } from '@/lib/questions'

// Import translations
import enTranslations from '../../../locales/en/common.json'
import deTranslations from '../../../locales/de/common.json'

// Question categories data
const questionCategories = [
  { id: 1, name: 'Politics', icon: '🏛️', questions: 50, color: 'blue' },
  { id: 2, name: 'Law', icon: '⚖️', questions: 40, color: 'purple' },
  { id: 3, name: 'Culture', icon: '🎭', questions: 35, color: 'pink' },
  { id: 4, name: 'Economy', icon: '💰', questions: 30, color: 'green' },
  { id: 5, name: 'Education', icon: '📚', questions: 25, color: 'yellow' },
  { id: 6, name: 'Society', icon: '👥', questions: 45, color: 'indigo' },
  { id: 7, name: 'History', icon: '📜', questions: 40, color: 'red' },
  { id: 8, name: 'Integration', icon: '🤝', questions: 30, color: 'teal' }
]

// AI Topic Explanations with detailed content
const aiTopics = [
  { 
    name: 'German History', 
    color: 'bg-red-100 text-red-800 border-red-200',
    content: {
      en: {
        title: 'German History - AI Explanation',
        content: `Germany has a rich and complex history spanning over 1,000 years. Key periods include:

**Medieval Period (800-1500)**
- Holy Roman Empire established by Charlemagne
- Fragmented into numerous small states and principalities
- Rise of powerful cities and trade guilds

**Modern Era (1500-1871)**
- Protestant Reformation started by Martin Luther in 1517
- Thirty Years' War (1618-1648) devastated German lands
- Rise of Prussia as a major European power

**German Empire (1871-1918)**
- Unification under Otto von Bismarck
- Rapid industrialization and economic growth
- World War I and defeat leading to abdication of Kaiser

**Weimar Republic (1918-1933)**
- First German democracy
- Economic instability and hyperinflation
- Rise of extremist parties

**Nazi Period (1933-1945)**
- Adolf Hitler's dictatorship
- World War II and the Holocaust
- Total defeat and occupation by Allied forces

**Division and Reunification (1945-1990)**
- Split into East and West Germany
- Cold War tensions
- Fall of Berlin Wall in 1989
- German reunification in 1990

**Modern Germany (1990-present)**
- European integration and EU leadership
- Economic powerhouse
- Democratic federal republic`
      },
      de: {
        title: 'Deutsche Geschichte - KI-Erklärung',
        content: `Deutschland hat eine reiche und komplexe Geschichte, die über 1.000 Jahre umfasst. Wichtige Perioden sind:

**Mittelalter (800-1500)**
- Heiliges Römisches Reich von Karl dem Großen gegründet
- Zersplitterung in zahlreiche kleine Staaten und Fürstentümer
- Aufstieg mächtiger Städte und Handwerkszünfte

**Neuzeit (1500-1871)**
- Protestantische Reformation von Martin Luther 1517 begonnen
- Dreißigjähriger Krieg (1618-1648) verwüstete deutsche Länder
- Aufstieg Preußens als europäische Großmacht

**Deutsches Kaiserreich (1871-1918)**
- Einigung unter Otto von Bismarck
- Schnelle Industrialisierung und Wirtschaftswachstum
- Erster Weltkrieg und Niederlage führten zur Abdankung des Kaisers

**Weimarer Republik (1918-1933)**
- Erste deutsche Demokratie
- Wirtschaftliche Instabilität und Hyperinflation
- Aufstieg extremistischer Parteien

**NS-Zeit (1933-1945)**
- Adolf Hitlers Diktatur
- Zweiter Weltkrieg und Holocaust
- Totale Niederlage und Besetzung durch Alliierte

**Teilung und Wiedervereinigung (1945-1990)**
- Teilung in Ost- und Westdeutschland
- Spannungen des Kalten Krieges
- Fall der Berliner Mauer 1989
- Deutsche Wiedervereinigung 1990

**Modernes Deutschland (1990-heute)**
- Europäische Integration und EU-Führung
- Wirtschaftsmacht
- Demokratische Bundesrepublik`
      }
    }
  },
  { 
    name: 'German Politics', 
    color: 'bg-blue-100 text-blue-800 border-blue-200',
    content: {
      en: {
        title: 'German Politics - AI Explanation',
        content: `Germany is a federal parliamentary republic with a complex political system:

**Federal Structure**
- 16 federal states (Bundesländer)
- Federal government (Bund) and state governments
- Division of powers between federal and state levels

**Government Structure**
- **Federal President (Bundespräsident)**: Head of state, largely ceremonial
- **Federal Chancellor (Bundeskanzler)**: Head of government, most powerful position
- **Federal Cabinet**: Ministers appointed by Chancellor
- **Federal Parliament (Bundestag)**: Lower house, directly elected
- **Federal Council (Bundesrat)**: Upper house, represents states

**Political Parties**
- **CDU/CSU**: Conservative Christian Democratic parties
- **SPD**: Social Democratic Party (center-left)
- **FDP**: Free Democratic Party (liberal)
- **Die Linke**: The Left Party (socialist)
- **Bündnis 90/Die Grünen**: Green Party (environmental)
- **AfD**: Alternative for Germany (right-wing populist)

**Electoral System**
- Mixed-member proportional representation
- 5% threshold for parliamentary representation
- Coalition governments are common

**Key Principles**
- Rule of law (Rechtsstaat)
- Federal democracy
- Social market economy
- European integration`
      },
      de: {
        title: 'Deutsche Politik - KI-Erklärung',
        content: `Deutschland ist eine föderale parlamentarische Republik mit einem komplexen politischen System:

**Föderale Struktur**
- 16 Bundesländer
- Bundesregierung und Landesregierungen
- Gewaltenteilung zwischen Bund und Ländern

**Regierungsstruktur**
- **Bundespräsident**: Staatsoberhaupt, weitgehend zeremoniell
- **Bundeskanzler**: Regierungschef, mächtigste Position
- **Bundeskabinett**: Vom Kanzler ernannte Minister
- **Bundestag**: Unterhaus, direkt gewählt
- **Bundesrat**: Oberhaus, vertritt die Länder

**Politische Parteien**
- **CDU/CSU**: Konservative christdemokratische Parteien
- **SPD**: Sozialdemokratische Partei (Mitte-links)
- **FDP**: Freie Demokratische Partei (liberal)
- **Die Linke**: Linkspartei (sozialistisch)
- **Bündnis 90/Die Grünen**: Grüne Partei (Umwelt)
- **AfD**: Alternative für Deutschland (rechtspopulistisch)

**Wahlsystem**
- Personalisiertes Verhältniswahlrecht
- 5%-Hürde für Parlamentsvertretung
- Koalitionsregierungen sind üblich

**Grundprinzipien**
- Rechtsstaat
- Föderale Demokratie
- Soziale Marktwirtschaft
- Europäische Integration`
      }
    }
  },
  { 
    name: 'Integration', 
    color: 'bg-green-100 text-green-800 border-green-200',
    content: {
      en: {
        title: 'Integration in Germany - AI Explanation',
        content: `Integration is a key concept in German society, especially for immigrants:

**Legal Framework**
- Integration Act (Integrationsgesetz)
- Residence Act (Aufenthaltsgesetz)
- Citizenship Act (Staatsangehörigkeitsgesetz)

**Integration Courses**
- **Language Learning**: German courses from A1 to B1 level
- **Orientation Course**: 100 hours covering German history, culture, and legal system
- **Life in Germany Test**: Final exam covering civic knowledge
- **Certificate**: Required for permanent residence and citizenship

**Key Integration Areas**
- **Language Skills**: German proficiency is essential
- **Employment**: Access to job market and vocational training
- **Education**: School system and higher education opportunities
- **Social Participation**: Community involvement and civic engagement
- **Cultural Understanding**: German values and social norms

**Rights and Responsibilities**
- **Rights**: Equal treatment, access to services, protection under law
- **Responsibilities**: Follow German laws, pay taxes, respect democratic values

**Support Services**
- Integration centers and counseling
- Job placement assistance
- Social services and benefits
- Educational support for children

**Challenges and Opportunities**
- Language barriers
- Recognition of foreign qualifications
- Cultural differences
- Economic opportunities in diverse society`
      },
      de: {
        title: 'Integration in Deutschland - KI-Erklärung',
        content: `Integration ist ein Schlüsselkonzept in der deutschen Gesellschaft, besonders für Einwanderer:

**Rechtlicher Rahmen**
- Integrationsgesetz
- Aufenthaltsgesetz
- Staatsangehörigkeitsgesetz

**Integrationskurse**
- **Sprachlernen**: Deutschkurse von A1 bis B1 Niveau
- **Orientierungskurs**: 100 Stunden über deutsche Geschichte, Kultur und Rechtssystem
- **Leben in Deutschland Test**: Abschlussprüfung über Bürgerkunde
- **Zertifikat**: Erforderlich für Niederlassungserlaubnis und Einbürgerung

**Wichtige Integrationsbereiche**
- **Sprachkenntnisse**: Deutsche Sprachkompetenz ist wesentlich
- **Beschäftigung**: Zugang zum Arbeitsmarkt und Berufsausbildung
- **Bildung**: Schulsystem und Hochschulbildungsmöglichkeiten
- **Gesellschaftliche Teilhabe**: Gemeinschaftsbeteiligung und bürgerliches Engagement
- **Kulturelles Verständnis**: Deutsche Werte und gesellschaftliche Normen

**Rechte und Pflichten**
- **Rechte**: Gleichbehandlung, Zugang zu Dienstleistungen, Rechtsschutz
- **Pflichten**: Deutsche Gesetze befolgen, Steuern zahlen, demokratische Werte respektieren

**Unterstützungsdienste**
- Integrationszentren und Beratung
- Arbeitsvermittlungshilfe
- Soziale Dienste und Leistungen
- Bildungsunterstützung für Kinder

**Herausforderungen und Chancen**
- Sprachbarrieren
- Anerkennung ausländischer Qualifikationen
- Kulturelle Unterschiede
- Wirtschaftliche Chancen in vielfältiger Gesellschaft`
      }
    }
  },
  { 
    name: 'Values', 
    color: 'bg-purple-100 text-purple-800 border-purple-200',
    content: {
      en: {
        title: 'German Values - AI Explanation',
        content: `German society is built on fundamental values enshrined in the Basic Law:

**Constitutional Values**
- **Human Dignity**: Inviolable foundation of all rights
- **Democracy**: Popular sovereignty and rule of law
- **Rule of Law (Rechtsstaat)**: Legal certainty and fair procedures
- **Federal System**: Balance between central and regional government
- **Social State**: Welfare system and social justice

**Core Democratic Principles**
- **Freedom of Expression**: Right to free speech and press
- **Religious Freedom**: Freedom of belief and worship
- **Equality**: Equal rights regardless of gender, race, or religion
- **Pluralism**: Acceptance of diverse opinions and lifestyles
- **Tolerance**: Respect for different viewpoints

**Social Values**
- **Punctuality**: Being on time is highly valued
- **Reliability**: Keeping promises and commitments
- **Direct Communication**: Honest and straightforward interaction
- **Environmental Consciousness**: Sustainability and green living
- **Work-Life Balance**: Importance of leisure and family time

**Historical Lessons**
- **Never Again**: Commitment to preventing totalitarianism
- **European Integration**: Peace through cooperation
- **Remembrance Culture**: Learning from historical mistakes
- **Minority Protection**: Safeguarding vulnerable groups

**Modern Challenges**
- Integration of diverse communities
- Balancing security and freedom
- Digital transformation and privacy
- Climate change and sustainability
- Maintaining democratic institutions`
      },
      de: {
        title: 'Deutsche Werte - KI-Erklärung',
        content: `Die deutsche Gesellschaft basiert auf Grundwerten, die im Grundgesetz verankert sind:

**Verfassungswerte**
- **Menschenwürde**: Unantastbare Grundlage aller Rechte
- **Demokratie**: Volkssouveränität und Rechtsstaatlichkeit
- **Rechtsstaat**: Rechtssicherheit und faire Verfahren
- **Föderalismus**: Balance zwischen Zentral- und Regionalregierung
- **Sozialstaat**: Wohlfahrtssystem und soziale Gerechtigkeit

**Demokratische Grundprinzipien**
- **Meinungsfreiheit**: Recht auf freie Rede und Presse
- **Religionsfreiheit**: Glaubens- und Bekenntnisfreiheit
- **Gleichberechtigung**: Gleiche Rechte unabhängig von Geschlecht, Rasse oder Religion
- **Pluralismus**: Akzeptanz verschiedener Meinungen und Lebensstile
- **Toleranz**: Respekt für unterschiedliche Standpunkte

**Gesellschaftliche Werte**
- **Pünktlichkeit**: Rechtzeitigkeit wird hoch geschätzt
- **Zuverlässigkeit**: Versprechen und Verpflichtungen einhalten
- **Direkte Kommunikation**: Ehrliche und geradlinige Interaktion
- **Umweltbewusstsein**: Nachhaltigkeit und grünes Leben
- **Work-Life-Balance**: Bedeutung von Freizeit und Familienzeit

**Historische Lehren**
- **Nie wieder**: Verpflichtung zur Verhinderung von Totalitarismus
- **Europäische Integration**: Frieden durch Zusammenarbeit
- **Erinnerungskultur**: Lernen aus historischen Fehlern
- **Minderheitenschutz**: Schutz gefährdeter Gruppen

**Moderne Herausforderungen**
- Integration vielfältiger Gemeinschaften
- Balance zwischen Sicherheit und Freiheit
- Digitale Transformation und Datenschutz
- Klimawandel und Nachhaltigkeit
- Erhaltung demokratischer Institutionen`
      }
    }
  }
]

export default function PremiumDashboard() {
  const { data: session } = useSession()
  const [language, setLanguage] = useState('en')
  const [translations, setTranslations] = useState(enTranslations)
  const [mounted, setMounted] = useState(false)
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [showQuestions, setShowQuestions] = useState(false)

  useEffect(() => {
    setMounted(true)
    setTranslations(language === 'en' ? enTranslations : deTranslations)
  }, [language])

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(categoryName)
    setShowQuestions(true)
  }

  const getCategoryQuestions = (categoryName: string) => {
    // Filter questions by category - for now showing first 10 questions as example
    // In real implementation, questions should have category field
    return questions.slice(0, 10)
  }

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
        {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="flex items-center">
                <img 
                  src="/logo/lid_logo.png" 
                  alt="Leben in Deutschland Test Logo" 
                  className="w-28 h-28 object-contain"
                  onError={(e) => {
                    // Fallback to star icon if logo fails to load
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement!.innerHTML = `
                      <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <span class="text-white text-sm font-bold">★</span>
                      </div>
                    `;
                  }}
                />
                <span className="ml-2 text-xl font-bold text-gray-800">Leben in Deutschland Test</span>
              </div>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium">
                {language === 'en' ? 'Home' : 'Startseite'}
              </Link>
              <Link href="/dashboard" className="text-blue-600 font-medium">
                {language === 'en' ? 'Dashboard' : 'Dashboard'}
              </Link>
              
              
              <div className="flex space-x-4">
                <Link href="/auth/signin" className="text-gray-700 hover:text-blue-600 font-medium">Login</Link>
                <Link href="/auth/signup" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium">Sign up</Link>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 mb-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center mb-4">
                <h1 className="text-3xl font-bold mr-4">
                  {language === 'en' ? 'Premium Dashboard' : 'Premium-Dashboard'}
              </h1>
                <span className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-semibold">
                  PREMIUM
                </span>
              </div>
              <p className="text-xl opacity-90">
                {language === 'en' 
                  ? `Welcome Back, ${session?.user?.name || 'User'}! You now have access to over 300+ questions and all premium features.`
                  : `Willkommen zurück, ${session?.user?.name || 'Benutzer'}! Sie haben jetzt Zugang zu über 300+ Fragen und allen Premium-Funktionen.`
                }
              </p>
            </div>
            <div className="hidden lg:block">
              <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <span className="text-4xl">🎯</span>
              </div>
            </div>
          </div>
        </div>


        {/* State Selection and Language Selection */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* State Selection */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              {language === 'en' ? 'State Selection' : 'Bundesland-Auswahl'}
            </h2>
            <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option>{language === 'en' ? 'All States' : 'Alle Bundesländer'}</option>
              <option>Baden-Württemberg</option>
              <option>Bayern</option>
              <option>Berlin</option>
              <option>Brandenburg</option>
              <option>Bremen</option>
              <option>Hamburg</option>
              <option>Hessen</option>
              <option>Mecklenburg-Vorpommern</option>
              <option>Niedersachsen</option>
              <option>Nordrhein-Westfalen</option>
              <option>Rheinland-Pfalz</option>
              <option>Saarland</option>
              <option>Sachsen</option>
              <option>Sachsen-Anhalt</option>
              <option>Schleswig-Holstein</option>
              <option>Thüringen</option>
            </select>
          </div>

          {/* Language Selection */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              {language === 'en' ? 'Language Selection' : 'Sprachauswahl'}
            </h2>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setLanguage('de')}
                className={`p-3 rounded-lg font-medium transition-colors ${
                  language === 'de' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                🇩🇪 DE
              </button>
              <button
                onClick={() => setLanguage('de-tr')}
                className={`p-3 rounded-lg font-medium transition-colors ${
                  language === 'de-tr' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                🇩🇪🇹🇷 DE+TR
              </button>
              <button
                onClick={() => setLanguage('de-en')}
                className={`p-3 rounded-lg font-medium transition-colors ${
                  language === 'de-en' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                🇩🇪🇺🇸 DE+EN
              </button>
              <button
                onClick={() => setLanguage('de-fr')}
                className={`p-3 rounded-lg font-medium transition-colors ${
                  language === 'de-fr' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                🇩🇪🇫🇷 DE+FR
              </button>
              <button
                onClick={() => setLanguage('de-es')}
                className={`p-3 rounded-lg font-medium transition-colors ${
                  language === 'de-es' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                🇩🇪🇪🇸 DE+ES
              </button>
              <button
                onClick={() => setLanguage('de-ar')}
                className={`p-3 rounded-lg font-medium transition-colors ${
                  language === 'de-ar' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                🇩🇪🇸🇦 DE+AR
              </button>
            </div>
          </div>
        </div>

        {/* Question Categories */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              {language === 'en' ? 'Question Categories (300+ Questions)' : 'Fragenkategorien (300+ Fragen)'}
            </h2>
            <button className="text-blue-600 hover:text-blue-700 font-medium">
              {language === 'en' ? 'View All Questions' : 'Alle Fragen anzeigen'}
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {questionCategories.map((category) => (
              <div
                key={category.id}
                className={`bg-gradient-to-br from-${category.color}-50 to-${category.color}-100 rounded-xl p-6 hover:shadow-lg transition-all cursor-pointer group`}
                onClick={() => handleCategoryClick(category.name)}
              >
                <div className="text-3xl mb-3">{category.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{category.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{category.questions} questions</p>
                <button className="w-full bg-white hover:bg-gray-50 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors group-hover:shadow-md">
                  {language === 'en' ? 'Start Quiz' : 'Quiz starten'}
                </button>
                </div>
            ))}
          </div>
        </div>

        {/* Selected Category Questions */}
        {showQuestions && selectedCategory && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                {selectedCategory} {language === 'en' ? 'Questions' : 'Fragen'}
              </h2>
                <button
                onClick={() => setShowQuestions(false)}
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                ✕
                </button>
              </div>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {getCategoryQuestions(selectedCategory).map((question, index) => (
                <div key={question.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-medium text-gray-900 flex-1">
                      {index + 1}. {question.question}
                    </h3>
                  </div>
                  <div className="space-y-2">
                    {question.options.map((option, optionIndex) => (
                      <div 
                        key={optionIndex} 
                        className={`p-2 rounded border ${
                          optionIndex === question.correctAnswer 
                            ? 'bg-green-50 border-green-200 text-green-800' 
                            : 'bg-gray-50 border-gray-200'
                        }`}
                      >
                        {String.fromCharCode(65 + optionIndex)}) {option}
                        {optionIndex === question.correctAnswer && (
                          <span className="ml-2 text-green-600 font-medium">✓ Doğru</span>
                        )}
            </div>
                    ))}
                </div>
                  {question.explanation && (
                    <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded">
                      <p className="text-sm text-blue-800">
                        <strong>Açıklama:</strong> {question.explanation}
                      </p>
                </div>
              )}
            </div>
              ))}
                </div>
            <div className="mt-6 text-center">
              <Link href="/quiz">
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium">
                  {language === 'en' ? 'Start Interactive Quiz' : 'Interaktives Quiz starten'}
                </button>
              </Link>
          </div>
        </div>
        )}


        {/* Additional Tools */}
        <div className="grid md:grid-cols-3 gap-6">
          <Link href="/progress" className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all group">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900">
                {language === 'en' ? 'Progress Tracking' : 'Fortschrittsverfolgung'}
              </h3>
            </div>
            <p className="text-gray-600 mb-4">
              {language === 'en' 
                ? 'Monitor your learning progress and track improvements'
                : 'Überwachen Sie Ihren Lernfortschritt und verfolgen Sie Verbesserungen'
              }
            </p>
            <div className="text-blue-600 font-medium group-hover:text-blue-700">
              {language === 'en' ? 'View Progress →' : 'Fortschritt anzeigen →'}
            </div>
            </Link>


          <Link href="/wrong-answers" className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all group">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mr-4">
                <span className="text-2xl">❌</span>
          </div>
              <h3 className="text-lg font-bold text-gray-900">
                {language === 'en' ? 'Wrong Answers Review' : 'Falsche Antworten überprüfen'}
              </h3>
          </div>
            <p className="text-gray-600 mb-4">
              {language === 'en' 
                ? 'Review and learn from your incorrect answers'
                : 'Überprüfen und lernen Sie aus Ihren falschen Antworten'
              }
            </p>
            <div className="text-red-600 font-medium group-hover:text-red-700">
              {language === 'en' ? 'Review Answers →' : 'Antworten überprüfen →'}
          </div>
            </Link>
          </div>
      </main>

    </div>
  )
}
