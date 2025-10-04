export type StateCode =
  | "BW" | "BY" | "BE" | "BB" | "HB" | "HH" | "HE" | "MV"
  | "NI" | "NW" | "RP" | "SL" | "SN" | "ST" | "SH" | "TH";

export type ChoiceID = "A" | "B" | "C" | "D";

export type Choice = { id: ChoiceID; text: string };

export type Question = {
  id: string;                 // e.g. "G001", "BE03"
  numberInCatalog: number;    // 1..300 (general) or 1..10 (state)
  text: string;
  choices: Choice[];          // four options
  state?: StateCode;          // only for state questions
  kind: "text" | "image-choice";
  source: { pdfUrl: string; pdfStand: string };
};
