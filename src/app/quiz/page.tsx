'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { questions } from '@/lib/questions'

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
  const [selectedLanguage, setSelectedLanguage] = useState('de')
  const [showLanguageSelector, setShowLanguageSelector] = useState(false)

  const languages = [
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'de-tr', name: 'Deutsch + Türkçe', flag: '🇩🇪🇹🇷' }
  ]

  useEffect(() => {
    if (session?.user?.isPremium) {
      setIsPremium(true)
    }
  }, [session])

  // Tüm sorular premium - sadece premium kullanıcılar erişebilir
  const availableQuestions = isPremium ? questions : []

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

  // Premium kontrolü
  if (!isPremium) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Premium Gerekli</h1>
          <p className="text-lg text-gray-600 mb-6">
            Bu quiz'e erişmek için Premium üyelik gereklidir.
          </p>
          <div className="space-y-3">
            <Link href="/payment">
              <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-lg transition-colors">
                💳 Premium'a Geç - €5.99/ay
              </button>
            </Link>
            <Link href="/premium-dashboard">
              <button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded text-sm transition-colors">
                🧪 Premium Özelliklerini Test Et
              </button>
            </Link>
            <Link href="/">
              <button className="w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition-colors">
                ← Ana Sayfaya Dön
              </button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (quizCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Quiz Tamamlandı!</h1>
          <div className="text-6xl mb-4">🎉</div>
          <p className="text-xl text-gray-600 mb-4">
            Skorunuz: <span className="font-bold text-blue-600">{score}/{availableQuestions.length}</span>
          </p>
          <p className="text-gray-500 mb-6">
            {score === availableQuestions.length ? "Mükemmel! Tüm soruları doğru cevapladınız!" :
             score >= availableQuestions.length * 0.7 ? "İyi iş! Çoğu soruyu doğru cevapladınız." :
             "Daha fazla çalışmanız gerekiyor. Tekrar deneyin!"}
          </p>
          <div className="space-y-3">
            <button
              onClick={resetQuiz}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
              Tekrar Dene
            </button>
            <Link
              href="/"
              className="block w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
              Ana Sayfaya Dön
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const currentQ = availableQuestions[currentQuestion]
  const isDeTr = selectedLanguage === 'de-tr'

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-2xl w-full">
        {/* Dil Seçici */}
        <div className="mb-6">
          <button
            onClick={() => setShowLanguageSelector(!showLanguageSelector)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-4"
          >
            🌍 Dil Seç: {languages.find(l => l.code === selectedLanguage)?.name}
          </button>
          
          {showLanguageSelector && (
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <h3 className="text-lg font-bold text-gray-800 mb-3">Dil Seçimi</h3>
              <div className="grid grid-cols-1 gap-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setSelectedLanguage(lang.code)
                      setShowLanguageSelector(false)
                    }}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      selectedLanguage === lang.code
                        ? 'border-blue-500 bg-blue-50 text-blue-800'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{lang.flag}</div>
                      <div className="font-medium">{lang.name}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-gray-800">Leben in Deutschland Quiz</h1>
            <span className="text-sm text-gray-500">
              Soru {currentQuestion + 1} / {availableQuestions.length}
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
            Ana Sayfa
          </Link>

          {!showResult ? (
            <button
              onClick={handleSubmitAnswer}
              disabled={selectedAnswer === null}
              className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded transition-colors"
            >
              Cevabı Gönder
            </button>
          ) : (
            <button
              onClick={handleNextQuestion}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition-colors"
            >
              {currentQuestion < availableQuestions.length - 1 ? 'Sonraki Soru' : 'Quiz Bitir'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}