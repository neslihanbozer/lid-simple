import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json()

    // Validation
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: 'Tüm alanlar gereklidir' },
        { status: 400 }
      )
    }

    // Şifre validasyonu: en az 8 karakter ve özel karakter
    if (password.length < 8) {
      return NextResponse.json(
        { message: 'Şifre en az 8 karakter olmalıdır' },
        { status: 400 }
      )
    }

    // Özel karakter kontrolü
    const specialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/
    if (!specialChars.test(password)) {
      return NextResponse.json(
        { message: 'Şifre en az bir özel karakter içermelidir (!@#$%^&* vb.)' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { message: 'Bu email adresi zaten kullanılıyor' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        isPremium: false
      }
    })

    return NextResponse.json(
      { message: 'Kullanıcı başarıyla oluşturuldu' },
      { status: 201 }
    )
  } catch (error) {
    console.error('Registration error:', error)
    
    // Prisma hatalarını özel olarak yönet
    if (error instanceof Error) {
      if (error.message.includes('DATABASE_URL')) {
        return NextResponse.json(
          { message: 'Veritabanı bağlantı hatası. Lütfen daha sonra tekrar deneyin.' },
          { status: 500 }
        )
      }
      if (error.message.includes('unique constraint')) {
        return NextResponse.json(
          { message: 'Bu email adresi zaten kullanılıyor' },
          { status: 400 }
        )
      }
    }
    
    return NextResponse.json(
      { message: 'Kayıt sırasında bir hata oluştu. Lütfen tekrar deneyin.' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
