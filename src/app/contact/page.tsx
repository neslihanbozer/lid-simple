'use client';

import { useState } from 'react';
import Link from 'next/link';
import AdsenseSafe from '@/components/AdsenseSafe';
import emailjs from '@emailjs/browser';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setError(null);

    // Basic validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setError('Bitte füllen Sie alle Felder aus.');
      setLoading(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Bitte geben Sie eine gültige E-Mail-Adresse ein.');
      setLoading(false);
      return;
    }

    try {
      // Netlify Forms submission
      const formDataToSend = new URLSearchParams();
      formDataToSend.append('form-name', 'contact');
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('subject', formData.subject);
      formDataToSend.append('message', formData.message);

      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formDataToSend.toString()
      });

      if (response.ok) {
        setSuccess('Ihre Nachricht wurde erfolgreich gesendet! Wir werden uns in Kürze bei Ihnen melden.');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setError('Beim Senden Ihrer Nachricht ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.');
      }
    } catch (error) {
      console.error('Form Error:', error);
      setError('Beim Senden Ihrer Nachricht ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.');
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <img
                src="/logo/lid_logo.png"
                alt="Leben in Deutschland Test Logo"
                className="w-12 h-12 object-contain"
              />
              <span className="ml-2 text-base font-bold text-gray-800">Leben in Deutschland Test</span>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium">Startseite</Link>
              <Link href="/quiz" className="text-gray-700 hover:text-blue-600 font-medium">Quiz</Link>
              <Link href="/contact" className="text-gray-700 hover:text-blue-600 font-medium">Kontakt</Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">Kontaktieren Sie uns</h1>
          <p className="text-lg text-gray-700 mb-8 text-center">
            Haben Sie Fragen, Feedback oder benötigen Sie Unterstützung? Füllen Sie einfach das untenstehende Formular aus, und wir werden uns so schnell wie möglich bei Ihnen melden.
          </p>


          <form 
            name="contact" 
            method="POST" 
            data-netlify="true" 
            data-netlify-honeypot="bot-field"
            onSubmit={handleSubmit} 
            className="space-y-6"
          >
            {/* Honeypot field for spam protection */}
            <div style={{ display: 'none' }}>
              <label>
                Don't fill this out if you're human: <input name="bot-field" />
              </label>
            </div>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Ihr Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Ihre E-Mail-Adresse
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                  formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-blue-500'
                }`}
                placeholder="beispiel@email.com"
              />
              {formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) && (
                <p className="text-red-500 text-xs mt-1">Bitte geben Sie eine gültige E-Mail-Adresse ein.</p>
              )}
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                Betreff
              </label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Bitte wählen Sie einen Betreff</option>
                <option value="Hata Bildirimi">🐛 Hata Bildirimi</option>
                <option value="Öneri">💡 Öneri</option>
                <option value="Şikayet">😠 Şikayet</option>
                <option value="Talep">📋 Talep</option>
                <option value="Diğer">❓ Diğer</option>
              </select>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Ihre Nachricht
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>

            {success && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                {success}
              </div>
            )}
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              {loading ? 'Senden...' : 'Nachricht senden'}
            </button>
          </form>
        </div>
      </main>
      <AdsenseSafe />
    </div>
  );
}