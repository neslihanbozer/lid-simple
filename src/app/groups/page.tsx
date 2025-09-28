'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { getAllQuestionSets } from '@/lib/question-sets'

interface Group {
  id: string
  name: string
  description: string
  maxMembers: number
  _count: { members: number }
  members: Array<{ id: string; name: string }>
}

export default function GroupsPage() {
  const { data: session, status } = useSession()
  const [groups, setGroups] = useState<Group[]>([])
  const [loading, setLoading] = useState(true)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [newGroup, setNewGroup] = useState({ 
    name: '', 
    description: '', 
    maxMembers: 10,
    questionSetIds: [] as string[]
  })
  const [questionSets, setQuestionSets] = useState<any>({})

  useEffect(() => {
    if (status === 'loading') return
    
    if (!session) {
      redirect('/auth/signin')
      return
    }

    if (!session.user.isPremium) {
      redirect('/pricing')
      return
    }

    fetchGroups()
    setQuestionSets(getAllQuestionSets())
  }, [session, status])

  const fetchGroups = async () => {
    try {
      const response = await fetch('/api/groups')
      if (response.ok) {
        const data = await response.json()
        setGroups(data.groups)
      }
    } catch (error) {
      console.error('Error fetching groups:', error)
    } finally {
      setLoading(false)
    }
  }

  const createGroup = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/groups', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newGroup)
      })

      if (response.ok) {
        setNewGroup({ name: '', description: '', maxMembers: 10, questionSetIds: [] })
        setShowCreateForm(false)
        fetchGroups()
      }
    } catch (error) {
      console.error('Error creating group:', error)
    }
  }

  const handleQuestionSetToggle = (setId: string) => {
    setNewGroup(prev => ({
      ...prev,
      questionSetIds: prev.questionSetIds.includes(setId)
        ? prev.questionSetIds.filter(id => id !== setId)
        : [...prev.questionSetIds, setId]
    }))
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Gruplu Çalışma
              </h1>
              <p className="text-gray-600">
                Diğer öğrencilerle birlikte çalışın ve bilginizi paylaşın
              </p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setShowCreateForm(!showCreateForm)}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
              >
                Yeni Grup Oluştur
              </button>
              <Link 
                href="/dashboard"
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
              >
                Dashboard
              </Link>
            </div>
          </div>

          {/* Create Group Form */}
          {showCreateForm && (
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Yeni Grup Oluştur</h3>
              <form onSubmit={createGroup} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Grup Adı
                  </label>
                  <input
                    type="text"
                    value={newGroup.name}
                    onChange={(e) => setNewGroup({...newGroup, name: e.target.value})}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Örn: Almanca Tarih Grubu"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Açıklama
                  </label>
                  <textarea
                    value={newGroup.description}
                    onChange={(e) => setNewGroup({...newGroup, description: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                    placeholder="Grup hakkında açıklama..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Maksimum Üye Sayısı
                  </label>
                  <input
                    type="number"
                    value={newGroup.maxMembers}
                    onChange={(e) => setNewGroup({...newGroup, maxMembers: parseInt(e.target.value)})}
                    min="2"
                    max="50"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                  >
                    Grup Oluştur
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowCreateForm(false)}
                    className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                  >
                    İptal
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Groups List */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {groups.map((group) => (
              <div key={group.id} className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-blue-300 transition-colors">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{group.name}</h3>
                <p className="text-gray-600 mb-4">{group.description}</p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-gray-500">
                    {group._count.members}/{group.maxMembers} üye
                  </span>
                  <span className="text-sm text-blue-600 font-medium">
                    {group._count.members < group.maxMembers ? 'Katılabilir' : 'Dolu'}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex-1">
                    Gruba Katıl
                  </button>
                  <button className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">
                    Detay
                  </button>
                </div>
              </div>
            ))}
          </div>

          {groups.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">👥</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Henüz grup yok</h3>
              <p className="text-gray-600 mb-6">İlk grubu siz oluşturun!</p>
              <button
                onClick={() => setShowCreateForm(true)}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
              >
                Grup Oluştur
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
