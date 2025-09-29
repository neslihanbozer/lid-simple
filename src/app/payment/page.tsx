'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function PaymentPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [userId, setUserId] = useState<string | null>(null)
  const [cardData, setCardData] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: ''
  })

  // Test kullanıcısı ID'sini al
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await fetch('/api/get-user-id?email=testuser2@example.com')
        if (response.ok) {
          const user = await response.json()
          setUserId(user.id)
        }
      } catch (error) {
        console.error('Error fetching user ID:', error)
      }
    }
    fetchUserId()
  }, [])

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Test kredi kartı verilerini kontrol et
      if (cardData.number === '4242424242424242' && 
          cardData.cvc === '123' && 
          cardData.expiry === '12/25') {
        
        // Başarılı ödeme simülasyonu
        if (!userId) {
          alert('Kullanıcı ID alınamadı. Lütfen sayfayı yenileyin.')
          setLoading(false)
          return
        }

        const response = await fetch('/api/payment/success', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId })
        })

        if (response.ok) {
          alert('Ödeme başarılı! Premium üyeliğiniz aktif edildi.')
          router.push('/premium-dashboard')
        } else {
          alert('Ödeme işlemi başarısız.')
        }
      } else {
        alert('Geçersiz kredi kartı bilgileri. Test kartı: 4242424242424242')
      }
    } catch (error) {
      alert('Ödeme işlemi sırasında bir hata oluştu.')
    } finally {
      setLoading(false)
    }
  }

  // Session kontrolü kaldırıldı - test için

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Premium Üyelik - €5.99/ay
          </h1>
          <p className="text-gray-600">
            Kredi kartı bilgilerinizi girin
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-xl p-8">
          <form onSubmit={handlePayment} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kart Üzerindeki İsim
              </label>
              <input
                type="text"
                value={cardData.name}
                onChange={(e) => setCardData({...cardData, name: e.target.value})}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ad Soyad"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kart Numarası
              </label>
              <input
                type="text"
                value={cardData.number}
                onChange={(e) => setCardData({...cardData, number: e.target.value})}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="4242424242424242"
                maxLength={16}
              />
              <p className="text-xs text-gray-500 mt-1">
                Test kartı: 4242424242424242
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Son Kullanma Tarihi
                </label>
                <input
                  type="text"
                  value={cardData.expiry}
                  onChange={(e) => setCardData({...cardData, expiry: e.target.value})}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="12/25"
                  maxLength={5}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CVC
                </label>
                <input
                  type="text"
                  value={cardData.cvc}
                  onChange={(e) => setCardData({...cardData, cvc: e.target.value})}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="123"
                  maxLength={3}
                />
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-800 mb-2">Test Kredi Kartı Bilgileri:</h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li><strong>Kart Numarası:</strong> 4242424242424242</li>
                <li><strong>Son Kullanma:</strong> 12/25</li>
                <li><strong>CVC:</strong> 123</li>
                <li><strong>İsim:</strong> Test User</li>
              </ul>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
              {loading ? 'İşleniyor...' : '€5.99 Öde ve Premium Ol'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link 
              href="/pricing"
              className="text-blue-500 hover:text-blue-600 font-medium"
            >
              ← Fiyatlandırmaya Dön
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
