'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { questions } from '@/lib/questions'

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [questions, setQuestions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setMounted(true)
    loadQuestions()
  }, [])

  const loadQuestions = async () => {
    try {
      const { questions: loadQuestionsFn } = await import('@/lib/questions')
      const loadedQuestions = await loadQuestionsFn()
      setQuestions(loadedQuestions)
      setLoading(false)
    } catch (error) {
      console.error('Error loading questions:', error)
      setLoading(false)
    }
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

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore(0)
    setQuizCompleted(false)
  }

  if (!mounted || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Loading...</h1>
          <p className="text-gray-600">Loading 300 questions from Leben in Deutschland test...</p>
        </div>
      </div>
    )
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">No Questions Available</h1>
          <p className="text-gray-600 mb-4">Could not load questions. Please try again.</p>
          <button 
            onClick={loadQuestions}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  if (quizCompleted) {
    const percentage = Math.round((score / questions.length) * 100)
    let message = ''
    if (percentage >= 90) {
      message = 'Perfect! You answered all questions correctly!'
    } else if (percentage >= 70) {
      message = 'Well done! You answered most questions correctly.'
    } else {
      message = 'You need more practice. Try again!'
    }

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div className="flex items-center">
                <img 
                  src="/logo/lid_logo.png" 
                  alt="Leben in Deutschland Test Logo" 
                  className="w-16 h-16 object-contain"
                />
                <span className="ml-3 text-xl font-bold text-gray-800">Leben in Deutschland Test</span>
              </div>
              <nav className="hidden md:flex items-center space-x-6">
                <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium">Home</Link>
              </nav>
            </div>
          </div>
        </header>

        {/* Results */}
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">🎉 Congratulations!</h1>
              <h2 className="text-2xl font-semibold text-gray-700 mb-6">Quiz Completed!</h2>
              <div className="text-6xl font-bold text-blue-600 mb-4">{percentage}%</div>
              <p className="text-xl text-gray-600 mb-4">Your Score: {score} / {questions.length}</p>
              <p className="text-lg text-gray-700 mb-8">{message}</p>
      </div>

            <div className="space-y-4">
              <button
                onClick={resetQuiz}
                className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors mr-4"
              >
                Try Again
              </button>
              <Link href="/">
                <button className="bg-gray-500 hover:bg-gray-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                  Back to Home
              </button>
            </Link>
            </div>
          </div>
        </main>
      </div>
    )
  }

  const question = questions[currentQuestion]
  const isCorrect = selectedAnswer === question.correctAnswer

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <img 
                src="/logo/lid_logo.png" 
                alt="Leben in Deutschland Test Logo" 
                className="w-16 h-16 object-contain"
              />
              <span className="ml-3 text-xl font-bold text-gray-800">Leben in Deutschland Test</span>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium">Home</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Quiz Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-gray-900">Question {currentQuestion + 1} of {questions.length}</h1>
            <span className="text-lg font-semibold text-blue-600">Score: {score}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Question */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">{question.question}</h2>
          
          <div className="space-y-4 mb-8">
            {question.options.map((option: string, index: number) => (
                <button
                  key={index}
                onClick={() => !showResult && handleAnswerSelect(index)}
                  disabled={showResult}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                  showResult
                    ? index === question.correctAnswer
                      ? 'border-green-500 bg-green-50 text-green-800'
                      : selectedAnswer === index
                      ? 'border-red-500 bg-red-50 text-red-800'
                      : 'border-gray-200 bg-gray-50'
                    : selectedAnswer === index
                    ? 'border-blue-500 bg-blue-50 text-blue-800'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                <span className="font-medium">{String.fromCharCode(65 + index)}) </span>
                {option}
                {showResult && index === question.correctAnswer && (
                  <span className="ml-2 text-green-600 font-semibold">✓ Correct</span>
                )}
                {showResult && selectedAnswer === index && index !== question.correctAnswer && (
                  <span className="ml-2 text-red-600 font-semibold">✗ Wrong</span>
                )}
                </button>
              ))}
          </div>

            {!showResult ? (
              <button
              onClick={handleSubmit}
                disabled={selectedAnswer === null}
              className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white py-3 rounded-lg font-semibold transition-colors"
              >
              Submit Answer
              </button>
            ) : (
            <div className="space-y-4">
              {question.explanation && (
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-2">Explanation:</h3>
                  <p className="text-blue-800">{question.explanation}</p>
                </div>
              )}
              <button
                onClick={handleNext}
                className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold transition-colors"
              >
                {currentQuestion < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
              </button>
            </div>
            )}
        </div>
      </main>
    </div>
  )
}