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
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
          <h1 className="text-4xl font-bold text-center">
            Leben in Deutschland Quiz
          </h1>
          <div className="flex gap-4">
            <div className="flex gap-2">
              <button className="px-3 py-1 rounded text-sm bg-blue-500 text-white">
                EN
              </button>
              <button className="px-3 py-1 rounded text-sm bg-gray-200 text-gray-700">
                DE
              </button>
            </div>
          </div>
        </div>
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Test your knowledge about life in Germany.
          </h2>
          <p className="text-lg text-gray-600 mb-2">
            Prepare for the exam with over 300 questions, including state-specific sets.
          </p>
          <p className="text-lg text-gray-600 mb-8">
            Supports multiple languages.
          </p>
        </div>
      </main>
    )
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
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium">Home</Link>
              <Link href="/pricing" className="text-gray-700 hover:text-blue-600 font-medium">Premium Features</Link>
              
              {/* Language Selector */}
              <div className="flex gap-2">
                <button
                  onClick={() => handleLanguageChange('en')}
                  className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                    language === 'en' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => handleLanguageChange('de')}
                  className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                    language === 'de' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  DE
                </button>
              </div>

              {session ? (
                <div className="flex items-center space-x-4">
                  <Link href="/dashboard" className="text-gray-700 hover:text-blue-600 font-medium">Dashboard</Link>
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
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Leben In Deutschland Test
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              {language === 'en' 
                ? 'Your comprehensive guide to living in Germany, preparing you for the official integration test.'
                : 'Ihr umfassender Leitfaden für das Leben in Deutschland, der Sie auf den offiziellen Integrationstest vorbereitet.'
              }
            </p>
            

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/quiz">
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors">
                  {translations.startQuiz}
                </button>
              </Link>
              <Link href="/pricing">
                <button className="bg-white hover:bg-gray-50 text-blue-600 border-2 border-blue-600 px-8 py-3 rounded-lg font-semibold text-lg transition-colors">
                  {translations.premiumFeatures}
                </button>
              </Link>
            </div>
          </div>
          
          {/* Hero Image - Brandenburg Gate */}
          <div className="relative">
            <div className="w-full h-96 rounded-2xl overflow-hidden shadow-2xl">
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
                  {language === 'en' ? 'Go Premium - €5.99/month' : 'Premium werden - €5.99/Monat'}
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
