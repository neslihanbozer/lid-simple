'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function PremiumSuccess() {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // URL'den session_id'yi al
    const urlParams = new URLSearchParams(window.location.search);
    const session = urlParams.get('session_id');
    setSessionId(session);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        {/* Success Icon */}
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        {/* Success Message */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          🎉 Premium Üyelik Aktif!
        </h1>
        
        <p className="text-gray-600 mb-6">
          Tebrikler! Premium üyeliğiniz başarıyla aktif edildi. 
          Artık tüm premium özelliklerden yararlanabilirsiniz.
        </p>

        {/* Session ID (for debugging) */}
        {sessionId && (
          <div className="bg-gray-100 rounded-lg p-3 mb-6 text-sm text-gray-600">
            <strong>Session ID:</strong> {sessionId}
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          <Link 
            href="/"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 block"
          >
            🏠 Ana Sayfaya Dön
          </Link>
          
          <Link 
            href="/quiz"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 block"
          >
            🧠 Quiz'e Başla
          </Link>
          
          <Link 
            href="/all-questions"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 block"
          >
            📚 Tüm Sorular
          </Link>
        </div>

        {/* Premium Features Reminder */}
        <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
          <h3 className="font-semibold text-gray-900 mb-2">🎯 Premium Özellikleriniz:</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>✅ 300+ soruya erişim</li>
            <li>✅ Çift dil desteği</li>
            <li>✅ Grup çalışması</li>
            <li>✅ AI açıklamaları</li>
            <li>✅ İlerleme takibi</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
