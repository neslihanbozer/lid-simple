'use client'
import React, { FormEvent } from 'react'
import Link from 'next/link'
import { useState } from 'react'

export default function ContactPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    const to = 'mail@ornek.site'
    const subj = subject || 'Kontaktanfrage'
    const body = `Name: ${name}\nE-Mail: ${email}\n\nNachricht:\n${message}`
    const mailto = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subj)}&body=${encodeURIComponent(body)}`
    setSent(true)
    window.location.href = mailto
  }
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="mb-4">
          <Link href="/" className="text-sm text-gray-600 hover:text-blue-600">← Zurück zur Startseite</Link>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-3">Kontaktieren Sie uns</h1>
          <p className="text-center text-gray-600 mb-8">
            Haben Sie Fragen, Feedback oder benötigen Sie Unterstützung? Füllen Sie einfach das untenstehende Formular aus.
          </p>
          <form onSubmit={onSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ihr Name</label>
              <input value={name} onChange={(e)=>setName(e.target.value)} type="text" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ihre E-Mail-Adresse</label>
              <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="beispiel@email.com" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Betreff</label>
              <select value={subject} onChange={(e)=>setSubject(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="">Bitte wählen Sie einen Betreff</option>
                <option value="Allgemeine Anfrage">Allgemeine Anfrage</option>
                <option value="Feedback">Feedback</option>
                <option value="Fehler melden">Fehler melden</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ihre Nachricht</label>
              <textarea value={message} onChange={(e)=>setMessage(e.target.value)} rows={6} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <button disabled={!email || !message} type="submit" className={`w-full font-semibold py-3 rounded-lg ${email && message ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-400 text-white cursor-not-allowed'}`}>Nachricht senden</button>
            {sent && (
              <div className="text-center text-sm text-green-600">Ihr E-Mail-Programm wurde geöffnet. Wenn nicht, kopieren Sie bitte die Adresse: mail@ornek.site</div>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}
