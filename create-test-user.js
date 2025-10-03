const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function createTestUser() {
  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: 'fresh@example.com' }
    })

    if (existingUser) {
      console.log('User fresh@example.com already exists!')
      return
    }

    // Hash password
    const hashedPassword = await bcrypt.hash('password123', 12)

    // Create user
    const user = await prisma.user.create({
      data: {
        email: 'fresh@example.com',
        name: 'Fresh User',
        password: hashedPassword,
        isPremium: false
      }
    })

    console.log('Test user created successfully!')
    console.log('Email: fresh@example.com')
    console.log('Password: password123')
    console.log('User ID:', user.id)

  } catch (error) {
    console.error('Error creating test user:', error)
  } finally {
    await prisma.$disconnect()
  }
}

createTestUser()

