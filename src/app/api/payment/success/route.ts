import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    const { userId } = await request.json()

    if (!userId) {
      return NextResponse.json(
        { message: 'Kullanıcı ID gerekli' },
        { status: 400 }
      )
    }

    // Kullanıcıyı Premium yap
    const user = await prisma.user.update({
      where: { id: userId },
      data: { isPremium: true }
    })

    return NextResponse.json(
      { message: 'Premium üyelik başarıyla aktif edildi', user },
      { status: 200 }
    )
  } catch (error) {
    console.error('Payment success error:', error)
    return NextResponse.json(
      { message: 'Premium üyelik aktif edilemedi' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
