'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

// Import translations
import enTranslations from '../../../locales/en/common.json'
import deTranslations from '../../../locales/de/common.json'

// Stripe test cards for different scenarios
const testCards = {
  success: {
    number: '4242424242424242',
    expiry: '12/25',
    cvc: '123',
    name: 'Test User'
  },
  decline: {
    number: '4000000000000002',
    expiry: '12/25',
    cvc: '123',
    name: 'Decline User'
  },
  insufficientFunds: {
    number: '4000000000009995',
    expiry: '12/25',
    cvc: '123',
    name: 'Insufficient User'
  },
  expired: {
    number: '4000000000000069',
    expiry: '12/20',
    cvc: '123',
    name: 'Expired User'
  }
}

export default function PaymentPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [language, setLanguage] = useState('en')
  const [translations, setTranslations] = useState(enTranslations)
  const [selectedTestCard, setSelectedTestCard] = useState('success')
  const [cardData, setCardData] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: ''
  })

  useEffect(() => {
    setTranslations(language === 'en' ? enTranslations : deTranslations)
  }, [language])

  useEffect(() => {
    // Auto-fill with selected test card
    const testCard = testCards[selectedTestCard as keyof typeof testCards]
    setCardData(testCard)
  }, [selectedTestCard])

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Use Stripe Checkout for real payment processing
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
      })

      if (response.ok) {
        const { url } = await response.json()
        window.location.href = url
      } else {
        const error = await response.json()
        alert(translations.paymentFailed)
      }
    } catch (error) {
      console.error('Payment error:', error)
      alert(translations.paymentError)
    } finally {
      setLoading(false)
    }
  }

  const handleTestCardSelect = (cardType: string) => {
    setSelectedTestCard(cardType)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">★</span>
                </div>
                <span className="ml-2 text-xl font-bold text-gray-800">Leben in Deutschland Quiz</span>
              </div>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium">Home</Link>
              <Link href="/pricing" className="text-gray-700 hover:text-blue-600 font-medium">Premium Features</Link>
              <div className="flex space-x-4">
                <Link href="/auth/signin" className="text-gray-700 hover:text-blue-600 font-medium">{translations.login}</Link>
                <Link href="/auth/signup" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium">{translations.signup}</Link>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Language Switcher */}
        <div className="flex justify-end mb-8">
          <div className="flex gap-2">
            <button
              onClick={() => setLanguage('en')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                language === 'en' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('de')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                language === 'de' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              DE
            </button>
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {translations.paymentTitle}
          </h1>
          <p className="text-lg text-gray-600">
            {translations.paymentSubtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Payment Form */}
          <div className="bg-white rounded-lg shadow-xl p-8">
            <form onSubmit={handlePayment} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {translations.cardName}
                </label>
                <input
                  type="text"
                  value={cardData.name}
                  onChange={(e) => setCardData({...cardData, name: e.target.value})}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={language === 'en' ? 'Full Name' : 'Vollständiger Name'}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {translations.cardNumber}
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
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {translations.expiryDate}
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
                    {translations.cvc}
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

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white font-bold py-3 px-6 rounded-lg transition-colors"
              >
                {loading ? translations.processing : translations.payButton}
              </button>
            </form>

            <div className="mt-6 text-center">
              <Link 
                href="/pricing"
                className="text-blue-500 hover:text-blue-600 font-medium"
              >
                {translations.backToPricing}
              </Link>
            </div>
          </div>

          {/* Test Cards Panel */}
          <div className="bg-white rounded-lg shadow-xl p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-6">
              {translations.testCards}
            </h3>
            
            <div className="space-y-4">
              {/* Success Card */}
              <div 
                className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                  selectedTestCard === 'success' 
                    ? 'border-green-500 bg-green-50' 
                    : 'border-gray-200 hover:border-green-300'
                }`}
                onClick={() => handleTestCardSelect('success')}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-green-800">
                      ✅ {translations.successCard}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {language === 'en' 
                        ? 'Payment will be successful' 
                        : 'Zahlung wird erfolgreich sein'
                      }
                    </p>
                  </div>
                  <div className="text-right text-sm text-gray-500">
                    <div>4242424242424242</div>
                    <div>12/25</div>
                  </div>
                </div>
              </div>

              {/* Decline Card */}
              <div 
                className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                  selectedTestCard === 'decline' 
                    ? 'border-red-500 bg-red-50' 
                    : 'border-gray-200 hover:border-red-300'
                }`}
                onClick={() => handleTestCardSelect('decline')}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-red-800">
                      ❌ {translations.declineCard}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {language === 'en' 
                        ? 'Payment will be declined' 
                        : 'Zahlung wird abgelehnt'
                      }
                    </p>
                  </div>
                  <div className="text-right text-sm text-gray-500">
                    <div>4000000000000002</div>
                    <div>12/25</div>
                  </div>
                </div>
              </div>

              {/* Insufficient Funds Card */}
              <div 
                className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                  selectedTestCard === 'insufficientFunds' 
                    ? 'border-yellow-500 bg-yellow-50' 
                    : 'border-gray-200 hover:border-yellow-300'
                }`}
                onClick={() => handleTestCardSelect('insufficientFunds')}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-yellow-800">
                      💰 {translations.insufficientFunds}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {language === 'en' 
                        ? 'Insufficient funds error' 
                        : 'Unzureichende Mittel Fehler'
                      }
                    </p>
                  </div>
                  <div className="text-right text-sm text-gray-500">
                    <div>4000000000009995</div>
                    <div>12/25</div>
                  </div>
                </div>
              </div>

              {/* Expired Card */}
              <div 
                className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                  selectedTestCard === 'expired' 
                    ? 'border-orange-500 bg-orange-50' 
                    : 'border-gray-200 hover:border-orange-300'
                }`}
                onClick={() => handleTestCardSelect('expired')}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-orange-800">
                      ⏰ {translations.expiredCard}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {language === 'en' 
                        ? 'Card expired error' 
                        : 'Karte abgelaufen Fehler'
                      }
                    </p>
                  </div>
                  <div className="text-right text-sm text-gray-500">
                    <div>4000000000000069</div>
                    <div>12/20</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">
                {translations.testCardInfo}
              </h4>
              <div className="text-sm text-blue-700 space-y-1">
                <div><strong>{translations.cardNumberLabel}</strong> {cardData.number}</div>
                <div><strong>{translations.expiryLabel}</strong> {cardData.expiry}</div>
                <div><strong>{translations.cvcLabel}</strong> {cardData.cvc}</div>
                <div><strong>{translations.nameLabel}</strong> {cardData.name}</div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-6 mb-4 md:mb-0">
              <Link href="/resources" className="text-gray-600 hover:text-blue-600">Resources</Link>
              <Link href="/legal" className="text-gray-600 hover:text-blue-600">Legal</Link>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-600">
                <span className="sr-only">Facebook</span>
                <div className="w-6 h-6 bg-gray-400 rounded"></div>
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-600">
                <span className="sr-only">Twitter</span>
                <div className="w-6 h-6 bg-gray-400 rounded"></div>
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-600">
                <span className="sr-only">Instagram</span>
                <div className="w-6 h-6 bg-gray-400 rounded"></div>
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-600">
                <span className="sr-only">LinkedIn</span>
                <div className="w-6 h-6 bg-gray-400 rounded"></div>
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-600">
                <span className="sr-only">Email</span>
                <div className="w-6 h-6 bg-gray-400 rounded"></div>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
