'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { questions } from '@/lib/questions'

// German translations
const germanTranslations = {
  quizTitle: 'Leben in Deutschland Quiz',
  freeQuiz: 'Kostenloses Quiz',
  freeQuizInfo: 'Sie lösen gerade 50 kostenlose Fragen. Für mehr Fragen werden Sie Premium!',
  question: 'Frage',
  of: 'von',
  free: '(Kostenlos)',
  next: 'Weiter',
  previous: 'Zurück',
  submit: 'Abgeben',
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
  goPremium: '💳 Premium werden - €5.99/Monat',
  backToHome: '← Zurück zur Startseite',
  loading: 'Lädt...'
}

interface Question {
  id: number
  question: string
  questionTr?: string
  options: string[]
  optionsTr?: string[]
  correctAnswer: number
  explanation: string
  explanationTr?: string
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

  useEffect(() => {
    if (session?.user?.isPremium) {
      setIsPremium(true)
    }
  }, [session])

  // 50 ücretsiz soru + premium sorular
  const freeQuestions = questions.slice(0, 50) // İlk 50 soru ücretsiz
  const premiumQuestions = questions.slice(50) // 50'den sonrası premium
  const availableQuestions = isPremium ? questions : freeQuestions

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
  }

  const handleSubmitAnswer = async () => {
    if (selectedAnswer === null) return

    const currentQ = availableQuestions[currentQuestion]
    const isCorrect = selectedAnswer === currentQ.correctAnswer

    if (isCorrect) {
      setScore(score + 1)
    } else {
      // Yanlış cevap kaydet (sadece giriş yapmış kullanıcılar için)
      if (session?.user?.id) {
        try {
          await fetch('/api/wrong-answers', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              questionId: currentQ.id,
              userAnswer: selectedAnswer,
              correctAnswer: currentQ.correctAnswer,
              explanation: currentQ.explanation,
              category: currentQ.category || 'General',
              difficulty: currentQ.difficulty || 'medium'
            })
          })
        } catch (error) {
          console.error('Error saving wrong answer:', error)
        }
      }
    }

    setShowResult(true)
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

  // Ücretsiz kullanıcılar için bilgilendirme
  const showFreeUserInfo = !isPremium && availableQuestions.length === 50

  if (quizCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">{germanTranslations.quizCompleted}</h1>
          <div className="text-6xl mb-4">🎉</div>
          <p className="text-xl text-gray-600 mb-4">
            {germanTranslations.yourScore} <span className="font-bold text-blue-600">{score}/{availableQuestions.length}</span>
          </p>
          <p className="text-gray-500 mb-6">
            {score === availableQuestions.length ? germanTranslations.perfect :
             score >= availableQuestions.length * 0.7 ? germanTranslations.good :
             germanTranslations.needPractice}
          </p>
          
          {/* Ücretsiz kullanıcılar için premium teşvik */}
          {showFreeUserInfo && (
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <h3 className="text-lg font-bold text-yellow-800 mb-2">{germanTranslations.congratulations}</h3>
              <p className="text-yellow-700 mb-3">
                {germanTranslations.freeQuizCompleted}
              </p>
              <div className="text-sm text-yellow-600">
                <p>{germanTranslations.premiumFeatures}</p>
                <p>{germanTranslations.premiumFeatures2}</p>
                <p>{germanTranslations.premiumFeatures3}</p>
                <p>{germanTranslations.premiumFeatures4}</p>
              </div>
            </div>
          )}
          
          <div className="space-y-3">
            <button
              onClick={resetQuiz}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
              {germanTranslations.tryAgain}
            </button>
            
            {showFreeUserInfo && (
              <Link href="/payment">
                <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-lg transition-colors">
                  {germanTranslations.goPremium}
                </button>
              </Link>
            )}
            
            <Link
              href="/"
              className="block w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
              {germanTranslations.backToHome}
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const currentQ = availableQuestions[currentQuestion]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header with Logo */}
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">★</span>
            </div>
            <span className="ml-3 text-xl font-bold text-gray-800">Leben in Deutschland Quiz</span>
          </div>
        </div>
      </header>

      <div className="flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-2xl w-full">

        {/* Ücretsiz kullanıcı bilgilendirmesi */}
        {showFreeUserInfo && (
          <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <span className="text-2xl mr-2">🎯</span>
              <h3 className="text-lg font-bold text-blue-800">{germanTranslations.freeQuiz}</h3>
            </div>
            <p className="text-blue-700 text-sm">
              {germanTranslations.freeQuizInfo}
            </p>
          </div>
        )}

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-gray-800">{germanTranslations.quizTitle}</h1>
            <span className="text-sm text-gray-500">
              {germanTranslations.question} {currentQuestion + 1} / {availableQuestions.length}
              {showFreeUserInfo && <span className="text-blue-600 ml-2">{germanTranslations.free}</span>}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / availableQuestions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Question */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            {isDeTr && currentQ.questionTr ? currentQ.questionTr : currentQ.question}
          </h2>
          
          {/* Çift dil gösterimi */}
          {isDeTr && currentQ.questionTr && (
            <div className="mb-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 italic">
                🇩🇪 {currentQ.question}
              </p>
            </div>
          )}

          <div className="space-y-3">
            {currentQ.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={showResult}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                  selectedAnswer === index
                    ? showResult
                      ? index === currentQ.correctAnswer
                        ? 'border-green-500 bg-green-50 text-green-800'
                        : 'border-red-500 bg-red-50 text-red-800'
                      : 'border-blue-500 bg-blue-50 text-blue-800'
                    : showResult && index === currentQ.correctAnswer
                    ? 'border-green-500 bg-green-50 text-green-800'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div>
                  {isDeTr && currentQ.optionsTr ? currentQ.optionsTr[index] : option}
                </div>
                {/* Çift dil gösterimi */}
                {isDeTr && currentQ.optionsTr && (
                  <div className="mt-1 text-sm text-gray-500 italic">
                    🇩🇪 {option}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Result */}
        {showResult && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">
              <strong>Açıklama:</strong> {isDeTr && currentQ.explanationTr ? currentQ.explanationTr : currentQ.explanation}
            </p>
            {/* Çift dil gösterimi */}
            {isDeTr && currentQ.explanationTr && (
              <p className="text-sm text-gray-500 italic">
                🇩🇪 {currentQ.explanation}
              </p>
            )}
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between">
          <Link
            href="/"
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition-colors"
          >
            {germanTranslations.backToHome}
          </Link>

          {!showResult ? (
            <button
              onClick={handleSubmitAnswer}
              disabled={selectedAnswer === null}
              className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded transition-colors"
            >
              Antwort senden
            </button>
          ) : (
            <button
              onClick={handleNextQuestion}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition-colors"
            >
              {currentQuestion < availableQuestions.length - 1 ? 'Nächste Frage' : 'Quiz beenden'}
            </button>
          )}
        </div>
        </div>
      </div>
    </div>
  )
}