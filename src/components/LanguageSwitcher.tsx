'use client'

import { useEffect, useMemo, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

type LanguageCode = 'de' | 'de-tr' | 'de-en' | 'de-fr' | 'de-es' | 'de-ar'

const LANGUAGE_STORAGE_KEY = 'lid_language'

const languages: Array<{ code: LanguageCode; name: string; flag: string }> = [
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'de-tr', name: 'Deutsch + Türkçe', flag: '🇩🇪🇹🇷' },
  { code: 'de-en', name: 'Deutsch + English', flag: '🇩🇪🇺🇸' },
  { code: 'de-fr', name: 'Deutsch + Français', flag: '🇩🇪🇫🇷' },
  { code: 'de-es', name: 'Deutsch + Español', flag: '🇩🇪🇪🇸' },
  { code: 'de-ar', name: 'Deutsch + العربية', flag: '🇩🇪🇸🇦' }
]

export default function LanguageSwitcher() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const urlLanguage = searchParams.get('language') as LanguageCode | null
  const initialLanguage = useMemo<LanguageCode>(() => {
    if (urlLanguage && languages.some(l => l.code === urlLanguage)) {
      return urlLanguage
    }
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY) as LanguageCode | null
      if (stored && languages.some(l => l.code === stored)) return stored
    }
    return 'de'
  }, [urlLanguage])

  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<LanguageCode>(initialLanguage)

  // Keep URL param and localStorage in sync
  useEffect(() => {
    const params = new URLSearchParams(searchParams?.toString())
    if (params.get('language') !== selected) {
      params.set('language', selected)
      router.replace(`${pathname}?${params.toString()}`)
    }
    if (typeof window !== 'undefined') {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, selected)
    }
  }, [selected, pathname, router, searchParams])

  // If urlLanguage changes externally, reflect it in UI
  useEffect(() => {
    if (urlLanguage && urlLanguage !== selected) {
      setSelected(urlLanguage)
    }
  }, [urlLanguage])

  const current = languages.find(l => l.code === selected) ?? languages[0]

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 bg-white/80 hover:bg-white text-gray-800 border border-gray-200 shadow-sm px-3 py-2 rounded-md text-sm"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span>🌍 Dil Seçimi</span>
        <span className="ml-1">{current.flag}</span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none z-50">
          <ul role="listbox" className="py-1 max-h-64 overflow-auto">
            {languages.map(lang => (
              <li key={lang.code}>
                <button
                  className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-100 ${
                    selected === lang.code ? 'bg-gray-50 font-medium' : ''
                  }`}
                  onClick={() => {
                    setSelected(lang.code)
                    setOpen(false)
                  }}
                  role="option"
                  aria-selected={selected === lang.code}
                >
                  <span className="mr-2">{lang.flag}</span>
                  {lang.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}


