'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Quiz() {
  const [mounted, setMounted] = useState(false)
  const [showCategorySelector, setShowCategorySelector] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<'general' | 'state'>('general')
  const [selectedState, setSelectedState] = useState<string>('BE')
  const [questions, setQuestions] = useState<any[]>([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [loading, setLoading] = useState(false)

  const STATE_INFO = {
    'BE': { name: 'Berlin', code: 'BE' },
    'BW': { name: 'Baden-Württemberg', code: 'BW' },
    'BY': { name: 'Bayern', code: 'BY' },
    'BB': { name: 'Brandenburg', code: 'BB' },
    'HB': { name: 'Bremen', code: 'HB' },
    'HH': { name: 'Hamburg', code: 'HH' },
    'HE': { name: 'Hessen', code: 'HE' },
    'MV': { name: 'Mecklenburg-Vorpommern', code: 'MV' },
    'NI': { name: 'Niedersachsen', code: 'NI' },
    'NW': { name: 'Nordrhein-Westfalen', code: 'NW' },
    'RP': { name: 'Rheinland-Pfalz', code: 'RP' },
    'SL': { name: 'Saarland', code: 'SL' },
    'SN': { name: 'Sachsen', code: 'SN' },
    'ST': { name: 'Sachsen-Anhalt', code: 'ST' },
    'SH': { name: 'Schleswig-Holstein', code: 'SH' },
    'TH': { name: 'Thüringen', code: 'TH' }
  }

  useEffect(() => {
    setMounted(true)
    console.log('Quiz component mounted')
  }, [])

  const loadQuestions = async (category: 'general' | 'state', stateCode?: string) => {
    try {
      setLoading(true)
      console.log('Loading questions for:', category, stateCode)
      
      const response = await fetch('/data/questions_text.json')
      const data = await response.json()
      
      // Filter questions based on category
      let filteredQuestions = data.questions
      if (category === 'general') {
        filteredQuestions = data.questions.filter((q: any) => q.section === 'general')
      } else if (category === 'state' && stateCode) {
        filteredQuestions = data.questions.filter((q: any) => q.section === 'state' && q.state === stateCode)
      }
      
      console.log('Filtered questions:', filteredQuestions.length)
      
      // Transform questions with simple choices
      const transformedQuestions = filteredQuestions.map((q: any, index: number) => {
        // Simple choice extraction
        const text = q.text || ''
        const choices = []
        
        // Look for bullet points in text
        if (text.includes('☐')) {
          const parts = text.split('☐')
          if (parts.length > 1) {
            for (let i = 1; i < Math.min(parts.length, 5); i++) {
              const choiceText = parts[i].trim()
              if (choiceText.length > 0) {
                choices.push({
                  id: String.fromCharCode(64 + i),
                  text: choiceText
                })
              }
            }
          }
        }
        
        // If no choices found, use default
        if (choices.length === 0) {
          choices.push(
            { id: 'A', text: 'Option A' },
            { id: 'B', text: 'Option B' },
            { id: 'C', text: 'Option C' },
            { id: 'D', text: 'Option D' }
          )
        }
        
        return {
          id: q.id,
          text: text.replace(/☐[^☐]*/g, '').trim(), // Remove choice text from question
          choices: choices,
          correctAnswer: 0,
          explanation: 'Explanation will be added later.',
          numberInCatalog: q.number,
          section: q.section,
          state: q.state
        }
      })
      
      setQuestions(transformedQuestions)
      setLoading(false)
      setShowCategorySelector(false)
      console.log('Questions loaded:', transformedQuestions.length)
    } catch (error) {
      console.error('Error loading questions:', error)
      setLoading(false)
    }
  }

  const handleCategorySelect = (category: 'general' | 'state') => {
    setSelectedCategory(category)
    if (category === 'general') {
      loadQuestions('general')
    }
  }

  const handleStateSelect = (stateCode: string) => {
    setSelectedState(stateCode)
    loadQuestions('state', stateCode)
  }

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
    setShowCategorySelector(true)
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

  if (showCategorySelector) {
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
                <span className="ml-3 text-xl font-bold text-gray-800">Leben in Deutschland Test</span>
              </div>
              <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium">
                Startseite
              </Link>
            </div>

            {/* Category Selection */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                Quiz Kategorisi Seçin
              </h1>
              
              <div className="space-y-6">
                {/* General Questions */}
                <div className="border-2 border-gray-200 rounded-lg p-6 hover:border-blue-300 transition-colors">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Allgemeine Fragen</h2>
                  <p className="text-gray-600 mb-4">300 genel soru - Almanya hakkında temel bilgiler</p>
                  <button
                    onClick={() => handleCategorySelect('general')}
                    className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Allgemeine Fragen starten (300 Soru)
                  </button>
                </div>

                {/* State Questions */}
                <div className="border-2 border-gray-200 rounded-lg p-6 hover:border-blue-300 transition-colors">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Landesspezifische Fragen</h2>
                  <p className="text-gray-600 mb-4">Eyalet soruları - Belirli bir eyalet için özel sorular</p>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Eyalet seçin:
                    </label>
                    <select
                      value={selectedState}
                      onChange={(e) => setSelectedState(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      {Object.entries(STATE_INFO).map(([code, info]) => (
                        <option key={code} value={code}>
                          {info.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <button
                    onClick={() => handleStateSelect(selectedState)}
                    className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                  >
                    {STATE_INFO[selectedState as keyof typeof STATE_INFO]?.name} Fragen starten
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (questions.length === 0) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Keine Fragen verfügbar</h1>
        <p className="text-gray-600 mb-4">Fragen konnten nicht geladen werden. Bitte versuchen Sie es erneut.</p>
        <button 
          onClick={handleRestart}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Zurück zur Auswahl
        </button>
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
                <button 
                  onClick={() => setShowCategorySelector(true)}
                  className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Kategorie wechseln
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

  const question = questions[currentQuestion]
  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <img 
                src="/logo/lid_logo.png" 
                alt="LiD Logo" 
                className="h-12 w-12 mr-3"
              />
              <span className="ml-3 text-xl font-bold text-gray-800">
                {selectedCategory === 'general' ? 'Allgemeine Fragen' : `${STATE_INFO[selectedState as keyof typeof STATE_INFO]?.name} Fragen`}
              </span>
            </div>
            <div className="flex space-x-4">
              <button 
                onClick={() => setShowCategorySelector(true)}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Kategorie wechseln
              </button>
              <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium">
                Startseite
              </Link>
            </div>
          </div>

          {/* Progress */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-lg font-semibold text-gray-800">
                Frage {currentQuestion + 1} von {questions.length}
              </span>
              <span className="text-lg font-semibold text-gray-800">
                Punktzahl: {score}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Question */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {question.text}
            </h2>

            {/* Choices */}
            <div className="space-y-3 mb-6">
              {question.choices.map((choice: any, index: number) => (
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
                    <span className="text-sm">{choice.text}</span>
                  </div>
                  {showResult && index === question?.correctAnswer && (
                    <div className="text-green-600 text-sm mt-2 font-semibold">✓ Richtig</div>
                  )}
                  {showResult && selectedAnswer === index && index !== question?.correctAnswer && (
                    <div className="text-red-600 text-sm mt-2 font-semibold">✗ Falsch</div>
                  )}
                </button>
              ))}
            </div>

            {/* Submit Button */}
            {!showResult && (
              <button
                onClick={handleSubmit}
                disabled={selectedAnswer === null}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                Antwort abschicken
              </button>
            )}

            {/* Next Button */}
            {showResult && (
              <button
                onClick={handleNext}
                className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                {currentQuestion < questions.length - 1 ? 'Nächste Frage' : 'Quiz beenden'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}