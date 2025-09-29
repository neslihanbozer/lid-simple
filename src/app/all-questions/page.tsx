'use client'

import { useState, useEffect } from 'react'
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
  isPremium?: boolean
  category?: string
  difficulty?: string
}

export default function AllQuestionsPage() {
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(['de'])
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [showAnswers, setShowAnswers] = useState(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set())

  const languages = [
    { code: 'de', name: 'Deutsch', flag: '🇩🇪', isDefault: true },
    { code: 'de-tr', name: 'Deutsch + Türkçe', flag: '🇩🇪🇹🇷' },
    { code: 'de-en', name: 'Deutsch + English', flag: '🇩🇪🇺🇸' },
    { code: 'de-fr', name: 'Deutsch + Français', flag: '🇩🇪🇫🇷' },
    { code: 'de-es', name: 'Deutsch + Español', flag: '🇩🇪🇪🇸' },
    { code: 'de-ar', name: 'Deutsch + العربية', flag: '🇩🇪🇸🇦' }
  ]

  const categories = [
    { id: 'all', name: 'Tüm Kategoriler', icon: '📚' },
    { id: 'Geschichte', name: 'Tarih', icon: '📚' },
    { id: 'Politik', name: 'Politika', icon: '🏛️' },
    { id: 'Gesellschaft', name: 'Toplum', icon: '👥' },
    { id: 'Integration', name: 'Entegrasyon', icon: '🤝' }
  ]

  // Filtrelenmiş sorular
  const filteredQuestions = questions.filter(q => {
    if (selectedCategory !== 'all' && q.category !== selectedCategory) {
      return false
    }
    return true
  })

  const toggleLanguage = (langCode: string) => {
    setSelectedLanguages(prev => {
      if (prev.includes(langCode)) {
        // Eğer tek dil kaldıysa, varsayılan dili koru
        if (prev.length === 1) {
          return prev
        }
        return prev.filter(l => l !== langCode)
      } else {
        return [...prev, langCode]
      }
    })
  }

  const handleAnswerSelect = (answerIndex: number) => {
    if (!showResult) {
      setSelectedAnswer(answerIndex)
    }
  }

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return
    
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer
    if (isCorrect) {
      setScore(score + 1)
    }
    
    setAnsweredQuestions(prev => new Set([...prev, currentQuestion.id]))
    setShowResult(true)
  }

  const nextQuestion = () => {
    if (currentQuestionIndex < filteredQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    }
  }

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
      setSelectedAnswer(null)
      setShowResult(false)
    }
  }

  // Önceki sayfaya dön
  const goBack = () => {
    window.history.back()
  }

  const resetQuiz = () => {
    setCurrentQuestionIndex(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore(0)
    setAnsweredQuestions(new Set())
  }

  const currentQuestion = filteredQuestions[currentQuestionIndex]
  const isDeTr = selectedLanguages.includes('de-tr')

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Soru Bulunamadı</h1>
          <p className="text-gray-600 mb-6">Seçilen kriterlere uygun soru bulunamadı.</p>
          <Link href="/" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Tüm Sorular
          </h1>
          <p className="text-lg text-gray-600">
            Leben in Deutschland sınavına hazırlanın - 300+ soru
          </p>
        </div>

        {/* Dil Seçimi */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4">🌍 Dil Seçimi (Çoklu Seçim)</h3>
          <p className="text-sm text-gray-600 mb-4">
            Almanca + diğer dil kombinasyonları ile öğrenin
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => toggleLanguage(lang.code)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedLanguages.includes(lang.code)
                    ? 'border-blue-500 bg-blue-50 text-blue-800'
                    : 'border-gray-200 hover:border-gray-300'
                } ${lang.isDefault ? 'ring-2 ring-yellow-300' : ''}`}
              >
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{lang.flag}</div>
                  <div>
                    <div className="font-medium">{lang.name}</div>
                    {lang.isDefault && (
                      <div className="text-xs text-yellow-600 font-bold">⭐ Varsayılan</div>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Seçili diller: {selectedLanguages.map(lang => languages.find(l => l.code === lang)?.name).join(', ')}
          </p>
        </div>

        {/* Kategori Seçimi */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4">📚 Kategori Seçimi</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`p-3 rounded-lg border-2 transition-all ${
                  selectedCategory === category.id
                    ? 'border-blue-500 bg-blue-50 text-blue-800'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-2xl mb-1">{category.icon}</div>
                <div className="text-sm font-medium">{category.name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Soru Gösterimi */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Soru {currentQuestionIndex + 1} / {filteredQuestions.length}
            </h2>
            <div className="flex gap-2">
              <button
                onClick={() => setShowAnswers(!showAnswers)}
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
              >
                {showAnswers ? 'Cevapları Gizle' : 'Cevapları Göster'}
              </button>
            </div>
          </div>

          {/* Soru */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              {isDeTr && currentQuestion.questionTr ? currentQuestion.questionTr : currentQuestion.question}
            </h3>
            
            {/* Çift dil gösterimi */}
            {isDeTr && currentQuestion.questionTr && (
              <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 italic">
                  🇩🇪 {currentQuestion.question}
                </p>
              </div>
            )}

            {/* Seçenekler */}
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showResult}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                    selectedAnswer === index
                      ? showResult
                        ? index === currentQuestion.correctAnswer
                          ? 'border-green-500 bg-green-50 text-green-800'
                          : 'border-red-500 bg-red-50 text-red-800'
                        : 'border-blue-500 bg-blue-50 text-blue-800'
                      : showResult && index === currentQuestion.correctAnswer
                      ? 'border-green-500 bg-green-50 text-green-800'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-lg">{String.fromCharCode(65 + index)}.</span>
                    <div>
                      {isDeTr && currentQuestion.optionsTr ? currentQuestion.optionsTr[index] : option}
                    </div>
                  </div>
                  
                  {/* Çift dil gösterimi */}
                  {isDeTr && currentQuestion.optionsTr && (
                    <div className="mt-1 text-sm text-gray-500 italic ml-6">
                      🇩🇪 {option}
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Açıklama */}
          {showAnswers && (
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-bold text-blue-800 mb-2">Açıklama:</h4>
              <p className="text-blue-700">
                {isDeTr && currentQuestion.explanationTr ? currentQuestion.explanationTr : currentQuestion.explanation}
              </p>
              
              {/* Çift dil gösterimi */}
              {isDeTr && currentQuestion.explanationTr && (
                <p className="text-sm text-blue-600 italic mt-2">
                  🇩🇪 {currentQuestion.explanation}
                </p>
              )}
            </div>
          )}

          {/* Cevap Gönderme */}
          {!showResult && selectedAnswer !== null && (
            <div className="text-center mt-6">
              <button
                onClick={handleSubmitAnswer}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg"
              >
                ✅ Cevabı Gönder
              </button>
            </div>
          )}

          {/* Navigasyon */}
          <div className="flex justify-between mt-6">
            <button
              onClick={prevQuestion}
              disabled={currentQuestionIndex === 0}
              className="bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded"
            >
              ← Önceki
            </button>
            
            <div className="flex flex-col items-center gap-2">
              <span className="text-sm text-gray-500">
                {currentQuestionIndex + 1} / {filteredQuestions.length}
              </span>
              <span className="text-sm text-green-600 font-bold">
                Skor: {score} / {answeredQuestions.size}
              </span>
            </div>
            
            <button
              onClick={nextQuestion}
              disabled={currentQuestionIndex === filteredQuestions.length - 1}
              className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded"
            >
              Sonraki →
            </button>
          </div>

          {/* Quiz Sıfırlama */}
          <div className="text-center mt-4">
            <button
              onClick={resetQuiz}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
            >
              🔄 Quiz'i Sıfırla
            </button>
          </div>
        </div>

        {/* Alt Navigasyon */}
        <div className="text-center space-x-4">
          <button
            onClick={goBack}
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
          >
            ← Önceki Sayfa
          </button>
          <Link 
            href="/"
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
          >
            🏠 Ana Sayfa
          </Link>
          <Link 
            href="/quiz"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            🚀 Quiz Başlat
          </Link>
          <Link 
            href="/wrong-answers"
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
          >
            ❌ Yanlış Cevaplarım
          </Link>
        </div>
      </div>
    </div>
  )
}