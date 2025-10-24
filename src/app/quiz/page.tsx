'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Quiz() {
  const [mounted, setMounted] = useState(false)
  const [allQuestions, setAllQuestions] = useState<any[]>([])
  const [questions, setQuestions] = useState<any[]>([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showStartMenu, setShowStartMenu] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedState, setSelectedState] = useState('')

  useEffect(() => {
    setMounted(true)
  }, [])

  // Parse choices from text - FIXED VERSION
  const sanitizeChoiceGlobal = (s: string) => (s || '')
    .replace(/[☐□■◻▪–\-•|│¦]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

  function parseChoicesFromText(text: string) {
    const sanitizeChoice = (s: string) => (s || '').replace(/[☐□■◻▪–\-•|]/g, ' ').replace(/\s+/g, ' ').trim()
    console.log('🔍 FULL TEXT:', text);
    
    // Look for the pattern: question text + "|" separated choices
    const pipePattern = /\|/;
    if (text.includes('|')) {
      console.log('🎯 Found pipe separator');
      const parts = text.split('|');
      if (parts.length >= 4) {
        const choices = parts.slice(0, 4).map((part, index) => ({
          id: String.fromCharCode(65 + index),
          text: sanitizeChoice(part)
        }));
        console.log('✅ Pipe choices:', choices);
        return choices;
      }
    }
    
    // Look for bullet points
    const bulletChars = ['', '☐', '□', '■', '◻', '▪', '–', '-', '•'];
    for (const bullet of bulletChars) {
      if (text.includes(bullet)) {
        console.log('🎯 Found bullet:', bullet);
        const parts = text.split(bullet);
        if (parts.length >= 5) {
          const choices = parts.slice(1, 5).map((part, index) => ({
            id: String.fromCharCode(65 + index),
            text: sanitizeChoice(part)
          })).filter(choice => choice.text.length > 0);
          
          if (choices.length >= 4) {
            console.log('✅ Bullet choices:', choices);
            return choices;
          }
        }
      }
    }
    
    // Look for common German choice patterns
    const commonChoices = [
      'Waffenbesitz', 'Faustrecht', 'Meinungsfreiheit', 'Selbstjustiz',
      'hier Religionsfreiheit gilt', 'die Menschen Steuern zahlen', 
      'die Menschen das Wahlrecht haben', 'hier Meinungsfreiheit gilt',
      'Alle Einwohnerinnen/Einwohner und der Staat müssen sich an die Gesetze halten',
      'Der Staat muss sich nicht an die Gesetze halten',
      'Nur Deutsche müssen die Gesetze befolgen',
      'Die Gerichte machen die Gesetze'
    ];
    
    const foundChoices = [] as {id:string;text:string}[];
    for (const choice of commonChoices) {
      if (text.includes(choice) && foundChoices.length < 4) {
        foundChoices.push({
          id: String.fromCharCode(65 + foundChoices.length),
          text: sanitizeChoice(choice)
        });
      }
    }
    
    if (foundChoices.length >= 4) {
      console.log('✅ Common choices found:', foundChoices);
      return foundChoices;
    }
    
    // Final fallback: slice by positions of any bullet chars across the whole text
    const allBullets = ['','☐','□','■','◻','▪','–','-','•']
    const idxs: number[] = []
    for (let i = 0; i < text.length; i++) {
      if (allBullets.includes(text[i])) idxs.push(i)
    }
    if (idxs.length >= 4) {
      const chunks: string[] = []
      for (let i = 0; i < 4; i++) {
        const start = idxs[i] + 1
        const end = i + 1 < idxs.length ? idxs[i + 1] : text.length
        const seg = sanitizeChoice(text.slice(start, end))
        if (seg) chunks.push(seg)
      }
      if (chunks.length === 4) {
        return chunks.map((t, i) => ({ id: String.fromCharCode(65 + i), text: sanitizeChoice(t) }))
      }
    }

    // Sentence fallback: handle cases where bullets are consecutive and options follow as sentences (e.g., GEN014)
    const firstBulletIdx = (() => {
      const bullets = ['','☐','□','■','◻','▪','–','-','•']
      let idx = -1
      for (const b of bullets) {
        const i = text.indexOf(b)
        if (i >= 0) idx = idx === -1 ? i : Math.min(idx, i)
      }
      return idx
    })()
    if (firstBulletIdx >= 0) {
      const after = text.slice(firstBulletIdx)
      const noBullets = after.replace(/[☐□■◻▪–\-•]/g, ' ').replace(/\s+/g, ' ').trim()
      // Split into sentences by period. Keep non-empty fragments.
      const sentences = noBullets.split(/\s*\.(?:\s+|$)/).map(s => sanitizeChoice(s)).filter(Boolean)
      if (sentences.length >= 4) {
        return sentences.slice(0,4).map((s, i) => ({ id: String.fromCharCode(65 + i), text: s }))
      }
    }

    console.log('❌ NO CHOICES FOUND - creating dummy');
    return [
      { id: 'A', text: 'Option A' },
      { id: 'B', text: 'Option B' },
      { id: 'C', text: 'Option C' },
      { id: 'D', text: 'Option D' }
    ];
  }

  // Clean question text (remove choices) - FIXED VERSION
  function cleanQuestionText(text: string) {
    console.log('🧹 CLEANING FULL TEXT:', text);
    
    // Remove everything after "|" separator
    if (text.includes('|')) {
      const cleanText = text.split('|')[0].trim();
      console.log('✅ Cleaned with pipe:', cleanText);
      return cleanText;
    }
    
    // Remove bullet points and everything after them
    const bulletPatterns = ['', '☐', '□', '■', '◻', '▪', '–', '-', '•'];
    
    for (const bullet of bulletPatterns) {
      const bulletIndex = text.indexOf(bullet);
      if (bulletIndex > 0) {
        const cleanText = text.substring(0, bulletIndex).replace(/[☐□■◻▪–\-•]/g, ' ').replace(/\s+/g,' ').trim();
        console.log('✅ Cleaned with bullet:', cleanText);
        return cleanText;
      }
    }
    
    // Remove common choice patterns
    const choicePatterns = [
      'Waffenbesitz', 'Faustrecht', 'Meinungsfreiheit', 'Selbstjustiz',
      'hier Religionsfreiheit gilt', 'die Menschen Steuern zahlen',
      'die Menschen das Wahlrecht haben', 'hier Meinungsfreiheit gilt'
    ];
    
    let cleanText = text.replace(/[☐□■◻▪–\-•]/g, ' ');
    for (const pattern of choicePatterns) {
      const index = cleanText.indexOf(pattern);
      if (index > 0) {
        cleanText = cleanText.substring(0, index).trim();
        console.log('✅ Cleaned with pattern:', cleanText);
        return cleanText;
      }
    }
    
    console.log('⚠️ No cleaning pattern found, returning original');
    return text;
  }

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        setLoading(true)
        const [qRes, imgRes, ansRes, stateAnsRes] = await Promise.all([
          fetch('/data/questions_full.json'),
          fetch('/data/images_map.json').catch(() => new Response('{"images":[]}')),
          fetch('/lid/answers_1_300.json').catch(() => new Response('null')),
          fetch('/lid/state_answers.json').catch(() => new Response('null'))
        ])
        const data = await qRes.json()
        const imagesData = await imgRes.json()
        let compactKey: any = null
        try { compactKey = await ansRes.json() } catch { compactKey = null }
        let stateAnswers: Record<string,string> | null = null
        try { const tmp = await stateAnsRes.json(); stateAnswers = tmp && typeof tmp === 'object' ? tmp : null } catch { stateAnswers = null }
        const letterToIdx: Record<string, number> = { A:0, B:1, C:2, D:3 }
        
        // build images lookup
        const imgMap: Record<string,string> = {}
        if (imagesData?.images?.length) {
          for (const it of imagesData.images) {
            imgMap[`${it.id}:${it.slot}`] = it.path
          }
        }

        const imagesDataLookup = (id: string, slot: string) => imgMap[`${id}:${slot}`]
        const transformedQuestions = data.questions.map((q: any) => {
          const choices = q.choices.length > 0 ? q.choices : parseChoicesFromText(q.text);
          const cleanText = cleanQuestionText(q.text);
          // prefer image options if A-D images exist
          const optionSlots = ['A','B','C','D']
          const hasImgs = optionSlots.every(s => imagesDataLookup(q.id, s))
          const finalChoices = hasImgs
            ? optionSlots.map(s => ({ id: s, image: imagesDataLookup(q.id, s), text: '' }))
            : choices.map((c: any) => ({ ...c, text: sanitizeChoiceGlobal(c.text) }))
          // STEM image
          let stemImages: string[] = []
          if (Array.isArray(q.stem?.images) && q.stem.images.length) {
            stemImages = q.stem.images
          } else {
            const stemPath = imagesDataLookup(q.id, 'STEM')
            if (stemPath) stemImages = [stemPath]
          }
          // determine correct answer index
          let correctIndex = -1
          // Resolve correct answer with section-aware priority
          // General: prefer compact key, then q.answer
          if (q.section === 'general' && Array.isArray(compactKey) && typeof q.number === 'number') {
            const i = q.number - 1
            if (i >= 0 && i < compactKey.length) {
              const v = (compactKey[i] || '').toString().trim().toUpperCase()
              if (letterToIdx.hasOwnProperty(v)) correctIndex = letterToIdx[v]
              else if (!isNaN(Number(v))) { const n = Number(v); if (n>=0 && n<=3) correctIndex = n }
            }
          }
          if (correctIndex === -1 && q.section === 'general' && q.answer !== undefined && q.answer !== null) {
            const v = String(q.answer).trim().toUpperCase()
            if (letterToIdx.hasOwnProperty(v)) correctIndex = letterToIdx[v]
            else if (!isNaN(Number(v))) { const n = Number(v); if (n>=0 && n<=3) correctIndex = n }
          }
          // State/others: stateAnswers first, then q.answer
          if (correctIndex === -1 && q.section !== 'general' && stateAnswers && stateAnswers[q.id]) {
            const v = String(stateAnswers[q.id]).trim().toUpperCase()
            if (letterToIdx.hasOwnProperty(v)) correctIndex = letterToIdx[v]
            else if (!isNaN(Number(v))) { const n = Number(v); if (n>=0 && n<=3) correctIndex = n }
          }
          if (correctIndex === -1 && q.section !== 'general' && q.answer !== undefined && q.answer !== null) {
            const v = String(q.answer).trim().toUpperCase()
            if (letterToIdx.hasOwnProperty(v)) correctIndex = letterToIdx[v]
            else if (!isNaN(Number(v))) { const n = Number(v); if (n>=0 && n<=3) correctIndex = n }
          }
          // Final fallback for any leftover general without compact key
          if (correctIndex === -1 && Array.isArray(compactKey) && q.section === 'general' && typeof q.number === 'number') {
            const i = q.number - 1
            if (i >= 0 && i < compactKey.length) {
              const v = (compactKey[i] || '').toString().trim().toUpperCase()
              if (letterToIdx.hasOwnProperty(v)) correctIndex = letterToIdx[v]
              else if (!isNaN(Number(v))) {
                const n = Number(v); if (n>=0 && n<=3) correctIndex = n
              }
            }
          }

          return {
            id: q.id,
            text: cleanText,
            choices: finalChoices,
            correctAnswer: correctIndex,
            explanation: 'Explanation will be added later.',
            numberInCatalog: q.number,
            section: q.section,
            state: q.state,
            stemImages
          }
        })
        // Validation report (console only)
        try {
          const issues: any[] = []
          const bulletRe = /[☐□■◻▪–\-•|]/
          for (const q of transformedQuestions) {
            const rowIssues: string[] = []
            if (!q.choices || q.choices.length < 4) rowIssues.push('choices<4')
            if (q.choices && q.choices.some((c: any) => /^Option [ABCD]$/.test(String(c.text || '')))) rowIssues.push('dummy_options')
            if (bulletRe.test(String(q.text || ''))) rowIssues.push('residual_bullets_in_stem')
            if (q.section === 'general' && !(q.correctAnswer >= 0 && q.correctAnswer <= 3)) rowIssues.push('missing_answer')
            if (rowIssues.length) {
              issues.push({ id: q.id, nr: q.numberInCatalog, section: q.section, state: q.state || '', issues: rowIssues.join(';') })
            }
          }
          if (issues.length) {
            console.groupCollapsed(`⚠️ Quiz Validation: ${issues.length} problematic items`)
            console.table(issues)
            console.groupEnd()
          } else {
            console.info('✅ Quiz Validation: no blocking issues detected')
          }
        } catch {}
        // State answers template (console only)
        try {
          const stateIds = transformedQuestions.filter((q: any) => q.section === 'state').map((q: any) => q.id)
          const tmpl: Record<string, string> = {}
          for (const id of stateIds) tmpl[id] = ''
          console.groupCollapsed(`📄 State Answers Template (${stateIds.length} IDs)`)
          console.log(JSON.stringify(tmpl, null, 2))
          console.groupEnd()
        } catch {}
        
        setAllQuestions(transformedQuestions)
        setQuestions(transformedQuestions)
        setLoading(false)
      } catch (error) {
        console.error('Error loading questions:', error)
        setLoading(false)
      }
    }

    if (mounted) {
      loadQuestions()
    }
  }, [mounted])

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
  }

  const handleSubmit = () => {
    if (selectedAnswer === null) return
    
    const isCorrect = selectedAnswer === questions[currentQuestion].correctAnswer
    if (isCorrect) {
      setScore(score + 1)
    }
    setShowResult(true)
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    } else {
      setQuizCompleted(true)
    }
  }

  const handleRestart = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore(0)
    setQuizCompleted(false)
  }

  const handleStartQuiz = (category: string, state?: string) => {
    console.log('Starting quiz with category:', category, 'state:', state)
    console.log('All questions count:', allQuestions.length)
    
    setSelectedCategory(category)
    setSelectedState(state || '')
    
    let filteredQuestions = allQuestions
    
    if (category === 'general') {
      filteredQuestions = allQuestions.filter(q => q.section === 'general')
      console.log('General questions count:', filteredQuestions.length)
    } else if (category === 'state') {
      // all state questions from data
      const allStateQs = allQuestions.filter(q => q.section === 'state')
      const sampleN = (arr: any[], n: number) => {
        if (arr.length <= n) return arr
        const a = [...arr]
        for (let i = a.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1))
          ;[a[i], a[j]] = [a[j], a[i]]
        }
        return a.slice(0, n)
      }
      if (state) {
        const byState = allStateQs.filter(q => q.state === state)
        filteredQuestions = sampleN(byState, 10)
      } else {
        // no combined all-states mode
        return
      }
    }
    
    console.log('Final filtered questions count:', filteredQuestions.length)
    setQuestions(filteredQuestions)
    setShowStartMenu(false)
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore(0)
    setQuizCompleted(false)
  }

  const handleBackToMenu = () => {
    setShowStartMenu(true)
    setSelectedCategory('')
    setSelectedState('')
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore(0)
    setQuizCompleted(false)
  }

  if (!mounted) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Laden...</p>
      </div>
    </div>
  }

  if (loading) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Fragen werden geladen...</p>
      </div>
    </div>
  }

  if (quizCompleted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">🎉 Herzlichen Glückwunsch!</h1>
              <h2 className="text-2xl font-semibold text-gray-700 mb-6">Quiz abgeschlossen!</h2>
              <p className="text-xl text-gray-600 mb-4">Ihr Ergebnis: {score} / {questions.length}</p>
              <div className="space-x-4">
                <button 
                  onClick={handleRestart}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Erneut versuchen
                </button>
                <Link 
                  href="/"
                  className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors inline-block"
                >
                  Zurück zur Startseite
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (questions.length === 0 && !showStartMenu) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Keine Fragen verfügbar</h1>
        <p className="text-gray-600 mb-4">Fragen konnten nicht geladen werden. Bitte versuchen Sie es erneut.</p>
        <button 
          onClick={handleBackToMenu}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Zurück zur Auswahl
        </button>
      </div>
    </div>
  }

  // Start Menu
  if (showStartMenu) {
    const generalCount = allQuestions.filter(q => q.section === 'general').length
    const stateCount = allQuestions.filter(q => q.section === 'state').length
    const stateSet = new Set(allQuestions.filter(q => q.section === 'state').map(q => String(q.state)))
    stateSet.add('SN')
    stateSet.add('ST')
    const states = Array.from(stateSet).sort()

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center">
                <img 
                  src="/logo/lid_logo.png" 
                  alt="LiD Logo" 
                  className="h-12 w-12 mr-3"
                />
                <span className="ml-3 text-2xl font-bold text-gray-800">Leben in Deutschland Test</span>
              </div>
              <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium">
                Startseite
              </Link>
            </div>

            {/* Start Menu */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Quiz starten</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* General Questions */}
                <div className="border-2 border-gray-200 rounded-lg p-6 hover:border-blue-500 transition-colors">
                  <div className="text-center">
                    <div className="text-4xl mb-4">🇩🇪</div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Allgemeine Fragen</h3>
                    <p className="text-gray-600 mb-4">{generalCount} Fragen</p>
                    <button
                      onClick={() => handleStartQuiz('general')}
                      className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                    >
                      Allgemeine Fragen starten
                    </button>
                  </div>
                </div>

                {/* State Questions */}
                <div className="border-2 border-gray-200 rounded-lg p-6 hover:border-blue-500 transition-colors">
                  <div className="text-center">
                    <div className="text-4xl mb-4">🏛️</div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Bundeslandsfragen</h3>
                    <p className="text-gray-600 mb-4">{stateCount} Fragen</p>
                    
                    <div className="mb-4">
                      <select
                        value={selectedState}
                        onChange={(e) => setSelectedState(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
                      >
                        <option value="" disabled>Bundesland wählen…</option>
                        {states.map((state: string) => {
                          const stateCount = 10
                          const stateMap: Record<string, string> = {
                            'BE': 'Berlin', 'BY': 'Bayern', 'BB': 'Brandenburg', 'BW': 'Baden-Württemberg',
                            'HB': 'Bremen', 'HH': 'Hamburg', 'HE': 'Hessen', 'MV': 'Mecklenburg-Vorpommern',
                            'NI': 'Niedersachsen', 'NW': 'Nordrhein-Westfalen', 'RP': 'Rheinland-Pfalz',
                            'SL': 'Saarland', 'SN': 'Sachsen', 'ST': 'Sachsen-Anhalt',
                            'SH': 'Schleswig-Holstein', 'TH': 'Thüringen'
                          }
                          const stateName = stateMap[state] || state
                          return (
                            <option key={state} value={state}>
                              {stateName} ({stateCount} Fragen)
                            </option>
                          )
                        })}
                      </select>
                    </div>
                    
                    <button
                      onClick={() => handleStartQuiz('state', selectedState)}
                      disabled={!selectedState}
                      className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${selectedState ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-gray-300 text-gray-600 cursor-not-allowed'}`}
                    >
                      {selectedState ? `${states.find(s => s === selectedState) || selectedState} Fragen starten` : 'Bundeslandsfragen starten'}
                    </button>
                  </div>
                </div>
              </div>

              
            </div>
          </div>
        </div>
      </div>
    )
  }

  const question = questions[currentQuestion]
  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <img src="/logo/lid_logo.png" alt="LiD Logo" className="h-12 w-12 mr-3" />
              <span className="ml-3 text-xl font-bold text-gray-800">Leben in Deutschland Test</span>
            </div>
            <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium">Startseite</Link>
          </div>

          {/* Back to Menu Button */}
          <div className="mb-6">
            <button onClick={handleBackToMenu} className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">← Zurück zum Menü</button>
          </div>

          {/* Progress */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-lg font-semibold text-gray-800">Frage {currentQuestion + 1} von {questions.length}</span>
              <span className="text-lg font-semibold text-gray-800">Punktzahl: {score}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
            </div>
          </div>

          {/* Question */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{question.text}</h2>

            {/* Stem Images */}
            {question.stemImages && question.stemImages.length > 0 && (
              <div className="mb-6">
                {question.stemImages.map((src: string, idx: number) => (
                  <img key={idx} src={src} alt={`Frage Bild ${idx + 1}`} className="max-h-72 w-auto mx-auto mb-3 object-contain" />
                ))}
              </div>
            )}

            {/* Choices */}
            <div className="space-y-3 mb-6">
              {question.choices && question.choices.length > 0 ? (
                question.choices.map((choice: any, index: number) => (
                  <button
                    key={index}
                    onClick={() => !showResult && handleAnswerSelect(index)}
                    disabled={showResult}
                    className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                      showResult
                        ? index === question?.correctAnswer
                          ? 'border-green-500 bg-green-50 text-green-800'
                          : selectedAnswer === index
                          ? 'border-red-500 bg-red-50 text-red-800'
                          : 'border-gray-200 bg-gray-50'
                        : selectedAnswer === index
                        ? 'border-blue-500 bg-blue-50 text-blue-800'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center">
                      <span className="font-bold text-lg mr-3">{choice.id})</span>
                      {choice.image ? (
                        <img src={choice.image} alt={`Option ${choice.id}`} className="max-h-20 object-contain" />
                      ) : (
                        <span className="text-sm">{choice.text}</span>
                      )}
                    </div>
                    {showResult && index === question?.correctAnswer && (
                      <div className="text-green-600 text-sm mt-2 font-semibold">✓ Richtig</div>
                    )}
                    {showResult && selectedAnswer === index && index !== question?.correctAnswer && (
                      <div className="text-red-600 text-sm mt-2 font-semibold">✗ Falsch</div>
                    )}
                  </button>
                ))
              ) : (
                <div className="text-center text-gray-500 py-8">
                  <p>Optionen werden geladen...</p>
                  <p className="text-sm mt-2">Öffnen Sie die Konsole und prüfen Sie Debug-Informationen</p>
                </div>
              )}
            </div>

            {/* Submit / Next */}
            {!showResult ? (
              <button onClick={handleSubmit} disabled={selectedAnswer === null} className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors">
                Antwort abschicken
              </button>
            ) : (
              <button onClick={handleNext} className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                {currentQuestion < questions.length - 1 ? 'Nächste Frage' : 'Quiz beenden'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}