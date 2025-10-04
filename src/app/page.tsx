'use client'

import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'

// Import translations
import enTranslations from '../../locales/en/common.json'
import deTranslations from '../../locales/de/common.json'

export default function Home() {
  const { data: session } = useSession()
  const [language, setLanguage] = useState('en')
  const [translations, setTranslations] = useState(enTranslations)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    console.log('Language changed to:', language)
    console.log('EN translations:', enTranslations)
    console.log('DE translations:', deTranslations)
    setTranslations(language === 'en' ? enTranslations : deTranslations)
  }, [language])

  const handleLanguageChange = (lang: string) => {
    console.log('Changing language to:', lang)
    setLanguage(lang)
  }

  // Hydration hatasını önlemek için mounted kontrolü
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Leben in Deutschland Test
          </h1>
          <p className="text-lg text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <img 
                src="/logo/lid_logo.png" 
                alt="Leben in Deutschland Test Logo" 
                className="w-16 h-16 object-contain"
                onError={(e) => {
                  // Fallback to star icon if logo fails to load
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement!.innerHTML = `
                    <div class="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
                      <span class="text-white text-xl font-bold">★</span>
                    </div>
                  `;
                }}
              />
              <span className="ml-3 text-xl font-bold text-gray-800">Leben in Deutschland Test</span>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              {/* Language Dropdown */}
              <div className="relative">
                <select
                  value={language}
                  onChange={(e) => handleLanguageChange(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-md px-3 py-2 pr-8 text-sm font-medium text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="en">EN</option>
                  <option value="de">DE</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

                  {session ? (
                <div className="flex items-center space-x-4">
                  <Link href="/dashboard" className="text-gray-700 hover:text-blue-600 font-medium">
                    {language === 'en' ? 'Dashboard' : 'Dashboard'}
                  </Link>
                  <Link href="/api/auth/signout" className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium">
                    {language === 'en' ? 'Sign out' : 'Abmelden'}
              </Link>
            </div>
              ) : (
                <div className="flex space-x-4">
                  <Link href="/auth/signin" className="text-gray-700 hover:text-blue-600 font-medium">{translations.login}</Link>
                  <Link href="/auth/signup" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium">{translations.signup}</Link>
                </div>
          )}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div className="space-y-6">
            <h1 className="text-5xl font-bold text-gray-900 leading-tight">
              Leben in Deutschland Test
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
              {language === 'en' 
                ? 'Prepare for the official integration test with 300+ practice questions in English and German.'
                : 'Bereiten Sie sich auf den offiziellen Integrationstest mit 300+ Übungsfragen auf Deutsch und Englisch vor.'
              }
            </p>
          </div>

          {/* Hero Image - Brandenburg Gate */}
          <div className="relative">
            <div className="w-full h-[500px] rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="/Brandenburger_Tor_abends.jpg"
                alt="Brandenburg Gate illuminated at night, Berlin"
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback to gradient background if image fails to load
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement!.innerHTML = `
                    <div class="w-full h-full bg-gradient-to-br from-amber-900 via-yellow-800 to-orange-900 flex items-center justify-center">
                      <div class="text-center text-white">
                        <div class="text-8xl mb-4 drop-shadow-2xl">🏛️</div>
                        <div class="text-4xl font-bold mb-2 drop-shadow-lg">Brandenburg Gate</div>
                        <div class="text-xl opacity-90 drop-shadow-md">Berlin, Germany</div>
                        <div class="text-sm opacity-75 mt-2 drop-shadow-md">Illuminated at night - Symbol of German Unity</div>
                      </div>
                    </div>
                  `;
                }}
              />
            </div>
          </div>
        </div>
                
        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Start Quiz Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {language === 'en' ? 'Start Quiz' : 'Quiz starten'}
            </h3>
            <p className="text-gray-600 mb-6">
              {language === 'en' 
                ? 'Premium membership required to access all quizzes.'
                : 'Premium-Mitgliedschaft erforderlich, um auf alle Quiz zuzugreifen.'
              }
            </p>
            <Link href="/quiz">
              <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                {language === 'en' ? 'Start Quiz' : 'Quiz starten'}
                      </button>
                    </Link>
                  </div>

          {/* Premium Features Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <div className="text-2xl">⭐</div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              {language === 'en' ? 'Premium Features' : 'Premium-Funktionen'}
            </h3>
            <div className="space-y-3 mb-6">
              <div className="flex items-center">
                <span className="text-green-500 mr-3">✓</span>
                <span className="text-sm text-gray-700">
                  {language === 'en' ? '300+ practice questions' : '300+ Übungsfragen'}
                </span>
              </div>
              <div className="flex items-center">
                <span className="text-green-500 mr-3">✓</span>
                <span className="text-sm text-gray-700">
                  {language === 'en' ? 'Multi-language support (EN/DE)' : 'Mehrsprachige Unterstützung (EN/DE)'}
                </span>
              </div>
              <div className="flex items-center">
                <span className="text-green-500 mr-3">✓</span>
                <span className="text-sm text-gray-700">
                  {language === 'en' ? 'Detailed explanations' : 'Detaillierte Erklärungen'}
                </span>
              </div>
              <div className="flex items-center">
                <span className="text-green-500 mr-3">✓</span>
                <span className="text-sm text-gray-700">
                  {language === 'en' ? 'Detailed progress tracking' : 'Detaillierte Fortschrittsverfolgung'}
                </span>
              </div>
              <div className="flex items-center">
                <span className="text-green-500 mr-3">✓</span>
                <span className="text-sm text-gray-700">
                  {language === 'en' ? 'Extensive Dashboard features' : 'Umfangreiche Dashboard-Funktionen'}
                </span>
              </div>
            </div>
            <div className="space-y-3">
              <Link href="/payment">
                <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-semibold transition-colors">
                  {language === 'en' ? 'Go Premium - €5.99 (3 Months)' : 'Premium werden - €5.99 (3 Monate)'}
                </button>
              </Link>
              <Link href="/premium-dashboard">
                <button className="w-full bg-white hover:bg-gray-50 text-blue-600 border-2 border-blue-600 py-2 rounded-lg font-semibold transition-colors">
                  {language === 'en' ? 'Test Premium Features' : 'Premium-Funktionen testen'}
                </button>
              </Link>
            </div>
      </div>
        </div>
      </main>

      </div>
  )
}
