'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import Link from 'next/link'

interface WrongAnswer {
  id: string
  questionId: string
  userAnswer: number
  correctAnswer: number
  explanation: string
  category: string
  difficulty: string
  createdAt: string
  reviewedAt?: string
  isReviewed: boolean
  question: {
    id: string
    question: string
    options: string
  }
}

export default function WrongAnswersPage() {
  const { data: session, status } = useSession()
  const [wrongAnswers, setWrongAnswers] = useState<WrongAnswer[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState({
    category: '',
    difficulty: '',
    reviewed: ''
  })

  useEffect(() => {
    if (status === 'loading') return
    
    if (!session) {
      redirect('/auth/signin')
      return
    }

    fetchWrongAnswers()
  }, [session, status, filter])

  const fetchWrongAnswers = async () => {
    try {
      const params = new URLSearchParams()
      if (filter.category) params.append('category', filter.category)
      if (filter.difficulty) params.append('difficulty', filter.difficulty)
      if (filter.reviewed) params.append('reviewed', filter.reviewed)

      const response = await fetch(`/api/wrong-answers?${params}`)
      if (response.ok) {
        const data = await response.json()
        setWrongAnswers(data.wrongAnswers)
      }
    } catch (error) {
      console.error('Error fetching wrong answers:', error)
    } finally {
      setLoading(false)
    }
  }

  const markAsReviewed = async (id: string) => {
    try {
      const response = await fetch(`/api/wrong-answers/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isReviewed: true })
      })

      if (response.ok) {
        setWrongAnswers(prev => 
          prev.map(answer => 
            answer.id === id 
              ? { ...answer, isReviewed: true, reviewedAt: new Date().toISOString() }
              : answer
          )
        )
      }
    } catch (error) {
      console.error('Error marking as reviewed:', error)
    }
  }

  const deleteWrongAnswer = async (id: string) => {
    try {
      const response = await fetch(`/api/wrong-answers/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        setWrongAnswers(prev => prev.filter(answer => answer.id !== id))
      }
    } catch (error) {
      console.error('Error deleting wrong answer:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p>Yükleniyor...</p>
        </div>
      </div>
    )
  }

  const categories = ['Geschichte', 'Politik', 'Gesellschaft', 'Integration', 'Bundesländer']
  const difficulties = ['easy', 'medium', 'hard']

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Yanlış Cevaplarım
              </h1>
              <p className="text-gray-600">
                Yanlış cevapladığınız soruları gözden geçirin ve tekrar çalışın
              </p>
            </div>
            <Link 
              href="/dashboard"
              className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
            >
              Dashboard
            </Link>
          </div>

          {/* Filtreler */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Filtreler</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kategori
                </label>
                <select
                  value={filter.category}
                  onChange={(e) => setFilter({...filter, category: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Tümü</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Zorluk
                </label>
                <select
                  value={filter.difficulty}
                  onChange={(e) => setFilter({...filter, difficulty: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Tümü</option>
                  {difficulties.map(diff => (
                    <option key={diff} value={diff}>{diff}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Durum
                </label>
                <select
                  value={filter.reviewed}
                  onChange={(e) => setFilter({...filter, reviewed: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Tümü</option>
                  <option value="false">Gözden geçirilmemiş</option>
                  <option value="true">Gözden geçirilmiş</option>
                </select>
              </div>
            </div>
          </div>

          {/* Yanlış Cevaplar Listesi */}
          <div className="space-y-6">
            {wrongAnswers.map((answer) => {
              const options = JSON.parse(answer.question.options)
              return (
                <div key={answer.id} className={`border-2 rounded-lg p-6 ${
                  answer.isReviewed ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                }`}>
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        {answer.question.question}
                      </h3>
                      <div className="flex gap-4 text-sm text-gray-600 mb-2">
                        <span className="bg-blue-100 px-2 py-1 rounded">{answer.category}</span>
                        <span className="bg-purple-100 px-2 py-1 rounded">{answer.difficulty}</span>
                        <span className="bg-gray-100 px-2 py-1 rounded">
                          {new Date(answer.createdAt).toLocaleDateString('tr-TR')}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {!answer.isReviewed && (
                        <button
                          onClick={() => markAsReviewed(answer.id)}
                          className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-3 rounded text-sm"
                        >
                          Gözden Geçirildi
                        </button>
                      )}
                      <button
                        onClick={() => deleteWrongAnswer(answer.id)}
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded text-sm"
                      >
                        Sil
                      </button>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-2">Seçenekler:</h4>
                      <div className="space-y-2">
                        {options.map((option: string, index: number) => (
                          <div
                            key={index}
                            className={`p-2 rounded ${
                              index === answer.correctAnswer
                                ? 'bg-green-100 text-green-800 border border-green-300'
                                : index === answer.userAnswer
                                ? 'bg-red-100 text-red-800 border border-red-300'
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {index + 1}. {option}
                            {index === answer.correctAnswer && ' ✓'}
                            {index === answer.userAnswer && index !== answer.correctAnswer && ' ✗'}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-700 mb-2">Açıklama:</h4>
                      <p className="text-gray-600 bg-white p-3 rounded border">
                        {answer.explanation}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {wrongAnswers.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Harika!</h3>
              <p className="text-gray-600 mb-6">Henüz yanlış cevapladığınız soru yok.</p>
              <Link 
                href="/quiz"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              >
                Quiz Çöz
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
