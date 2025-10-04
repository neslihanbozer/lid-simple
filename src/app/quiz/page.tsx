'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import Image from 'next/image'
import { questions } from '@/lib/questions'

// Translations
const translations = {
  en: {
    quizTitle: 'Leben in Deutschland Test',
    freeQuiz: 'Free Quiz',
    freeQuizInfo: 'You are solving 50 free questions. Go Premium for more questions!',
    question: 'Question',
    of: 'of',
    free: '(Free)',
    next: 'Next',
    previous: 'Previous',
    submit: 'Submit Answer',
    quizCompleted: 'Quiz Completed!',
    yourScore: 'Your Score:',
    perfect: 'Perfect! You answered all questions correctly!',
    good: 'Well done! You answered most questions correctly.',
    needPractice: 'You need more practice. Try again!',
    congratulations: '🎉 Congratulations!',
    freeQuizCompleted: 'You completed the 50 free questions! Go Premium for more questions.',
    premiumFeatures: '✅ 300+ Questions',
    premiumFeatures2: '✅ AI Explanations',
    premiumFeatures3: '✅ Progress Tracking',
    premiumFeatures4: '✅ Group Study',
    tryAgain: 'Try Again',
    goPremium: '💳 Go Premium - €5.99 (3 Months)',
    backToHome: '← Back to Home',
    loading: 'Loading...',
    explanation: 'Explanation:',
    nextQuestion: 'Next Question',
    finishQuiz: 'Finish Quiz',
    languageSelection: 'Language Selection',
    studyLanguage: 'Study Language',
    selectLanguage: 'Select your preferred language for explanations:',
    defaultExplanation: 'Default explanations are in German'
  },
  de: {
    quizTitle: 'Leben in Deutschland Test',
    freeQuiz: 'Kostenloses Quiz',
    freeQuizInfo: 'Sie lösen gerade 50 kostenlose Fragen. Für mehr Fragen werden Sie Premium!',
    question: 'Frage',
    of: 'von',
    free: '(Kostenlos)',
    next: 'Weiter',
    previous: 'Zurück',
    submit: 'Antwort senden',
    quizCompleted: 'Quiz abgeschlossen!',
    yourScore: 'Ihr Ergebnis:',
    perfect: 'Perfekt! Sie haben alle Fragen richtig beantwortet!',
    good: 'Gut gemacht! Sie haben die meisten Fragen richtig beantwortet.',
    needPractice: 'Sie müssen mehr üben. Versuchen Sie es erneut!',
    congratulations: '🎉 Herzlichen Glückwunsch!',
    freeQuizCompleted: 'Sie haben die 50 kostenlosen Fragen abgeschlossen! Werden Sie Premium für mehr Fragen.',
    premiumFeatures: '✅ 300+ Fragen',
    premiumFeatures2: '✅ KI-Erklärungen',
    premiumFeatures3: '✅ Fortschrittsverfolgung',
    premiumFeatures4: '✅ Gruppenarbeit',
    tryAgain: 'Erneut versuchen',
    goPremium: '💳 Premium werden - €5.99 (3 Monate)',
    backToHome: '← Zurück zur Startseite',
    loading: 'Lädt...',
    explanation: 'Erklärung:',
    nextQuestion: 'Nächste Frage',
    finishQuiz: 'Quiz beenden',
    languageSelection: 'Sprachauswahl',
    studyLanguage: 'Lernsprache',
    selectLanguage: 'Wählen Sie Ihre bevorzugte Sprache für Erklärungen:',
    defaultExplanation: 'Standard-Erklärungen sind auf Deutsch'
  }
}

interface Question {
  id: number
  question: string
  questionTr?: string
  questionEn?: string
  questionFr?: string
  questionEs?: string
  questionAr?: string
  options: string[]
  optionsTr?: string[]
  optionsEn?: string[]
  optionsFr?: string[]
  optionsEs?: string[]
  optionsAr?: string[]
  correctAnswer: number
  explanation: string
  explanationTr?: string
  explanationEn?: string
  explanationFr?: string
  explanationEs?: string
  explanationAr?: string
  category?: string
  difficulty?: string
  isPremium?: boolean
}

export default function QuizPage() {
  const { data: session, status } = useSession()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [isPremium, setIsPremium] = useState(false)
  const [language, setLanguage] = useState('de')
  const [studyLanguage, setStudyLanguage] = useState('de')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const t = translations[language as keyof typeof translations]

  useEffect(() => {
    if (session?.user?.isPremium) {
      setIsPremium(true)
    }
  }, [session])

  // Premium users see all questions, free users see first 50
  const availableQuestions = isPremium ? questions : questions.slice(0, 50)

  // Language options for study
  const studyLanguageOptions = [
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' }
  ]

  // Get question in study language
  const getQuestionInLanguage = (question: Question) => {
    switch (studyLanguage) {
      case 'en': return question.questionEn || question.question
      case 'fr': return question.questionFr || question.question
      case 'es': return question.questionEs || question.question
      case 'tr': return question.questionTr || question.question
      case 'ar': return question.questionAr || question.question
      default: return question.question
    }
  }

  // Get options in study language
  const getOptionsInLanguage = (question: Question) => {
    switch (studyLanguage) {
      case 'en': return question.optionsEn || question.options
      case 'fr': return question.optionsFr || question.options
      case 'es': return question.optionsEs || question.options
      case 'tr': return question.optionsTr || question.options
      case 'ar': return question.optionsAr || question.options
      default: return question.options
    }
  }

  // Get explanation in study language
  const getExplanationInLanguage = (question: Question) => {
    switch (studyLanguage) {
      case 'en': return question.explanationEn || question.explanation
      case 'fr': return question.explanationFr || question.explanation
      case 'es': return question.explanationEs || question.explanation
      case 'tr': return question.explanationTr || question.explanation
      case 'ar': return question.explanationAr || question.explanation
      default: return question.explanation
    }
  }

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return
    setSelectedAnswer(answerIndex)
  }

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return
    
    setShowResult(true)
    if (selectedAnswer === availableQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1)
    }
  }

  const handleNextQuestion = () => {
    if (currentQuestion < availableQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    } else {
      setQuizCompleted(true)
    }
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore(0)
    setQuizCompleted(false)
  }

  // Free user info
  const showFreeUserInfo = !isPremium && availableQuestions.length === 50

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-2xl w-full">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 bg-gray-200 rounded mb-8"></div>
            <div className="space-y-4">
              <div className="h-10 bg-gray-200 rounded"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (quizCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">{t.quizCompleted}</h1>
          <div className="text-6xl mb-4">🎉</div>
          <p className="text-xl text-gray-600 mb-4">
            {t.yourScore} <span className="font-bold text-blue-600">{score}/{availableQuestions.length}</span>
          </p>
          <p className="text-gray-500 mb-6">
            {score === availableQuestions.length ? t.perfect :
             score >= availableQuestions.length * 0.7 ? t.good :
             t.needPractice}
          </p>
          
          {/* Free user premium promotion */}
          {showFreeUserInfo && (
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <h3 className="text-lg font-bold text-yellow-800 mb-2">{t.congratulations}</h3>
              <p className="text-yellow-700 mb-3">
                {t.freeQuizCompleted}
              </p>
              <div className="text-sm text-yellow-600">
                <p>{t.premiumFeatures}</p>
                <p>{t.premiumFeatures2}</p>
                <p>{t.premiumFeatures3}</p>
                <p>{t.premiumFeatures4}</p>
              </div>
            </div>
          )}
          
          <div className="space-y-3">
            <button
              onClick={resetQuiz}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
              {t.tryAgain}
            </button>
            
            {showFreeUserInfo && (
              <Link href="/payment">
                <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-lg transition-colors">
                  {t.goPremium}
                </button>
              </Link>
            )}
            
            <Link
              href="/"
              className="block w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
              {t.backToHome}
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const currentQ = availableQuestions[currentQuestion]
  const questionInStudy = getQuestionInLanguage(currentQ)
  const optionsInStudy = getOptionsInLanguage(currentQ)
  const explanationInStudy = getExplanationInLanguage(currentQ)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header with Logo and Language Selector */}
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Image 
                src="/logo/lid_logo.png" 
                alt="Leben in Deutschland Test" 
                width={64}
                height={64}
                className="w-16 h-16 mr-3"
              />
              <span className="text-xl font-bold text-gray-800">Leben in Deutschland Test</span>
            </div>
            
            {/* Language Selector and Auth */}
            <div className="flex items-center space-x-4">
              <div className="flex space-x-2">
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                    language === 'en' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => setLanguage('de')}
                  className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                    language === 'de' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  DE
                </button>
              </div>
              
              {/* Auth Section */}
              {session ? (
                <div className="flex items-center space-x-4">
                  {/* User Profile Dropdown */}
                  <div className="relative group">
                    <button className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 font-medium">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">
                          {session.user.name ? session.user.name.charAt(0).toUpperCase() : 'U'}
                        </span>
                      </div>
                      <span>{session.user.name || 'User'}</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    
                    {/* Dropdown Menu */}
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      <div className="p-4">
                        {/* User Info */}
                        <div className="mb-4 pb-4 border-b border-gray-200">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                              <span className="text-white text-lg font-bold">
                                {session.user.name ? session.user.name.charAt(0).toUpperCase() : 'U'}
                              </span>
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900">{session.user.name || 'User'}</p>
                              <p className="text-sm text-gray-600">{session.user.email}</p>
                            </div>
                          </div>
                        </div>
                        
                        {/* Subscription Status */}
                        <div className="mb-4 pb-4 border-b border-gray-200">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Status</span>
                            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                              Free User
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            50 free questions available
                          </p>
                        </div>
                        
                        {/* Menu Items */}
                        <div className="space-y-2">
                          <Link href="/dashboard" className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 py-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <span>Profile</span>
                          </Link>
                          <Link href="/quiz" className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 py-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <span>Start Quiz</span>
                          </Link>
                          <Link href="/pricing" className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 py-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                            </svg>
                            <span>Upgrade to Premium</span>
                          </Link>
                          <div className="border-t border-gray-200 pt-2">
                            <Link href="/api/auth/signout" className="flex items-center space-x-3 text-red-600 hover:text-red-700 py-2">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                              </svg>
                              <span>Sign out</span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex space-x-4">
                  <Link href="/auth/signin" className="text-gray-700 hover:text-blue-600 font-medium">Login</Link>
                  <Link href="/auth/signup" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium">Sign up</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-4xl w-full">
          {/* Language Selection */}
          <div className="mb-6 bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-4">
            <h3 className="text-lg font-bold text-purple-800 mb-3">{t.languageSelection}</h3>
            <p className="text-sm text-purple-700 mb-3">{t.selectLanguage}</p>
            <div className="flex flex-wrap gap-2">
              {studyLanguageOptions.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setStudyLanguage(lang.code)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    studyLanguage === lang.code
                      ? 'bg-purple-500 text-white'
                      : 'bg-white text-purple-700 border border-purple-200 hover:bg-purple-50'
                  }`}
                >
                  <span>{lang.flag}</span>
                  <span>{lang.name}</span>
                </button>
              ))}
            </div>
            <p className="text-xs text-purple-600 mt-2">{t.defaultExplanation}</p>
          </div>

          {/* Free user info */}
          {showFreeUserInfo && (
            <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <span className="text-2xl mr-2">🎯</span>
                <h3 className="text-lg font-bold text-blue-800">{t.freeQuiz}</h3>
              </div>
              <p className="text-blue-700 text-sm">
                {t.freeQuizInfo}
              </p>
            </div>
          )}

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold text-gray-800">{t.quizTitle}</h1>
              <span className="text-sm text-gray-500">
                {t.question} {currentQuestion + 1} / {availableQuestions.length}
                {showFreeUserInfo && <span className="text-blue-600 ml-2">{t.free}</span>}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / availableQuestions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Question */}
          <div className="mb-6">
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg p-6 mb-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                {currentQ.question}
              </h2>
              
              {/* Show translation below if different language is selected */}
              {studyLanguage !== 'de' && questionInStudy !== currentQ.question && (
                <div className="border-t border-gray-200 pt-3">
                  <p className="text-sm text-gray-600 italic">
                    <strong>{studyLanguageOptions.find(lang => lang.code === studyLanguage)?.name}:</strong> {questionInStudy}
                  </p>
                </div>
              )}
            </div>

            <div className="grid gap-3">
              {currentQ.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showResult}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all hover:shadow-md ${
                    selectedAnswer === index
                      ? showResult
                        ? index === currentQ.correctAnswer
                          ? 'border-green-500 bg-green-50 text-green-800 shadow-lg'
                          : 'border-red-500 bg-red-50 text-red-800 shadow-lg'
                        : 'border-blue-500 bg-blue-50 text-blue-800 shadow-md'
                      : showResult && index === currentQ.correctAnswer
                      ? 'border-green-500 bg-green-50 text-green-800 shadow-lg'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center">
                    <span className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-bold mr-3">
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span>{option}</span>
                  </div>
                  
                  {/* Show translation below if different language is selected */}
                  {studyLanguage !== 'de' && optionsInStudy[index] !== option && (
                    <div className="mt-2 pt-2 border-t border-gray-100">
                      <p className="text-xs text-gray-500 italic">
                        <strong>{studyLanguageOptions.find(lang => lang.code === studyLanguage)?.name}:</strong> {optionsInStudy[index]}
                      </p>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Result */}
          {showResult && (
            <div className="mb-6 p-6 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg">
              <p className="text-sm text-gray-700 mb-2">
                <strong>{t.explanation}</strong>
              </p>
              <p className="text-gray-600 mb-3">
                {currentQ.explanation}
              </p>
              
              {/* Show translation below if different language is selected */}
              {studyLanguage !== 'de' && explanationInStudy !== currentQ.explanation && (
                <div className="border-t border-gray-200 pt-3">
                  <p className="text-xs text-gray-500 italic">
                    <strong>{studyLanguageOptions.find(lang => lang.code === studyLanguage)?.name}:</strong> {explanationInStudy}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <Link
              href="/"
              className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
              {t.backToHome}
            </Link>

            {!showResult ? (
              <button
                onClick={handleSubmitAnswer}
                disabled={selectedAnswer === null}
                className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg transition-colors"
              >
                {t.submit}
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
              >
                {currentQuestion < availableQuestions.length - 1 ? t.nextQuestion : t.finishQuiz}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}