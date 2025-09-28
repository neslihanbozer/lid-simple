import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { message: 'Giriş yapmanız gerekiyor' },
        { status: 401 }
      )
    }

    const { isReviewed } = await request.json()

    const wrongAnswer = await prisma.wrongAnswer.update({
      where: {
        id: params.id,
        userId: session.user.id // Sadece kendi yanlış cevaplarını güncelleyebilir
      },
      data: {
        isReviewed,
        reviewedAt: isReviewed ? new Date() : null
      }
    })

    return NextResponse.json({ wrongAnswer })
  } catch (error) {
    console.error('Update wrong answer error:', error)
    return NextResponse.json(
      { message: 'Yanlış cevap güncellenemedi' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { message: 'Giriş yapmanız gerekiyor' },
        { status: 401 }
      )
    }

    await prisma.wrongAnswer.delete({
      where: {
        id: params.id,
        userId: session.user.id // Sadece kendi yanlış cevaplarını silebilir
      }
    })

    return NextResponse.json({ message: 'Yanlış cevap silindi' })
  } catch (error) {
    console.error('Delete wrong answer error:', error)
    return NextResponse.json(
      { message: 'Yanlış cevap silinemedi' },
      { status: 500 }
    )
  }
}
