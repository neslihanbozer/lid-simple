"use client";
import { useEffect, useState } from "react";

export default function CookieBanner() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const s = typeof window !== "undefined" ? localStorage.getItem("consent") : "granted";
    if (!s) setOpen(true);
  }, []);

  const grantAll = () => {
    // @ts-ignore
    window.gtag && window.gtag('consent','update',{
      'ad_storage':'granted',
      'ad_user_data':'granted',
      'ad_personalization':'granted',
      'analytics_storage':'granted'
    });
    localStorage.setItem("consent","granted");
    setOpen(false);
  };

  const denyAll = () => {
    localStorage.setItem("consent","denied");
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div style={{
      position:"fixed", left:16, right:16, bottom:16, zIndex:9999,
      background:"#fff", borderRadius:12, boxShadow:"0 10px 30px rgba(0,0,0,.12)", padding:16, maxWidth:800, margin:"0 auto"
    }}>
      <p style={{marginBottom:12, fontSize:14}}>
        Bu sitede çerezler kullanıyoruz. AB ziyaretçileri için kişiselleştirilmiş reklamlar, onay verilene kadar kapalıdır.
      </p>
      <div style={{display:"flex", gap:8, alignItems:"center"}}>
        <button onClick={grantAll} style={{padding:"8px 12px", borderRadius:8, color:"#fff", background:"#000"}}>Kabul et</button>
        <button onClick={denyAll} style={{padding:"8px 12px", borderRadius:8, border:"1px solid #ddd"}}>Reddet</button>
        <a href="/cookie-policy" style={{marginLeft:"auto", textDecoration:"underline", fontSize:13}}>Detaylar</a>
      </div>
    </div>
  );
}
