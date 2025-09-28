import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.isPremium) {
      return NextResponse.json(
        { message: 'Bu özellik sadece premium üyeler için' },
        { status: 403 }
      )
    }

    const groups = await prisma.group.findMany({
      include: {
        members: true,
        _count: { select: { members: true } }
      }
    })

    return NextResponse.json({ groups })
  } catch (error) {
    console.error('Groups error:', error)
    return NextResponse.json(
      { message: 'Gruplar yüklenemedi' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.isPremium) {
      return NextResponse.json(
        { message: 'Bu özellik sadece premium üyeler için' },
        { status: 403 }
      )
    }

    const { name, description, maxMembers = 10, questionSetIds = [] } = await request.json()

    const group = await prisma.group.create({
      data: {
        name,
        description,
        maxMembers,
        createdBy: session.user.id,
        questionSetIds: JSON.stringify(questionSetIds),
        members: {
          connect: { id: session.user.id }
        }
      },
      include: {
        members: true
      }
    })

    return NextResponse.json({ group })
  } catch (error) {
    console.error('Create group error:', error)
    return NextResponse.json(
      { message: 'Grup oluşturulamadı' },
      { status: 500 }
    )
  }
}