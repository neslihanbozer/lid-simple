import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET(
  request: Request,
  { params }: { params: { stateCode: string } }
) {
  try {
    const { stateCode } = params
    const bundlePath = path.join(process.cwd(), 'src/lib/lid_cursor_bundle/data/lid/states', `${stateCode}.json`)
    
    if (!fs.existsSync(bundlePath)) {
      return NextResponse.json({ error: 'State not found' }, { status: 404 })
    }
    
    const bundleData = JSON.parse(fs.readFileSync(bundlePath, 'utf8'))
    
    return NextResponse.json(bundleData)
  } catch (error) {
    console.error(`Error loading state questions for ${params.stateCode}:`, error)
    return NextResponse.json({ error: 'Failed to load state questions' }, { status: 500 })
  }
}
