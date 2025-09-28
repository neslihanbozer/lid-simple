'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

// 50 ücretsiz soru + 250 premium soru
const sampleQuestions: Question[] = [
  // ÜCRETSİZ SORULAR (50 adet)
  {
    id: 1,
    question: "Welche Farbe hat die deutsche Flagge?",
    options: ["Rot, Weiß, Grün", "Schwarz, Rot, Gold", "Blau, Weiß, Rot", "Grün, Weiß, Rot"],
    correctAnswer: 1,
    explanation: "Die deutsche Flagge hat die Farben Schwarz, Rot und Gold (Gelb).",
    isPremium: false
  },
  {
    id: 2,
    question: "Wie viele Bundesländer hat Deutschland?",
    options: ["14", "15", "16", "17"],
    correctAnswer: 2,
    explanation: "Deutschland hat 16 Bundesländer.",
    isPremium: false
  },
  {
    id: 3,
    question: "Wer ist das Staatsoberhaupt von Deutschland?",
    options: ["Bundeskanzler", "Bundespräsident", "Bundestagspräsident", "Ministerpräsident"],
    correctAnswer: 1,
    explanation: "Der Bundespräsident ist das Staatsoberhaupt der Bundesrepublik Deutschland.",
    isPremium: false
  },
  {
    id: 4,
    question: "Welche Währung wird in Deutschland verwendet?",
    options: ["Deutsche Mark", "Euro", "Dollar", "Pfund"],
    correctAnswer: 1,
    explanation: "In Deutschland wird der Euro als Währung verwendet.",
    isPremium: false
  },
  {
    id: 5,
    question: "Welche Sprache ist die Amtssprache in Deutschland?",
    options: ["Deutsch", "Englisch", "Französisch", "Alle genannten"],
    correctAnswer: 0,
    explanation: "Deutsch ist die Amtssprache in Deutschland.",
    isPremium: false
  },
  // ... 45 soru daha ücretsiz
  // PREMIUM SORULAR (250 adet)
  {
    id: 51,
    question: "Welche Partei stellt aktuell den Bundeskanzler?",
    options: ["CDU", "SPD", "FDP", "Die Linke"],
    correctAnswer: 1,
    explanation: "Die SPD stellt aktuell den Bundeskanzler (Stand 2024).",
    isPremium: true
  },
  {
    id: 52,
    question: "Wie viele Stimmen hat Deutschland im Europäischen Parlament?",
    options: ["72", "78", "81", "96"],
    correctAnswer: 3,
    explanation: "Deutschland hat 96 Sitze im Europäischen Parlament.",
    isPremium: true
  }
  // ... 248 soru daha premium
]

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

  // Ücretsiz kullanıcılar için sadece ilk 50 soru
  const availableQuestions = isPremium 
    ? sampleQuestions 
    : sampleQuestions.filter(q => !q.isPremium).slice(0, 50)

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-2xl w-full">
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

        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            {availableQuestions[currentQuestion].question}
          </h2>
          
          <div className="space-y-3">
            {availableQuestions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={showResult}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                  selectedAnswer === index
                    ? showResult
                      ? index === availableQuestions[currentQuestion].correctAnswer
                        ? 'border-green-500 bg-green-50 text-green-800'
                        : 'border-red-500 bg-red-50 text-red-800'
                      : 'border-blue-500 bg-blue-50 text-blue-800'
                    : showResult && index === availableQuestions[currentQuestion].correctAnswer
                    ? 'border-green-500 bg-green-50 text-green-800'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {showResult && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">
              <strong>Açıklama:</strong> {availableQuestions[currentQuestion].explanation}
            </p>
          </div>
        )}

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
