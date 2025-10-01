import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers'
import LanguageSwitcher from '@/components/LanguageSwitcher'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Leben in Deutschland Quiz',
  description: 'Test your knowledge about life in Germany',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de">
      <body className={inter.className}>
        <Providers>
          <div className="min-h-12 w-full flex items-center justify-end px-4 py-3">
            <LanguageSwitcher />
          </div>
          {children}
        </Providers>
      </body>
    </html>
  )
}
