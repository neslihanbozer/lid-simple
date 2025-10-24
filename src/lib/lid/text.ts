// removes PDF artifacts; keeps stem concise
export function normalizeStem(text: string) {
  return (text || "")
    // collapse whitespace
    .replace(/\s+/g, " ")
    // remove bullets / box glyphs and everything after them (choices)
    .replace(/[\u25A0\u25A1\u25A2\u25A3\u25A9\u25AA\u25AB\u25CF\u25CB▪■□◻•●].*$/, "")
    // strip any inline 'Bild 1 ... Bild 4' trains (sometimes duplicated)
    .replace(/(?:Bild\s*[1-4]\s*){1,6}/gi, "")
    // remove page numbers like "Seite 2 von 191"
    .replace(/Seite\s+\d+\s+von\s+\d+/gi, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function normalizeChoice(text: string) {
  return (text || "").replace(/^[^\wÄÖÜäöüß]+/, "").replace(/\s+/g, " ").trim();
}
