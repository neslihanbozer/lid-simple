'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

// Import translations
import enTranslations from '../../../locales/en/common.json'
import deTranslations from '../../../locales/de/common.json'

// Question categories data
const questionCategories = [
  { id: 1, name: 'Politics', icon: '🏛️', questions: 50, color: 'blue' },
  { id: 2, name: 'Law', icon: '⚖️', questions: 40, color: 'purple' },
  { id: 3, name: 'Culture', icon: '🎭', questions: 35, color: 'pink' },
  { id: 4, name: 'Economy', icon: '💰', questions: 30, color: 'green' },
  { id: 5, name: 'Education', icon: '📚', questions: 25, color: 'yellow' },
  { id: 6, name: 'Society', icon: '👥', questions: 45, color: 'indigo' },
  { id: 7, name: 'History', icon: '📜', questions: 40, color: 'red' },
  { id: 8, name: 'Integration', icon: '🤝', questions: 30, color: 'teal' }
]

// AI Topic Explanations
const aiTopics = [
  { name: 'German History', color: 'bg-red-100 text-red-800 border-red-200' },
  { name: 'German Politics', color: 'bg-blue-100 text-blue-800 border-blue-200' },
  { name: 'Integration', color: 'bg-green-100 text-green-800 border-green-200' },
  { name: 'Values', color: 'bg-purple-100 text-purple-800 border-purple-200' }
]

export default function PremiumDashboard() {
  const { data: session } = useSession()
  const [language, setLanguage] = useState('en')
  const [translations, setTranslations] = useState(enTranslations)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setTranslations(language === 'en' ? enTranslations : deTranslations)
  }, [language])

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
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
                <span className="ml-2 text-xl font-bold text-gray-800">logo</span>
              </div>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium">Home</Link>
              <Link href="/pricing" className="text-gray-700 hover:text-blue-600 font-medium">Premium Features</Link>
              <Link href="/dashboard" className="text-blue-600 font-medium">Dashboard</Link>
              <div className="flex space-x-4">
                <Link href="/auth/signin" className="text-gray-700 hover:text-blue-600 font-medium">Login</Link>
                <Link href="/auth/signup" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium">Sign up</Link>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 mb-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center mb-4">
                <h1 className="text-3xl font-bold mr-4">
                  {language === 'en' ? 'Premium Dashboard' : 'Premium-Dashboard'}
                </h1>
                <span className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-semibold">
                  PREMIUM
                </span>
              </div>
              <p className="text-xl opacity-90">
                {language === 'en' 
                  ? `Welcome Back, ${session?.user?.name || 'User'}! You now have access to over 300+ questions and all premium features.`
                  : `Willkommen zurück, ${session?.user?.name || 'Benutzer'}! Sie haben jetzt Zugang zu über 300+ Fragen und allen Premium-Funktionen.`
                }
              </p>
            </div>
            <div className="hidden lg:block">
              <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <span className="text-4xl">🎯</span>
              </div>
            </div>
          </div>
        </div>

        {/* Language Selection */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            {language === 'en' ? 'Language Selection' : 'Sprachauswahl'}
          </h2>
          <p className="text-gray-600 mb-6">
            {language === 'en' 
              ? 'Learn German with other language combinations'
              : 'Lernen Sie Deutsch mit anderen Sprachkombinationen'
            }
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { flag: '🇩🇪', name: 'German', default: true },
              { flag: '🇹🇷', name: 'German + Turkish' },
              { flag: '🇬🇧', name: 'German + English' },
              { flag: '🇫🇷', name: 'German + French' },
              { flag: '🇪🇸', name: 'German + Spanish' },
              { flag: '🇸🇦', name: 'German + Arabic' }
            ].map((lang, index) => (
              <button
                key={index}
                className={`p-4 rounded-xl border-2 transition-all hover:shadow-md ${
                  index === 0 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <div className="text-2xl mb-2">{lang.flag}</div>
                <div className="text-sm font-medium text-gray-700">{lang.name}</div>
                {lang.default && (
                  <div className="text-xs text-blue-600 font-semibold mt-1">Default</div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* State Selection */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            {language === 'en' ? 'State Selection' : 'Bundesland-Auswahl'}
          </h2>
          <select className="w-full md:w-64 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <option>{language === 'en' ? 'All States' : 'Alle Bundesländer'}</option>
            <option>Baden-Württemberg</option>
            <option>Bayern</option>
            <option>Berlin</option>
            <option>Brandenburg</option>
            <option>Bremen</option>
            <option>Hamburg</option>
            <option>Hessen</option>
            <option>Mecklenburg-Vorpommern</option>
            <option>Niedersachsen</option>
            <option>Nordrhein-Westfalen</option>
            <option>Rheinland-Pfalz</option>
            <option>Saarland</option>
            <option>Sachsen</option>
            <option>Sachsen-Anhalt</option>
            <option>Schleswig-Holstein</option>
            <option>Thüringen</option>
          </select>
        </div>

        {/* Question Categories */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              {language === 'en' ? 'Question Categories (300+ Questions)' : 'Fragenkategorien (300+ Fragen)'}
            </h2>
            <button className="text-blue-600 hover:text-blue-700 font-medium">
              {language === 'en' ? 'View All Questions' : 'Alle Fragen anzeigen'}
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {questionCategories.map((category) => (
              <div
                key={category.id}
                className={`bg-gradient-to-br from-${category.color}-50 to-${category.color}-100 rounded-xl p-6 hover:shadow-lg transition-all cursor-pointer group`}
              >
                <div className="text-3xl mb-3">{category.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{category.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{category.questions} questions</p>
                <button className="w-full bg-white hover:bg-gray-50 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors group-hover:shadow-md">
                  {language === 'en' ? 'Start Quiz' : 'Quiz starten'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* AI Topic Explanations */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            {language === 'en' ? 'AI Topic Explanations' : 'KI-Themen-Erklärungen'}
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                {language === 'en' ? 'Choose a topic to get detailed explanations' : 'Wählen Sie ein Thema für detaillierte Erklärungen'}
              </h3>
              <div className="space-y-3">
                {aiTopics.map((topic, index) => (
                  <button
                    key={index}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all hover:shadow-md ${topic.color}`}
                  >
                    <div className="font-medium">{topic.name}</div>
                    <div className="text-sm opacity-75 mt-1">
                      {language === 'en' ? 'Get AI-powered explanations' : 'KI-gestützte Erklärungen erhalten'}
                    </div>
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center mb-4">
                  <span className="text-4xl">📖</span>
                </div>
                <p className="text-gray-600">
                  {language === 'en' 
                    ? 'Choose a topic above to get a detailed further explanation!'
                    : 'Wählen Sie oben ein Thema für eine detaillierte weitere Erklärung!'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Tools */}
        <div className="grid md:grid-cols-3 gap-6">
          <Link href="/progress" className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all group">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900">
                {language === 'en' ? 'Progress Tracking' : 'Fortschrittsverfolgung'}
              </h3>
            </div>
            <p className="text-gray-600 mb-4">
              {language === 'en' 
                ? 'Monitor your learning progress and track improvements'
                : 'Überwachen Sie Ihren Lernfortschritt und verfolgen Sie Verbesserungen'
              }
            </p>
            <div className="text-blue-600 font-medium group-hover:text-blue-700">
              {language === 'en' ? 'View Progress →' : 'Fortschritt anzeigen →'}
            </div>
          </Link>

          <Link href="/groups" className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all group">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mr-4">
                <span className="text-2xl">👥</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900">
                {language === 'en' ? 'Group Study' : 'Gruppenstudium'}
              </h3>
            </div>
            <p className="text-gray-600 mb-4">
              {language === 'en' 
                ? 'Study together with friends and track group progress'
                : 'Studieren Sie mit Freunden und verfolgen Sie den Gruppenfortschritt'
              }
            </p>
            <div className="text-green-600 font-medium group-hover:text-green-700">
              {language === 'en' ? 'Join Groups →' : 'Gruppen beitreten →'}
            </div>
          </Link>

          <Link href="/wrong-answers" className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all group">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mr-4">
                <span className="text-2xl">❌</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900">
                {language === 'en' ? 'Wrong Answers Review' : 'Falsche Antworten überprüfen'}
              </h3>
            </div>
            <p className="text-gray-600 mb-4">
              {language === 'en' 
                ? 'Review and learn from your incorrect answers'
                : 'Überprüfen und lernen Sie aus Ihren falschen Antworten'
              }
            </p>
            <div className="text-red-600 font-medium group-hover:text-red-700">
              {language === 'en' ? 'Review Answers →' : 'Antworten überprüfen →'}
            </div>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
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