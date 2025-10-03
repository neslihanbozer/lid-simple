'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

export default function SignUp() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
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
      title: 'Sign Up',
      subtitle: 'Create a new account',
      name: 'Full Name',
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      signUpButton: 'Sign Up',
      signingUp: 'Creating account...',
      passwordMinLength: 'Password must be at least 8 characters',
      passwordSpecialChar: 'Password must contain at least one special character (!@#$%^&* etc.)',
      passwordsNotMatch: 'Passwords do not match',
      passwordRequirements: 'Password must be at least 8 characters and contain special characters (!@#$%^&* etc.)',
      hasAccount: 'Already have an account?',
      signIn: 'Sign in',
      backToHome: '← Back to home',
      successMessage: 'Registration successful! You can now sign in.',
      error: 'An error occurred',
      databaseError: 'Database connection error. Please try again later.',
      emailExists: 'This email address is already in use',
      registrationError: 'An error occurred during registration. Please try again.'
    },
    de: {
      title: 'Registrieren',
      subtitle: 'Neues Konto erstellen',
      name: 'Vollständiger Name',
      email: 'E-Mail',
      password: 'Passwort',
      confirmPassword: 'Passwort bestätigen',
      signUpButton: 'Registrieren',
      signingUp: 'Konto wird erstellt...',
      passwordMinLength: 'Passwort muss mindestens 8 Zeichen lang sein',
      passwordSpecialChar: 'Passwort muss mindestens ein Sonderzeichen enthalten (!@#$%^&* usw.)',
      passwordsNotMatch: 'Passwörter stimmen nicht überein',
      passwordRequirements: 'Passwort muss mindestens 8 Zeichen lang sein und Sonderzeichen enthalten (!@#$%^&* usw.)',
      hasAccount: 'Haben Sie bereits ein Konto?',
      signIn: 'Anmelden',
      backToHome: '← Zurück zur Startseite',
      successMessage: 'Registrierung erfolgreich! Sie können sich jetzt anmelden.',
      error: 'Ein Fehler ist aufgetreten',
      databaseError: 'Datenbankverbindungsfehler. Bitte versuchen Sie es später erneut.',
      emailExists: 'Diese E-Mail-Adresse wird bereits verwendet',
      registrationError: 'Bei der Registrierung ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.'
    }
  }

  const t = translations[language as keyof typeof translations]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Password validation
    if (password.length < 8) {
      setError(t.passwordMinLength)
      setLoading(false)
      return
    }

    // Special character check
    const specialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/
    if (!specialChars.test(password)) {
      setError(t.passwordSpecialChar)
      setLoading(false)
      return
    }

    if (password !== confirmPassword) {
      setError(t.passwordsNotMatch)
      setLoading(false)
      return
    }

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      })

      if (response.ok) {
        router.push(`/auth/signin?message=${encodeURIComponent(t.successMessage)}`)
      } else {
        const data = await response.json()
        setError(data.message || t.registrationError)
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
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              {t.name}
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={language === 'de' ? 'Ihr Vor- und Nachname' : 'Your full name'}
            />
          </div>

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
              minLength={8}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={language === 'de' ? 'Mindestens 8 Zeichen + Sonderzeichen' : 'At least 8 characters + special character'}
            />
            <p className="text-xs text-gray-500 mt-1">
              {t.passwordRequirements}
            </p>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
              {t.confirmPassword}
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
            {loading ? t.signingUp : t.signUpButton}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            {t.hasAccount}{' '}
            <Link href="/auth/signin" className="text-blue-500 hover:text-blue-600">
              {t.signIn}
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
