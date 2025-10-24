import { NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";

const FILE = path.join(process.cwd(), "public", "data", "overrides.json");

export async function GET() {
  const raw = await fs.readFile(FILE, "utf8").catch(() => "{}");
  return NextResponse.json(JSON.parse(raw));
}

export async function POST(req: Request) {
  const body = await req.json();
  await fs.mkdir(path.dirname(FILE), { recursive: true });
  await fs.writeFile(FILE, JSON.stringify(body, null, 2), "utf8");
  return NextResponse.json({ ok: true });
}
