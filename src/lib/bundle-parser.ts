// Client-side compatible bundle parser
// No Node.js modules imported

// Bundle question types
export interface BundleChoice {
  id: string
  text: string
}

export interface BundleQuestion {
  id: string
  numberInCatalog: number
  text: string
  choices: BundleChoice[]
  state?: string
  kind: 'text' | 'image-choice'
  source: {
    pdfUrl: string
    pdfStand: string
  }
}

// Application question types
export interface AppQuestion {
  id: number
  question: string
  questionEn?: string
  questionFr?: string
  questionEs?: string
  questionTr?: string
  questionRu?: string
  questionAr?: string
  options: string[]
  optionsEn?: string[]
  optionsFr?: string[]
  optionsEs?: string[]
  optionsTr?: string[]
  optionsRu?: string[]
  optionsAr?: string[]
  correctAnswer: number
  explanation: string
  explanationEn?: string
  explanationFr?: string
  explanationEs?: string
  explanationTr?: string
  explanationRu?: string
  explanationAr?: string
  category: string
  difficulty: string
  isPremium: boolean
  state?: string
  isStateQuestion?: boolean
}

// State codes mapping
const STATE_CODES: Record<string, string> = {
  'BW': 'Baden-Württemberg',
  'BY': 'Bayern',
  'BE': 'Berlin',
  'BB': 'Brandenburg',
  'HB': 'Bremen',
  'HH': 'Hamburg',
  'HE': 'Hessen',
  'MV': 'Mecklenburg-Vorpommern',
  'NI': 'Niedersachsen',
  'NW': 'Nordrhein-Westfalen',
  'RP': 'Rheinland-Pfalz',
  'SL': 'Saarland',
  'SN': 'Sachsen',
  'ST': 'Sachsen-Anhalt',
  'SH': 'Schleswig-Holstein',
  'TH': 'Thüringen'
}

// Category mapping based on question content
function getCategoryFromText(text: string): string {
  const lowerText = text.toLowerCase()
  
  if (lowerText.includes('geschichte') || lowerText.includes('historisch') || 
      lowerText.includes('krieg') || lowerText.includes('mauer') || 
      lowerText.includes('wiedervereinigung') || lowerText.includes('kaiser')) {
    return 'Geschichte'
  }
  
  if (lowerText.includes('politik') || lowerText.includes('wahl') || 
      lowerText.includes('bundestag') || lowerText.includes('kanzler') ||
      lowerText.includes('präsident') || lowerText.includes('partei')) {
    return 'Politik'
  }
  
  if (lowerText.includes('gesellschaft') || lowerText.includes('einwohner') ||
      lowerText.includes('religion') || lowerText.includes('sprache') ||
      lowerText.includes('währung') || lowerText.includes('kultur')) {
    return 'Gesellschaft'
  }
  
  if (lowerText.includes('ausländer') || lowerText.includes('einbürgerung') ||
      lowerText.includes('staatsbürgerschaft') || lowerText.includes('integration') ||
      lowerText.includes('rechte') || lowerText.includes('werte')) {
    return 'Integration'
  }
  
  return 'Gesellschaft' // Default category
}

// Difficulty mapping
function getDifficultyFromNumber(number: number): string {
  if (number <= 100) return 'easy'
  if (number <= 200) return 'medium'
  return 'hard'
}

// Convert bundle question to app format
function convertBundleQuestion(bundleQ: BundleQuestion, appId: number): AppQuestion {
  // Extract correct answer (assuming it's always the first choice for now)
  // In real implementation, you'd need to parse this from the source
  const correctAnswer = 0 // This should be determined from the actual correct answer
  
  // Determine if it's premium (general questions are free, state questions are premium)
  const isPremium = bundleQ.state ? true : false
  
  // Get category
  const category = getCategoryFromText(bundleQ.text)
  
  // Get difficulty
  const difficulty = getDifficultyFromNumber(bundleQ.numberInCatalog)
  
  // Convert choices to options array
  const options = bundleQ.choices.map(choice => choice.text)
  
  // Create explanation (placeholder - in real implementation, you'd parse this)
  const explanation = `Erklärung für Frage ${bundleQ.numberInCatalog}: ${bundleQ.text.substring(0, 100)}...`
  
  // Generate translations for all languages
  const generateTranslations = (text: string) => {
    // German to English translations
    const enTranslations: { [key: string]: string } = {
      'Deutschland': 'Germany',
      'Menschen': 'people',
      'Regierung': 'government',
      'sagen': 'say',
      'dürfen': 'may/are allowed to',
      'weil': 'because',
      'Meinungsfreiheit': 'freedom of opinion',
      'Religionsfreiheit': 'religious freedom',
      'Wahlrecht': 'right to vote',
      'Steuern': 'taxes',
      'zahlen': 'pay',
      'gilt': 'applies',
      'haben': 'have',
      'offen': 'openly',
      'gegen': 'against',
      'etwas': 'something'
    }

    // German to Russian translations
    const ruTranslations: { [key: string]: string } = {
      'Deutschland': 'Германия',
      'Menschen': 'люди',
      'Regierung': 'правительство',
      'sagen': 'говорить',
      'dürfen': 'разрешено',
      'weil': 'потому что',
      'Meinungsfreiheit': 'свобода мнений',
      'Religionsfreiheit': 'свобода вероисповедания',
      'Wahlrecht': 'избирательное право',
      'Steuern': 'налоги',
      'zahlen': 'платить',
      'gilt': 'применяется',
      'haben': 'иметь',
      'offen': 'открыто',
      'gegen': 'против',
      'etwas': 'что-то'
    }

    // German to Turkish translations
    const trTranslations: { [key: string]: string } = {
      'Deutschland': 'Almanya',
      'Menschen': 'insanlar',
      'Regierung': 'hükümet',
      'sagen': 'söylemek',
      'dürfen': 'izin verilir',
      'weil': 'çünkü',
      'Meinungsfreiheit': 'düşünce özgürlüğü',
      'Religionsfreiheit': 'din özgürlüğü',
      'Wahlrecht': 'oy verme hakkı',
      'Steuern': 'vergi',
      'zahlen': 'ödemek',
      'gilt': 'geçerlidir',
      'haben': 'sahip olmak',
      'offen': 'açıkça',
      'gegen': 'karşı',
      'etwas': 'bir şey'
    }

    // German to French translations
    const frTranslations: { [key: string]: string } = {
      'Deutschland': 'Allemagne',
      'Menschen': 'gens',
      'Regierung': 'gouvernement',
      'sagen': 'dire',
      'dürfen': 'peuvent',
      'weil': 'parce que',
      'Meinungsfreiheit': 'liberté d\'opinion',
      'Religionsfreiheit': 'liberté religieuse',
      'Wahlrecht': 'droit de vote',
      'Steuern': 'impôts',
      'zahlen': 'payer',
      'gilt': 's\'applique',
      'haben': 'avoir',
      'offen': 'ouvertement',
      'gegen': 'contre',
      'etwas': 'quelque chose'
    }

    // German to Spanish translations
    const esTranslations: { [key: string]: string } = {
      'Deutschland': 'Alemania',
      'Menschen': 'gente',
      'Regierung': 'gobierno',
      'sagen': 'decir',
      'dürfen': 'pueden',
      'weil': 'porque',
      'Meinungsfreiheit': 'libertad de opinión',
      'Religionsfreiheit': 'libertad religiosa',
      'Wahlrecht': 'derecho al voto',
      'Steuern': 'impuestos',
      'zahlen': 'pagar',
      'gilt': 'se aplica',
      'haben': 'tener',
      'offen': 'abiertamente',
      'gegen': 'contra',
      'etwas': 'algo'
    }

    const translateText = (text: string, translations: { [key: string]: string }): string => {
      let translated = text
      Object.entries(translations).forEach(([de, target]) => {
        translated = translated.replace(new RegExp(de, 'gi'), target)
      })
      return translated
    }

    return {
      en: translateText(text, enTranslations),
      ru: translateText(text, ruTranslations),
      tr: translateText(text, trTranslations),
      fr: translateText(text, frTranslations),
      es: translateText(text, esTranslations)
    }
  }

  // Generate translations for question, options, and explanation
  const questionTranslations = generateTranslations(bundleQ.text)
  const optionTranslations = options.map(option => generateTranslations(option))
  const explanationTranslations = generateTranslations(explanation)

  return {
    id: appId,
    question: bundleQ.text,
    questionEn: questionTranslations.en,
    questionFr: questionTranslations.fr,
    questionEs: questionTranslations.es,
    questionTr: questionTranslations.tr,
    questionRu: questionTranslations.ru,
    options,
    optionsEn: optionTranslations.map(opt => opt.en),
    optionsFr: optionTranslations.map(opt => opt.fr),
    optionsEs: optionTranslations.map(opt => opt.es),
    optionsTr: optionTranslations.map(opt => opt.tr),
    optionsRu: optionTranslations.map(opt => opt.ru),
    correctAnswer,
    explanation,
    explanationEn: explanationTranslations.en,
    explanationFr: explanationTranslations.fr,
    explanationEs: explanationTranslations.es,
    explanationTr: explanationTranslations.tr,
    explanationRu: explanationTranslations.ru,
    category,
    difficulty,
    isPremium,
    state: bundleQ.state ? STATE_CODES[bundleQ.state] : undefined,
    isStateQuestion: !!bundleQ.state
  }
}

// Load and parse general questions (client-side compatible)
export async function loadGeneralQuestions(): Promise<AppQuestion[]> {
  try {
    const response = await fetch('/api/questions/general')
    if (!response.ok) {
      throw new Error('Failed to fetch general questions')
    }
    const bundleData: BundleQuestion[] = await response.json()
    
    return bundleData.map((bundleQ, index) => 
      convertBundleQuestion(bundleQ, index + 1)
    )
  } catch (error) {
    console.error('Error loading general questions:', error)
    return []
  }
}

// Load and parse state questions (client-side compatible)
export async function loadStateQuestions(stateCode: string): Promise<AppQuestion[]> {
  try {
    const response = await fetch(`/api/questions/states/${stateCode}`)
    if (!response.ok) {
      throw new Error(`Failed to fetch state questions for ${stateCode}`)
    }
    const bundleData: BundleQuestion[] = await response.json()
    
    return bundleData.map((bundleQ, index) => 
      convertBundleQuestion(bundleQ, 300 + index + 1)
    )
  } catch (error) {
    console.error(`Error loading state questions for ${stateCode}:`, error)
    return []
  }
}

// Load all questions (general + state)
export async function loadAllQuestions(selectedState?: string): Promise<AppQuestion[]> {
  const generalQuestions = await loadGeneralQuestions()
  
  if (selectedState) {
    const stateQuestions = await loadStateQuestions(selectedState)
    return [...generalQuestions, ...stateQuestions]
  }
  
  return generalQuestions
}

// Get available states
export function getAvailableStates(): Array<{code: string, name: string}> {
  return Object.entries(STATE_CODES).map(([code, name]) => ({ code, name }))
}
