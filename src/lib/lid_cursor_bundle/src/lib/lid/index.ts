import fs from "node:fs";
import path from "node:path";
import type { Question, StateCode } from "./types";

/** Local data path when used in a Node/Next.js server context */
const DATA_DIR = path.join(process.cwd(), "data", "lid");

/** Loaders (Node / file system) */
export function loadGeneralNode(): Question[] {
  const p = path.join(DATA_DIR, "general.json");
  return JSON.parse(fs.readFileSync(p, "utf8"));
}
export function loadStateNode(code: StateCode): Question[] {
  const p = path.join(DATA_DIR, "states", `${code}.json`);
  return JSON.parse(fs.readFileSync(p, "utf8"));
}

/** Loaders (HTTP / browser). Place data under /public/lid to use these. */
export async function loadGeneralHttp(baseUrl = "/lid"): Promise<Question[]> {
  const res = await fetch(`${baseUrl}/general.json`);
  return res.json();
}
export async function loadStateHttp(code: StateCode, baseUrl = "/lid"): Promise<Question[]> {
  const res = await fetch(`${baseUrl}/states/${code}.json`);
  return res.json();
}

/** Deterministic shuffle + sampler (for building 30+3 sets) */
function mulberry32(a: number) {
  return function() {
    let t = a += 0x6D2B79F5;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
export function sample<T>(arr: T[], k: number, seed = 1234): T[] {
  const rng = mulberry32(seed);
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a.slice(0, k);
}

/** Build a 33-question mock exam: 30 general + 3 state */
export function buildExamSetNode(state: StateCode, seed = Date.now()): Question[] {
  const general = loadGeneralNode();
  const st = loadStateNode(state);
  return [...sample(general, 30, seed), ...sample(st, 3, seed + 1)];
}
