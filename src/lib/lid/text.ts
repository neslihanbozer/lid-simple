// removes PDF artifacts; keeps stem concise
export function normalizeStem(text: string) {
  return (text || "")
    // collapse whitespace
    .replace(/\s+/g, " ")
    // remove bullets / box glyphs
    .replace(/[\u25A0\u25A1\u25A2\u25A3\u25A9\u25AA\u25AB\u25CF\u25CB▪■□◻•●]/g, "")
    // strip any inline 'Bild 1 ... Bild 4' trains (sometimes duplicated)
    .replace(/(?:Bild\s*[1-4]\s*){1,6}/gi, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function normalizeChoice(text: string) {
  return (text || "").replace(/^[^\wÄÖÜäöüß]+/, "").replace(/\s+/g, " ").trim();
}
