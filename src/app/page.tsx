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
        <div className="text-center">
          <h2 className="text-2xl mb-8">
            Testen Sie Ihr Wissen über das Leben in Deutschland
          </h2>
          <div className="space-y-4">
            <Link href="/quiz">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Quiz starten
              </button>
            </Link>
            <div className="text-sm text-gray-600">
              {session ? (
                session.user.isPremium ? (
                  <p>✅ Premium üye - 300+ soruya erişiminiz var!</p>
                ) : (
                  <p>📝 Ücretsiz üye - 50 soruya erişiminiz var</p>
                )
              ) : (
                <p>🔓 Ücretsiz - 50 soruya erişim! Premium için kayıt olun</p>
              )}
            </div>
            {!session?.user?.isPremium && (
              <Link href="/pricing">
                <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded">
                  Premium'a Geç - €9.99/ay
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
          <h2 className="mb-3 text-2xl font-semibold">
            Geschichte{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Deutsche Geschichte und Kultur
          </p>
        </div>

        <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
          <h2 className="mb-3 text-2xl font-semibold">
            Politik{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Politisches System und Rechte
          </p>
        </div>

        <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
          <h2 className="mb-3 text-2xl font-semibold">
            Gesellschaft{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Gesellschaftliche Werte und Normen
          </p>
        </div>

        <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
          <h2 className="mb-3 text-2xl font-semibold">
            Integration{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Integration und Teilhabe
          </p>
        </div>
      </div>
    </main>
  )
}
