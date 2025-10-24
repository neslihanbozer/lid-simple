export type ChoiceId = "A"|"B"|"C"|"D";
export type Box = { x:number; y:number; w:number; h:number };
export type OverrideImageChoice = { kind:"image-choice"; boxes: Partial<Record<ChoiceId, Box>> };
export type OverrideSingle = { kind:"single-image"; box: Box };
export type Overrides = Record<string, OverrideImageChoice | OverrideSingle>;
