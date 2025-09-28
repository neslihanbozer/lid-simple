import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { PrismaClient } from '@prisma/client'
import { redirect } from 'next/navigation'
import Link from 'next/link'

const prisma = new PrismaClient()

export default async function Dashboard() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect('/auth/signin')
  }

  // Get user stats
  const userStats = await prisma.quizAttempt.groupBy({
    by: ['userId'],
    where: { userId: session.user.id },
    _count: { isCorrect: true },
    _sum: { isCorrect: true }
  })

  const totalQuestions = userStats[0]?._count.isCorrect || 0
  const correctAnswers = userStats[0]?._sum.isCorrect || 0
  const accuracy = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Dashboard
              </h1>
              <p className="text-gray-600">
                Hoş geldin, {session.user.name}!
                {session.user.isPremium && (
                  <span className="ml-2 bg-yellow-500 text-white px-2 py-1 rounded text-sm">
                    PREMIUM
                  </span>
                )}
              </p>
            </div>
            <Link 
              href="/"
              className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
            >
              Ana Sayfa
            </Link>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">Toplam Soru</h3>
              <p className="text-3xl font-bold text-blue-600">{totalQuestions}</p>
            </div>
            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-green-800 mb-2">Doğru Cevap</h3>
              <p className="text-3xl font-bold text-green-600">{correctAnswers}</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-purple-800 mb-2">Başarı Oranı</h3>
              <p className="text-3xl font-bold text-purple-600">{accuracy}%</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Quiz Başlat</h3>
              <p className="text-gray-600 mb-4">
                {session.user.isPremium 
                  ? "300+ soruya erişiminiz var!" 
                  : "50 soruya erişiminiz var. Premium'a geçin!"
                }
              </p>
              <Link 
                href="/quiz"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded inline-block"
              >
                Quiz Başlat
              </Link>
            </div>

            <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Yanlış Cevaplarım</h3>
              <p className="text-gray-600 mb-4">
                Yanlış cevapladığınız soruları gözden geçirin
              </p>
              <Link 
                href="/wrong-answers"
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded inline-block"
              >
                Yanlış Cevaplar
              </Link>
            </div>

            <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                {session.user.isPremium ? "Premium Aktif" : "Premium'a Geç"}
              </h3>
              <p className="text-gray-600 mb-4">
                {session.user.isPremium 
                  ? "Premium üyeliğiniz aktif!" 
                  : "300+ soruya erişim için Premium'a geçin!"
                }
              </p>
              {!session.user.isPremium && (
                <Link 
                  href="/pricing"
                  className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded inline-block"
                >
                  Premium'a Geç
                </Link>
              )}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="mt-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Son Aktiviteler</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-600">
                {totalQuestions === 0 
                  ? "Henüz quiz çözmediniz. Hemen başlayın!" 
                  : `Son quiz'te ${correctAnswers}/${totalQuestions} doğru cevap verdiniz.`
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
