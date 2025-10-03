'use client'

import { useState, useEffect } from 'react'
import { signIn, getSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [language, setLanguage] = useState('de')
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  const translations = {
    en: {
      title: 'Sign In',
      subtitle: 'Sign in to your account',
      email: 'Email',
      password: 'Password',
      signInButton: 'Sign In',
      signingIn: 'Signing in...',
      invalidCredentials: 'Invalid email or password',
      error: 'An error occurred',
      noAccount: "Don't have an account?",
      signUp: 'Sign up',
      backToHome: '← Back to home'
    },
    de: {
      title: 'Anmelden',
      subtitle: 'Melden Sie sich in Ihrem Konto an',
      email: 'E-Mail',
      password: 'Passwort',
      signInButton: 'Anmelden',
      signingIn: 'Wird angemeldet...',
      invalidCredentials: 'Ungültige E-Mail oder Passwort',
      error: 'Ein Fehler ist aufgetreten',
      noAccount: 'Haben Sie noch kein Konto?',
      signUp: 'Registrieren',
      backToHome: '← Zurück zur Startseite'
    }
  }

  const t = translations[language as keyof typeof translations]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError(t.invalidCredentials)
      } else {
        router.push('/')
      }
    } catch (error) {
      setError(t.error)
    } finally {
      setLoading(false)
    }
  }

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 bg-gray-200 rounded mb-8"></div>
            <div className="space-y-4">
              <div className="h-10 bg-gray-200 rounded"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
        {/* Header with logo and language selector */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <Image
              src="/logo/lid_logo.png"
              alt="Leben in Deutschland Test"
              width={56}
              height={56}
              className="w-14 h-14"
            />
            <div>
              <h1 className="text-xl font-bold text-gray-800">Leben in Deutschland Test</h1>
            </div>
          </div>
          <div className="flex space-x-2">
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

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{t.title}</h1>
          <p className="text-gray-600">{t.subtitle}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              {t.email}
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="example@email.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              {t.password}
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white font-bold py-2 px-4 rounded transition-colors"
          >
            {loading ? t.signingIn : t.signInButton}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            {t.noAccount}{' '}
            <Link href="/auth/signup" className="text-blue-500 hover:text-blue-600">
              {t.signUp}
            </Link>
          </p>
        </div>

        <div className="mt-4 text-center">
          <Link href="/" className="text-gray-500 hover:text-gray-600">
            {t.backToHome}
          </Link>
        </div>
      </div>
    </div>
  )
}
