import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import CookieBanner from '@/components/CookieBanner'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Leben in Deutschland Test',
  description: 'Test your knowledge about life in Germany',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <head>
        <Script id="consent-default" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent','default',{
              'ad_storage':'denied',
              'ad_user_data':'denied',
              'ad_personalization':'denied',
              'analytics_storage':'denied'
            });
          `}
        </Script>

        {/* GA4 - commented out, uncomment and set NEXT_PUBLIC_GA_ID if needed */}
        {/* <Script async src={"https://www.googletagmanager.com/gtag/js?id=" + (process.env.NEXT_PUBLIC_GA_ID || "")} />
        <Script id="ga4" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID || ""}');
          `}
        </Script> */}

        <Script
          async
          src={"https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=" + (process.env.NEXT_PUBLIC_ADSENSE_CLIENT || "")}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <script dangerouslySetInnerHTML={{__html:`
          window.__onConsentAccept=function(){
            gtag('consent','update',{
              ad_storage:'granted',
              ad_user_data:'granted',
              ad_personalization:'granted',
              analytics_storage:'granted'
            });
          };
        `}} />
      </head>
      <body className={inter.className}>
        <CookieBanner />
        {children}
      </body>
    </html>
  )
}
