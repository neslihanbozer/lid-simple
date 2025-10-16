"use client";
import { useEffect, useRef } from "react";

type Props = {
  slot: string;                         // data-ad-slot
  style?: React.CSSProperties;
  format?: string;                      // "auto" | "fluid" | etc.
  fullWidthResponsive?: boolean;
};

export default function AdSlot({
  slot,
  style,
  format="auto",
  fullWidthResponsive=true
}: Props) {
  const adRef = useRef<HTMLDivElement>(null);
  const adLoaded = useRef(false);

  useEffect(() => {
    if (adLoaded.current || !adRef.current) return;
    
    try {
      // @ts-ignore
      if (window.adsbygoogle && !adRef.current.hasAttribute('data-adsbygoogle-status')) {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        adLoaded.current = true;
      }
    } catch (error) {
      console.log('AdSense error:', error);
    }
  }, []);

  return (
    <div ref={adRef}>
      <ins className="adsbygoogle"
        style={style || { display:"block" }}
        data-ad-client="ca-pub-4113696984513542"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={fullWidthResponsive ? "true" : "false"}
      />
    </div>
  );
}
