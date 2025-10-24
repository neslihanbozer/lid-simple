"use client";
import Image from "next/image";
import { useState } from "react";

export type Choice = {
  label: string;            // "A", "B", ...
  text?: string;            // "Bild 1" etc.
  imageUrls?: string[];     // supports multiple images
  alt?: string;
};

export default function ChoiceCard({
  choice,
  onSelect,
}: {
  choice: Choice;
  onSelect: () => void;
}) {
  const [broken, setBroken] = useState<Record<number, boolean>>({});

  const urls = Array.isArray(choice.imageUrls) ? choice.imageUrls : [];

  return (
    <button
      onClick={onSelect}
      className="w-full text-left rounded-2xl border border-gray-200 p-4 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
    >
      <div className="flex items-center gap-3">
        <div className="font-semibold text-gray-700 min-w-8">{choice.label})</div>

        <div className="flex items-center gap-2">
          {urls.map((src, idx) => {
            const normalized = src?.startsWith("/") ? src : `/${src}`;
            return (
              <div
                key={`${normalized}-${idx}`}
                className="relative h-16 w-16 overflow-hidden rounded-xl border border-gray-100 bg-gray-50"
              >
                {!broken[idx] ? (
                  <Image
                    src={normalized}
                    alt={choice.alt ?? choice.text ?? `Option ${choice.label} image ${idx + 1}`}
                    fill
                    sizes="64px"
                    style={{ objectFit: "contain" }}
                    onError={() => setBroken((b) => ({ ...b, [idx]: true }))}
                    priority={false}
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-xs text-gray-400">
                    {choice.text ?? "Bild"}
                  </div>
                )}
              </div>
            );
          })}

          {urls.length === 0 && (
            <div className="h-16 w-16 rounded-xl border border-dashed border-gray-200 bg-gray-50 flex items-center justify-center text-xs text-gray-400">
              {choice.text ?? "Bild"}
            </div>
          )}
        </div>

        {choice.text && <div className="ml-2 text-gray-600">{choice.text}</div>}
      </div>
    </button>
  );
}
