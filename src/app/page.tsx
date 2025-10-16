'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Loading...</h1>
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
              />
              <span className="ml-3 text-xl font-bold text-gray-800">Leben in Deutschland Test</span>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <span className="text-gray-500">Welcome to Leben in Deutschland Test</span>
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
              Prepare for the official integration test with 300+ practice questions.
            </p>
          </div>

          {/* Hero Image - Brandenburg Gate */}
          <div className="relative">
            <div className="w-full h-[500px] rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="/Brandenburger_Tor_abends.jpg"
                alt="Brandenburg Gate illuminated at night, Berlin"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
                
        {/* Feature Cards */}
        <div className="grid md:grid-cols-1 gap-8 mb-16 max-w-2xl mx-auto">
          {/* Quiz Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Leben in Deutschland Quiz
            </h3>
            <p className="text-gray-600 mb-4">
              300 practice questions covering all topics for the official integration test.
            </p>
            <p className="text-sm text-green-600 font-semibold mb-6">
              ✓ Free for everyone
            </p>
            <Link href="/quiz">
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold transition-colors text-lg">
                Start Quiz
              </button>
            </Link>
      </div>
        </div>
      </main>

      </div>
  )
}
