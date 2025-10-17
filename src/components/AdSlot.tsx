"use client";
import { useEffect, useRef } from "react";

const ADS_ENABLED = process.env.NEXT_PUBLIC_ADSENSE_ENABLED === "true";

type AdSlotProps = React.HTMLAttributes<HTMLDivElement> & {
  "data-ad-slot"?: string;
};

export default function AdSlot(props: AdSlotProps) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ADS_ENABLED) return;
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {}
  }, []);
  if (!ADS_ENABLED) return null;
  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT}
      data-ad-slot={props["data-ad-slot"] || ""}
      data-full-width-responsive="true"
    />
  );
}
