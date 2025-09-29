'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface QuestionStatus {
  id: string
  questionId: number
  question: string
  userAnswer: number
  correctAnswer: number
  explanation: string
  category: string
  difficulty: string
  status: 'wrong' | 'reviewed' | 'mastered'
  createdAt: string
  reviewedAt?: string
  masteryLevel: number // 1-5 seviye
}

export default function QuestionStatusPage() {
  const [questions, setQuestions] = useState<QuestionStatus[]>([])
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [filterCategory, setFilterCategory] = useState<string>('all')
  const [filterDifficulty, setFilterDifficulty] = useState<string>('all')
  const [sessionTimeout, setSessionTimeout] = useState(30 * 60) // 30 dakika
  const [timeRemaining, setTimeRemaining] = useState(sessionTimeout)

  const categories = [
    { id: 'all', name: 'Tüm Kategoriler', icon: '📚' },
    { id: 'history', name: 'Tarih', icon: '📚' },
    { id: 'politics', name: 'Politika', icon: '🏛️' },
    { id: 'society', name: 'Toplum', icon: '👥' },
    { id: 'integration', name: 'Entegrasyon', icon: '🤝' },
    { id: 'law', name: 'Hukuk', icon: '⚖️' },
    { id: 'culture', name: 'Kültür', icon: '🎭' },
    { id: 'economy', name: 'Ekonomi', icon: '💰' },
    { id: 'education', name: 'Eğitim', icon: '🎓' }
  ]

  const difficulties = [
    { id: 'all', name: 'Tüm Seviyeler', color: 'gray' },
    { id: 'easy', name: 'Kolay', color: 'green' },
    { id: 'medium', name: 'Orta', color: 'yellow' },
    { id: 'hard', name: 'Zor', color: 'red' }
  ]

  const statuses = [
    { id: 'all', name: 'Tüm Durumlar', icon: '📋', color: 'gray' },
    { id: 'wrong', name: 'Yanlış', icon: '❌', color: 'red' },
    { id: 'reviewed', name: 'Gözden Geçirildi', icon: '👀', color: 'blue' },
    { id: 'mastered', name: 'Uzmanlaştı', icon: '✅', color: 'green' }
  ]

  // Session timeout timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 0) {
          // Session timeout - kullanıcıyı uyar
          alert('Oturum süreniz doldu! Sayfa yeniden yüklenecek.')
          window.location.reload()
          return sessionTimeout
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [sessionTimeout])

  // Örnek veri - gerçek uygulamada API'den gelecek
  useEffect(() => {
    const mockQuestions: QuestionStatus[] = [
      {
        id: '1',
        questionId: 1,
        question: "Welche Farbe hat die deutsche Flagge?",
        userAnswer: 0,
        correctAnswer: 1,
        explanation: "Die deutsche Flagge hat die Farben Schwarz, Rot und Gold (Gelb).",
        category: 'history',
        difficulty: 'easy',
        status: 'wrong',
        createdAt: '2024-01-15T10:30:00Z',
        masteryLevel: 1
      },
      {
        id: '2',
        questionId: 2,
        question: "Wie viele Bundesländer hat Deutschland?",
        userAnswer: 1,
        correctAnswer: 2,
        explanation: "Deutschland hat 16 Bundesländer.",
        category: 'history',
        difficulty: 'easy',
        status: 'reviewed',
        createdAt: '2024-01-15T10:35:00Z',
        reviewedAt: '2024-01-15T11:00:00Z',
        masteryLevel: 3
      },
      {
        id: '3',
        questionId: 3,
        question: "Wer ist das Staatsoberhaupt von Deutschland?",
        userAnswer: 2,
        correctAnswer: 1,
        explanation: "Der Bundespräsident ist das Staatsoberhaupt der Bundesrepublik Deutschland.",
        category: 'politics',
        difficulty: 'medium',
        status: 'mastered',
        createdAt: '2024-01-15T10:40:00Z',
        reviewedAt: '2024-01-15T12:00:00Z',
        masteryLevel: 5
      },
      {
        id: '4',
        questionId: 4,
        question: "Welche Währung wird in Deutschland verwendet?",
        userAnswer: 0,
        correctAnswer: 1,
        explanation: "In Deutschland wird der Euro als Währung verwendet.",
        category: 'economy',
        difficulty: 'easy',
        status: 'wrong',
        createdAt: '2024-01-15T10:45:00Z',
        masteryLevel: 1
      },
      {
        id: '5',
        questionId: 5,
        question: "Welche Sprache ist die Amtssprache in Deutschland?",
        userAnswer: 1,
        correctAnswer: 0,
        explanation: "Deutsch ist die Amtssprache in Deutschland.",
        category: 'society',
        difficulty: 'easy',
        status: 'reviewed',
        createdAt: '2024-01-15T10:50:00Z',
        reviewedAt: '2024-01-15T13:00:00Z',
        masteryLevel: 4
      }
    ]

    setQuestions(mockQuestions)
  }, [])

  const filteredQuestions = questions.filter(q => {
    if (filterStatus !== 'all' && q.status !== filterStatus) return false
    if (filterCategory !== 'all' && q.category !== filterCategory) return false
    if (filterDifficulty !== 'all' && q.difficulty !== filterDifficulty) return false
    return true
  })

  const updateQuestionStatus = (questionId: string, newStatus: 'wrong' | 'reviewed' | 'mastered') => {
    setQuestions(prev => prev.map(q => 
      q.id === questionId 
        ? { 
            ...q, 
            status: newStatus, 
            reviewedAt: newStatus !== 'wrong' ? new Date().toISOString() : undefined,
            masteryLevel: newStatus === 'mastered' ? 5 : Math.min(q.masteryLevel + 1, 5)
          }
        : q
    ))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'wrong': return 'bg-red-100 text-red-800 border-red-200'
      case 'reviewed': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'mastered': return 'bg-green-100 text-green-800 border-green-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'hard': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const getMasteryStars = (level: number) => {
    return '★'.repeat(level) + '☆'.repeat(5 - level)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-xl p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                📊 Soru Durum Takibi
              </h1>
              <p className="text-gray-600">
                Yanlış cevapladığınız soruları takip edin ve ilerlemenizi görün
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600 mb-1">Oturum Süresi:</div>
              <div className={`text-2xl font-bold ${timeRemaining < 300 ? 'text-red-600' : 'text-green-600'}`}>
                {formatTime(timeRemaining)}
              </div>
              {timeRemaining < 300 && (
                <div className="text-xs text-red-600 mt-1">
                  ⚠️ Oturum yakında sona erecek!
                </div>
              )}
            </div>
          </div>
        </div>

        {/* İstatistikler */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-red-600">
                  {questions.filter(q => q.status === 'wrong').length}
                </div>
                <div className="text-sm text-gray-600">Yanlış Cevaplar</div>
              </div>
              <div className="text-3xl">❌</div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-blue-600">
                  {questions.filter(q => q.status === 'reviewed').length}
                </div>
                <div className="text-sm text-gray-600">Gözden Geçirildi</div>
              </div>
              <div className="text-3xl">👀</div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {questions.filter(q => q.status === 'mastered').length}
                </div>
                <div className="text-sm text-gray-600">Uzmanlaştı</div>
              </div>
              <div className="text-3xl">✅</div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-purple-600">
                  {Math.round(questions.reduce((acc, q) => acc + q.masteryLevel, 0) / questions.length * 20)}%
                </div>
                <div className="text-sm text-gray-600">Ortalama Uzmanlık</div>
              </div>
              <div className="text-3xl">📈</div>
            </div>
          </div>
        </div>

        {/* Filtreler */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4">🔍 Filtreler</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Durum Filtresi */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Durum</label>
              <div className="space-y-2">
                {statuses.map(status => (
                  <button
                    key={status.id}
                    onClick={() => setFilterStatus(status.id)}
                    className={`w-full p-2 rounded-lg border-2 transition-all ${
                      filterStatus === status.id
                        ? 'border-blue-500 bg-blue-50 text-blue-800'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span>{status.icon}</span>
                      <span>{status.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Kategori Filtresi */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.icon} {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Zorluk Filtresi */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Zorluk</label>
              <select
                value={filterDifficulty}
                onChange={(e) => setFilterDifficulty(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {difficulties.map(difficulty => (
                  <option key={difficulty.id} value={difficulty.id}>
                    {difficulty.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Sorular Listesi */}
        <div className="space-y-4">
          {filteredQuestions.map((question) => (
            <div key={question.id} className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    #{question.questionId}
                  </span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(question.status)}`}>
                    {statuses.find(s => s.id === question.status)?.icon} {statuses.find(s => s.id === question.status)?.name}
                  </span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(question.difficulty)}`}>
                    {question.difficulty.toUpperCase()}
                  </span>
                  <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs">
                    {categories.find(c => c.id === question.category)?.name}
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600">Uzmanlık Seviyesi:</div>
                  <div className="text-lg font-bold text-yellow-600">
                    {getMasteryStars(question.masteryLevel)}
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Soru:</h3>
                <p className="text-gray-700">{question.question}</p>
              </div>

              <div className="mb-4">
                <h4 className="text-md font-semibold text-gray-700 mb-2">Cevaplar:</h4>
                <div className="grid gap-2">
                  <div className="p-3 rounded-lg border-2 border-red-200 bg-red-50">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-red-600">❌ Sizin Cevabınız:</span>
                      <span className="text-red-700">Seçenek {question.userAnswer + 1}</span>
                    </div>
                  </div>
                  <div className="p-3 rounded-lg border-2 border-green-200 bg-green-50">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-green-600">✅ Doğru Cevap:</span>
                      <span className="text-green-700">Seçenek {question.correctAnswer + 1}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-4 p-4 bg-blue-50 rounded-lg">
                <h4 className="text-md font-semibold text-blue-800 mb-2">Açıklama:</h4>
                <p className="text-blue-700">{question.explanation}</p>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  <div>Oluşturulma: {new Date(question.createdAt).toLocaleDateString('tr-TR')}</div>
                  {question.reviewedAt && (
                    <div>Gözden Geçirme: {new Date(question.reviewedAt).toLocaleDateString('tr-TR')}</div>
                  )}
                </div>

                <div className="flex gap-2">
                  {question.status !== 'mastered' && (
                    <button
                      onClick={() => updateQuestionStatus(question.id, 'reviewed')}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                    >
                      👀 Gözden Geçir
                    </button>
                  )}
                  {question.status !== 'mastered' && (
                    <button
                      onClick={() => updateQuestionStatus(question.id, 'mastered')}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
                    >
                      ✅ Uzmanlaştı
                    </button>
                  )}
                  {question.status === 'mastered' && (
                    <button
                      onClick={() => updateQuestionStatus(question.id, 'wrong')}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                    >
                      ❌ Tekrar Yanlış
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Özet */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">📊 Özet</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{filteredQuestions.length}</div>
              <div className="text-sm text-gray-600">Filtrelenmiş Soru</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                {filteredQuestions.filter(q => q.status === 'wrong').length}
              </div>
              <div className="text-sm text-gray-600">Yanlış</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {filteredQuestions.filter(q => q.status === 'reviewed').length}
              </div>
              <div className="text-sm text-gray-600">Gözden Geçirildi</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {filteredQuestions.filter(q => q.status === 'mastered').length}
              </div>
              <div className="text-sm text-gray-600">Uzmanlaştı</div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-8 text-center">
          <Link
            href="/premium-dashboard"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            ← Premium Dashboard'a Dön
          </Link>
        </div>
      </div>
    </div>
  )
}
