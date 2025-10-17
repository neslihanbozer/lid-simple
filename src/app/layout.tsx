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

        {(() => {
          const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
          return GA_ID && (
            <>
              <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
              <script dangerouslySetInnerHTML={{__html:`
                window.dataLayer=window.dataLayer||[];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config','${GA_ID}',{ anonymize_ip:true, debug_mode:true });
              `}} />
            </>
          );
        })()}

        <Script
          async
          src={"https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=" + (process.env.NEXT_PUBLIC_ADSENSE_CLIENT || "")}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <script dangerouslySetInnerHTML={{__html:`
          window.__onConsentAccept=function(){
            try{
              gtag('consent','update',{
                ad_storage:'granted',
                ad_user_data:'granted',
                ad_personalization:'granted',
                analytics_storage:'granted'
              });
            }catch(e){}
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
