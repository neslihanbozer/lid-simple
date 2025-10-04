'use client'

import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

// Translations
const translations = {
  en: {
    dashboard: 'Dashboard',
    welcome: 'Welcome',
    accountInfo: 'Account Information',
    subscription: 'Subscription Status',
    freeUser: 'Free User',
    premiumUser: 'Premium User',
    subscriptionType: 'Subscription Type',
    validUntil: 'Valid Until',
    daysRemaining: 'Days Remaining',
    startQuiz: 'Start Quiz',
    premiumFeatures: 'Premium Features',
    allQuestions: 'All Questions',
    progress: 'Progress Tracking',
    wrongAnswers: 'Wrong Answers',
    logout: 'Logout',
    home: 'Home',
    profile: 'Profile',
    settings: 'Settings'
  },
  de: {
    dashboard: 'Dashboard',
    welcome: 'Willkommen',
    accountInfo: 'Kontoinformationen',
    subscription: 'Abonnement-Status',
    freeUser: 'Kostenloser Benutzer',
    premiumUser: 'Premium-Benutzer',
    subscriptionType: 'Abonnement-Typ',
    validUntil: 'Gültig bis',
    daysRemaining: 'Verbleibende Tage',
    startQuiz: 'Quiz starten',
    premiumFeatures: 'Premium-Funktionen',
    allQuestions: 'Alle Fragen',
    progress: 'Fortschrittsverfolgung',
    wrongAnswers: 'Falsche Antworten',
    logout: 'Abmelden',
    home: 'Startseite',
    profile: 'Profil',
    settings: 'Einstellungen'
  }
}

interface User {
  id: string
  name: string
  email: string
  isPremium: boolean
  subscriptionEnd?: string
}

export default function Dashboard() {
  const { data: session, status } = useSession()
  const [language, setLanguage] = useState('en')
  const [user, setUser] = useState<User | null>(null)
  const [mounted, setMounted] = useState(false)

  const t = translations[language as keyof typeof translations]

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (session?.user) {
      // Use session data directly for now
      setUser({
        id: session.user.id || '1',
        name: session.user.name || 'User',
        email: session.user.email || 'user@example.com',
        isPremium: false, // Default to free user
        subscriptionEnd: '2024-12-31'
      })
    }
  }, [session])

  if (status === 'loading' || !mounted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            {t.dashboard}
          </h1>
          <p className="text-lg text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  // Debug info
  console.log('Session:', session)
  console.log('User:', user)

  if (!session) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Access Denied</h1>
          <p className="text-lg text-gray-600 mb-6">Please log in to access your dashboard.</p>
          <Link href="/auth/signin" className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold">
            {t.logout}
          </Link>
        </div>
      </div>
    )
  }

  const getDaysRemaining = () => {
    if (!user?.subscriptionEnd) return 0
    const endDate = new Date(user.subscriptionEnd)
    const today = new Date()
    const diffTime = endDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays > 0 ? diffDays : 0
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
                  onChange={(e) => setLanguage(e.target.value)}
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

              <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium">
                {t.home}
              </Link>
              <Link href="/api/auth/signout" className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium">
                {t.logout}
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {t.welcome}, {user?.name}!
          </h1>
          <p className="text-xl text-gray-600">
            {t.dashboard}
          </p>
        </div>

        {/* Debug Info */}
        {process.env.NODE_ENV === 'development' && (
          <div className="bg-yellow-100 border border-yellow-400 rounded-lg p-4 mb-6">
            <h4 className="font-bold text-yellow-800 mb-2">Debug Info:</h4>
            <p className="text-sm text-yellow-700">Session: {JSON.stringify(session, null, 2)}</p>
            <p className="text-sm text-yellow-700">User: {JSON.stringify(user, null, 2)}</p>
          </div>
        )}

        {/* Account Information */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Profile Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                <span className="text-blue-600 text-2xl">👤</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">{t.profile}</h3>
                <p className="text-gray-600">{user?.email || 'No email'}</p>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                <span className="font-medium">{t.accountInfo}:</span>
              </p>
              <p className="text-sm text-gray-800">Name: {user?.name || 'No name'}</p>
              <p className="text-sm text-gray-800">Email: {user?.email || 'No email'}</p>
              <p className="text-sm text-gray-800">ID: {user?.id || 'No ID'}</p>
            </div>
          </div>

          {/* Subscription Status */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mr-4">
                <span className="text-green-600 text-2xl">💎</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">{t.subscription}</h3>
                <p className={`text-sm font-medium ${user?.isPremium ? 'text-green-600' : 'text-gray-600'}`}>
                  {user?.isPremium ? t.premiumUser : t.freeUser}
                </p>
              </div>
            </div>
            {user?.isPremium ? (
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">{t.subscriptionType}:</span> Premium
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">{t.validUntil}:</span> {user.subscriptionEnd}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">{t.daysRemaining}:</span> {getDaysRemaining()}
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  You have access to 50 free questions.
                </p>
                <Link href="/pricing">
                  <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold transition-colors">
                    Upgrade to Premium
                  </button>
                </Link>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                <span className="text-purple-600 text-2xl">⚡</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Quick Actions</h3>
                <p className="text-gray-600">Start practicing</p>
              </div>
            </div>
            <div className="space-y-3">
              <Link href="/quiz">
                <button className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg font-semibold transition-colors">
                  {t.startQuiz}
                </button>
              </Link>
              <Link href="/all-questions">
                <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold transition-colors">
                  {t.allQuestions}
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link href="/quiz" className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-600 text-xl">📚</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{t.startQuiz}</h3>
              <p className="text-sm text-gray-600">Practice with questions</p>
            </div>
          </Link>

          {user?.isPremium && (
            <Link href="/premium-dashboard" className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-green-600 text-xl">⭐</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{t.premiumFeatures}</h3>
                <p className="text-sm text-gray-600">Premium dashboard</p>
              </div>
            </Link>
          )}

          <Link href="/progress" className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="text-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-yellow-600 text-xl">📊</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{t.progress}</h3>
              <p className="text-sm text-gray-600">Track your progress</p>
            </div>
          </Link>

          <Link href="/wrong-answers" className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-red-600 text-xl">❌</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{t.wrongAnswers}</h3>
              <p className="text-sm text-gray-600">Review mistakes</p>
            </div>
          </Link>
        </div>
      </main>
    </div>
  )
}
