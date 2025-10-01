'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

type TopicProgress = { id: string; name: string; percent: number }

export default function ProgressPage() {
  const [items, setItems] = useState<TopicProgress[]>([])

  useEffect(() => {
    // Mock data; can be replaced with API in the future
    setItems([
      { id: 'history', name: 'Tarih', percent: 65 },
      { id: 'politics', name: 'Politika', percent: 40 },
      { id: 'society', name: 'Toplum', percent: 55 },
      { id: 'integration', name: 'Entegrasyon', percent: 30 },
    ])
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-xl p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-extrabold text-gray-800">İlerleme</h1>
          <Link href="/" className="text-blue-600 hover:underline">Ana Sayfa</Link>
        </div>
        <div className="space-y-5">
          {items.map(item => (
            <div key={item.id}>
              <div className="flex justify-between mb-1">
                <span className="font-medium text-gray-700">{item.name}</span>
                <span className="text-sm text-gray-500">%{item.percent}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-blue-600 h-3 rounded-full" style={{ width: `${item.percent}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}


