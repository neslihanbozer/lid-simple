'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

export default function Pricing() {
  const { data: session } = useSession()
  const [loading, setLoading] = useState(false)

  const handleSubscribe = async () => {
    if (!session) {
      window.location.href = '/auth/signin'
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
      })
      const { url } = await response.json()
      window.location.href = url
    } catch (error) {
      console.error('Subscription error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Fiyatlandırma
          </h1>
          <p className="text-xl text-gray-600">
            Almanya'da yaşam hakkında bilginizi test edin
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Free Plan */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Ücretsiz</h2>
              <div className="text-4xl font-bold text-gray-800 mb-6">€0</div>
              <p className="text-gray-600 mb-8">Sınırlı erişim</p>
            </div>
            
            <ul className="space-y-4 mb-8">
              <li className="flex items-center">
                <span className="text-green-500 mr-3">✓</span>
                <span>50 soruya erişim</span>
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-3">✓</span>
                <span>Temel kategoriler</span>
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-3">✓</span>
                <span>Anında erişim</span>
              </li>
              <li className="flex items-center text-gray-400">
                <span className="mr-3">✗</span>
                <span>Kayıt gerektirmez</span>
              </li>
            </ul>

            <button 
              className="w-full bg-gray-500 text-white font-bold py-3 px-6 rounded-lg cursor-not-allowed"
              disabled
            >
              Mevcut Plan
            </button>
          </div>

          {/* Premium Plan */}
          <div className="bg-white rounded-lg shadow-xl p-8 border-2 border-blue-500 relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                Önerilen
              </span>
            </div>
            
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Premium</h2>
              <div className="text-4xl font-bold text-blue-600 mb-2">€9.99</div>
              <p className="text-gray-600 mb-8">aylık</p>
            </div>
            
            <ul className="space-y-4 mb-8">
              <li className="flex items-center">
                <span className="text-green-500 mr-3">✓</span>
                <span>300+ soruya erişim</span>
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-3">✓</span>
                <span>Tüm kategoriler</span>
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-3">✓</span>
                <span>AI ile konu anlatımı</span>
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-3">✓</span>
                <span>Gruplu çalışma</span>
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-3">✓</span>
                <span>Çoklu dil desteği</span>
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-3">✓</span>
                <span>İlerleme takibi</span>
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-3">✓</span>
                <span>Zorluk seviyeleri</span>
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-3">✓</span>
                <span>Öncelikli destek</span>
              </li>
            </ul>

            <button 
              onClick={handleSubscribe}
              disabled={loading}
              className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
              {loading ? 'Yönlendiriliyor...' : 'Premium\'a Geç'}
            </button>
          </div>
        </div>

        <div className="text-center mt-12">
          <Link 
            href="/"
            className="text-blue-500 hover:text-blue-600 font-medium"
          >
            ← Ana sayfaya dön
          </Link>
        </div>
      </div>
    </div>
  )
}
