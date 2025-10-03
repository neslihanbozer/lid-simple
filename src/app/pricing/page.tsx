'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

// Import translations
import enTranslations from '../../../locales/en/common.json'
import deTranslations from '../../../locales/de/common.json'

export default function Pricing() {
  const { data: session } = useSession()
  const [loading, setLoading] = useState(false)
  const [showCancelMessage, setShowCancelMessage] = useState(false)
  const [language, setLanguage] = useState('de')
  const [translations, setTranslations] = useState(deTranslations)
  const searchParams = useSearchParams()

  useEffect(() => {
    setTranslations(language === 'en' ? enTranslations : deTranslations)
  }, [language])

  useEffect(() => {
    if (searchParams.get('canceled') === 'true') {
      setShowCancelMessage(true)
      // 5 saniye sonra mesajı gizle
      setTimeout(() => setShowCancelMessage(false), 5000)
    }
  }, [searchParams])

          const handleSubscribe = async () => {
            if (!session) {
              window.location.href = '/auth/signin'
              return
            }
            try {
              const res = await fetch('/api/create-checkout-session', {
                method: 'POST'
              })
              if (!res.ok) throw new Error('Checkout başlatılamadı')
              const data = await res.json()
              if (data.url) {
                window.location.href = data.url
              }
            } catch (err) {
              console.error(err)
              // Fallback: local payment page
              window.location.href = '/payment'
            }
          }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header with Logo */}
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
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
              <span className="ml-3 text-xl font-bold text-gray-800">Leben in Deutschland Test</span>
            </div>
            
            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium">
                {language === 'en' ? 'Home' : 'Startseite'}
              </Link>
              <span className="text-blue-600 font-medium">
                {language === 'en' ? 'Pricing' : 'Preise'}
              </span>
            </nav>
            
            {/* Language Selector */}
            <div className="flex gap-1">
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  language === 'en' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('de')}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  language === 'de' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                DE
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
        {/* Cancel Message */}
        {showCancelMessage && (
          <div className="mb-6 bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded-lg">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {language === 'en' 
                ? 'Payment was cancelled. Would you like to try again?' 
                : 'Zahlung wurde storniert. Möchten Sie es erneut versuchen?'
              }
            </div>
          </div>
        )}

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            {language === 'en' ? 'Pricing' : 'Preise'}
          </h1>
          <p className="text-xl text-gray-600">
            {language === 'en' 
              ? 'Test your knowledge about life in Germany' 
              : 'Testen Sie Ihr Wissen über das Leben in Deutschland'
            }
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Free Plan */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                {language === 'en' ? 'Free' : 'Kostenlos'}
              </h2>
              <div className="text-4xl font-bold text-gray-800 mb-6">€0</div>
              <p className="text-gray-600 mb-8">
                {language === 'en' ? 'Limited access' : 'Begrenzter Zugang'}
              </p>
            </div>
            
            <ul className="space-y-4 mb-8">
              <li className="flex items-center">
                <span className="text-green-500 mr-3">✓</span>
                <span>
                  {language === 'en' ? 'Access to 50 questions' : 'Zugang zu 50 Fragen'}
                </span>
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-3">✓</span>
                <span>
                  {language === 'en' ? 'Basic categories' : 'Grundkategorien'}
                </span>
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-3">✓</span>
                <span>
                  {language === 'en' ? 'Instant access' : 'Sofortiger Zugang'}
                </span>
              </li>
              <li className="flex items-center text-gray-400">
                <span className="mr-3">✗</span>
                <span>
                  {language === 'en' ? 'No registration required' : 'Keine Registrierung erforderlich'}
                </span>
              </li>
            </ul>

            <button 
              className="w-full bg-gray-500 text-white font-bold py-3 px-6 rounded-lg cursor-not-allowed"
              disabled
            >
              {language === 'en' ? 'Current Plan' : 'Aktueller Plan'}
            </button>
          </div>

          {/* Premium Plan */}
          <div className="bg-white rounded-lg shadow-xl p-8 border-2 border-blue-500 relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                Önerilen
              </span>
            </div>
            
            {/* Study Image */}
            <div className="mb-6">
              <div className="w-full h-48 rounded-lg overflow-hidden shadow-lg">
                <img
                  src="/Study.jpg"
                  alt="Study and Learning"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback to gradient background if image fails to load
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement!.innerHTML = `
                      <div class="w-full h-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center">
                        <div class="text-center text-white">
                          <div class="text-6xl mb-4 drop-shadow-2xl">📚</div>
                          <div class="text-2xl font-bold mb-2 drop-shadow-lg">Study & Learn</div>
                          <div class="text-sm opacity-90 drop-shadow-md">Premium Learning Experience</div>
                        </div>
                      </div>
                    `;
                  }}
                />
              </div>
            </div>
            
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Premium</h2>
              <div className="text-4xl font-bold text-blue-600 mb-2">€5.99</div>
              <p className="text-gray-600 mb-8">
                {language === 'en' ? '3 months (one-time payment)' : '3 Monate (einmalige Zahlung)'}
              </p>
            </div>
            
            <ul className="space-y-4 mb-8">
              <li className="flex items-center">
                <span className="text-green-500 mr-3">✓</span>
                <span>
                  {language === 'en' ? 'Access to 300+ questions' : 'Zugang zu 300+ Fragen'}
                </span>
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-3">✓</span>
                <span>
                  {language === 'en' ? 'All categories' : 'Alle Kategorien'}
                </span>
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-3">✓</span>
                <span>
                  {language === 'en' ? 'AI topic explanations' : 'KI-Themenerklärungen'}
                </span>
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-3">✓</span>
                <span>
                  {language === 'en' ? 'Advanced analytics' : 'Erweiterte Analysen'}
                </span>
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-3">✓</span>
                <span>
                  {language === 'en' ? 'Multi-language support' : 'Mehrsprachige Unterstützung'}
                </span>
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-3">✓</span>
                <span>
                  {language === 'en' ? 'Progress tracking' : 'Fortschrittsverfolgung'}
                </span>
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-3">✓</span>
                <span>
                  {language === 'en' ? 'Difficulty levels' : 'Schwierigkeitsgrade'}
                </span>
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-3">✓</span>
                <span>
                  {language === 'en' ? 'Priority support' : 'Prioritätsunterstützung'}
                </span>
              </li>
            </ul>

            <button 
              onClick={handleSubscribe}
              disabled={loading}
              className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
              {loading 
                ? (language === 'en' ? 'Redirecting...' : 'Weiterleitung...') 
                : (language === 'en' ? 'Go Premium' : 'Premium werden')
              }
            </button>
          </div>
        </div>

        </div>
      </div>
    </div>
  )
}
