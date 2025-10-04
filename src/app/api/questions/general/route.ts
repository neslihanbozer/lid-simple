import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET() {
  try {
    const bundlePath = path.join(process.cwd(), 'src/lib/lid_cursor_bundle/data/lid/general.json')
    const bundleData = JSON.parse(fs.readFileSync(bundlePath, 'utf8'))
    
    return NextResponse.json(bundleData)
  } catch (error) {
    console.error('Error loading general questions:', error)
    return NextResponse.json({ error: 'Failed to load general questions' }, { status: 500 })
  }
}
