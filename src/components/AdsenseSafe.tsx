"use client";
import { usePathname } from "next/navigation";
const ADS_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
const ADS_ENABLED = String(process.env.NEXT_PUBLIC_ADSENSE_ENABLED) === "true";
const WHITELIST = ["/quiz", "/bundeslaender"];
function isWhitelisted(p:string){return WHITELIST.some(x=>p===x||p.startsWith(x+"/"));}

export default function AdsenseSafe(){
  const path = usePathname() || "/";
  if (!ADS_ENABLED) return null;
  if (!ADS_CLIENT) return null;
  if (!isWhitelisted(path)) return null;
  return (
    <>
      <script async src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADS_CLIENT}`} crossOrigin="anonymous" />
      <ins className="adsbygoogle" style={{display:"block",minHeight:90}} data-ad-client={ADS_CLIENT} data-ad-slot="auto" data-ad-format="auto" data-full-width-responsive="true" />
      <script dangerouslySetInnerHTML={{__html:`(adsbygoogle=window.adsbygoogle||[]).push({});`}} />
    </>
  );
}
