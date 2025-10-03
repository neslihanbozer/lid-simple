'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

// Import translations
import enTranslations from '../../../locales/en/common.json'
import deTranslations from '../../../locales/de/common.json'


export default function PaymentPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [language, setLanguage] = useState('en')
  const [translations, setTranslations] = useState(enTranslations)
  const [cardData, setCardData] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: ''
  })

  useEffect(() => {
    setTranslations(language === 'en' ? enTranslations : deTranslations)
  }, [language])


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


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="flex items-center">
                <img 
                  src="/logo/lid_logo.png" 
                  alt="Leben in Deutschland Test Logo" 
                  className="w-28 h-28 object-contain"
                  onError={(e) => {
                    // Fallback to star icon if logo fails to load
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement!.innerHTML = `
                      <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <span class="text-white text-sm font-bold">★</span>
                      </div>
                    `;
                  }}
                />
                <span className="ml-2 text-xl font-bold text-gray-800">Leben in Deutschland Test</span>
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

        <div className="max-w-md mx-auto">
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
        </div>
      </main>

    </div>
  )
}
