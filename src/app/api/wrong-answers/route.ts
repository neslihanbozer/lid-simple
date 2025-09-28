import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { message: 'Giriş yapmanız gerekiyor' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const difficulty = searchParams.get('difficulty')
    const reviewed = searchParams.get('reviewed')

    const where: any = {
      userId: session.user.id
    }

    if (category) where.category = category
    if (difficulty) where.difficulty = difficulty
    if (reviewed !== null) where.isReviewed = reviewed === 'true'

    const wrongAnswers = await prisma.wrongAnswer.findMany({
      where,
      include: {
        question: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json({ wrongAnswers })
  } catch (error) {
    console.error('Wrong answers error:', error)
    return NextResponse.json(
      { message: 'Yanlış cevaplar yüklenemedi' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { message: 'Giriş yapmanız gerekiyor' },
        { status: 401 }
      )
    }

    const { questionId, userAnswer, correctAnswer, explanation, category, difficulty } = await request.json()

    // Yanlış cevap kaydet
    const wrongAnswer = await prisma.wrongAnswer.create({
      data: {
        userId: session.user.id,
        questionId,
        userAnswer,
        correctAnswer,
        explanation,
        category,
        difficulty
      }
    })

    return NextResponse.json({ wrongAnswer })
  } catch (error) {
    console.error('Save wrong answer error:', error)
    return NextResponse.json(
      { message: 'Yanlış cevap kaydedilemedi' },
      { status: 500 }
    )
  }
}
