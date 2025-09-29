import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function Home() {
  const session = await getServerSession(authOptions)
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-4xl font-bold text-center">
          Leben in Deutschland Quiz
        </h1>
        <div className="flex gap-4">
          {session ? (
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                Hoş geldin, {session.user.name}!
                {session.user.isPremium && (
                  <span className="ml-2 bg-yellow-500 text-white px-2 py-1 rounded text-xs">
                    PREMIUM
                  </span>
                )}
              </span>
              <Link 
                href="/dashboard"
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
              >
                Dashboard
              </Link>
              <Link 
                href="/api/auth/signout"
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
              >
                Çıkış
              </Link>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link 
                href="/auth/signin"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              >
                Giriş
              </Link>
              <Link 
                href="/auth/signup"
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
              >
                Kayıt
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="relative flex place-items-center">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Almanya'da Yaşam Bilginizi Test Edin
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Leben in Deutschland sınavına hazırlanın. 300+ soru, çoklu dil desteği ve AI açıklamaları ile öğrenin.
          </p>
          
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Sol Taraf - Quiz Başlatma */}
              <div className="text-center">
                <div className="text-6xl mb-4">🎯</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Quiz Başlat</h3>
                <p className="text-gray-600 mb-6">
                  {session ? (
                    session.user.isPremium ? (
                      "300+ soruya erişiminiz var!"
                    ) : (
                      "Premium üyelik gerekli"
                    )
                  ) : (
                    "Premium üyelik gerekli"
                  )}
                </p>
                <Link href="/quiz">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors">
                    🚀 Quiz Başlat
                  </button>
                </Link>
              </div>

              {/* Sağ Taraf - Premium Özellikler */}
              <div className="text-center">
                <div className="text-6xl mb-4">⭐</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Premium Özellikler</h3>
                <div className="space-y-2 text-left mb-6">
                  <div className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span className="text-sm">300+ soru</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span className="text-sm">Çoklu dil desteği</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span className="text-sm">AI açıklamalar</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span className="text-sm">Gruplu çalışma</span>
                  </div>
                </div>
                
                {!session?.user?.isPremium ? (
                  <div className="space-y-3">
                    <Link href="/payment">
                      <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-lg transition-colors">
                        💳 Premium'a Geç - €5.99/ay
                      </button>
                    </Link>
                    <Link href="/premium-dashboard">
                      <button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded text-sm transition-colors">
                        🧪 Premium Özelliklerini Test Et
                      </button>
                    </Link>
                  </div>
                ) : (
                  <Link href="/premium-dashboard">
                    <button className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-lg transition-colors">
                      🎉 Premium Dashboard
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Kullanıcı Özel Butonlar */}
          {session && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link href="/wrong-answers">
                <button className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-lg transition-colors">
                  ❌ Yanlış Cevaplarım
                </button>
              </Link>
              {session.user.isPremium && (
                <Link href="/groups">
                  <button className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-lg transition-colors">
                    👥 Gruplu Çalışma
                  </button>
                </Link>
              )}
              <Link href="/question-status">
                <button className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg transition-colors">
                  📊 İlerleme Takibi
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Premium Özellikler Tanıtımı */}
      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-3 lg:text-left">
        <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-blue-300 hover:bg-blue-50">
          <div className="text-4xl mb-3">📚</div>
          <h2 className="mb-3 text-2xl font-semibold text-blue-800">
            300+ Soru
          </h2>
          <p className="m-0 max-w-[30ch] text-sm text-gray-600">
            Tarih, Politika, Toplum ve daha fazla konuda kapsamlı sorular
          </p>
        </div>

        <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-green-300 hover:bg-green-50">
          <div className="text-4xl mb-3">🌍</div>
          <h2 className="mb-3 text-2xl font-semibold text-green-800">
            Çoklu Dil
          </h2>
          <p className="m-0 max-w-[30ch] text-sm text-gray-600">
            Türkçe, Almanca, İngilizce ve Arapça dil desteği
          </p>
        </div>

        <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-purple-300 hover:bg-purple-50">
          <div className="text-4xl mb-3">🤖</div>
          <h2 className="mb-3 text-2xl font-semibold text-purple-800">
            AI Açıklamalar
          </h2>
          <p className="m-0 max-w-[30ch] text-sm text-gray-600">
            Yapay zeka ile detaylı konu açıklamaları
          </p>
        </div>
      </div>
    </main>
  )
}
