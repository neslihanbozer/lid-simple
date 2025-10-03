'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

type TopicProgress = { id: string; name: string; nameEn: string; nameDe: string; percent: number }

export default function ProgressPage() {
  const [items, setItems] = useState<TopicProgress[]>([])
  const [language, setLanguage] = useState('en')

  useEffect(() => {
    // Mock data; can be replaced with API in the future
    setItems([
      { id: 'history', name: 'History', nameEn: 'History', nameDe: 'Geschichte', percent: 65 },
      { id: 'politics', name: 'Politics', nameEn: 'Politics', nameDe: 'Politik', percent: 40 },
      { id: 'society', name: 'Society', nameEn: 'Society', nameDe: 'Gesellschaft', percent: 55 },
      { id: 'integration', name: 'Integration', nameEn: 'Integration', nameDe: 'Integration', percent: 30 },
    ])
  }, [])

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
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium">
                {language === 'en' ? 'Home' : 'Startseite'}
              </Link>
              <Link href="/dashboard" className="text-blue-600 font-medium">
                {language === 'en' ? 'Dashboard' : 'Dashboard'}
              </Link>
              
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
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              {language === 'en' ? 'Progress Tracking' : 'Fortschrittsverfolgung'}
            </h1>
            <p className="text-lg text-gray-600">
              {language === 'en' 
                ? 'Track your learning progress across different topics'
                : 'Verfolgen Sie Ihren Lernfortschritt in verschiedenen Themen'
              }
            </p>
          </div>
        <div className="space-y-5">
          {items.map(item => (
            <div key={item.id}>
              <div className="flex justify-between mb-1">
                <span className="font-medium text-gray-700">
                  {language === 'en' ? item.nameEn : item.nameDe}
                </span>
                <span className="text-sm text-gray-500">%{item.percent}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-blue-600 h-3 rounded-full" style={{ width: `${item.percent}%` }} />
              </div>
            </div>
          ))}
        </div>
        </div>
      </main>
    </div>
  )
}


