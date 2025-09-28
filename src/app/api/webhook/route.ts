import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')!

  let event

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object
        const userId = session.metadata?.userId

        if (userId) {
          await prisma.subscription.create({
            data: {
              userId,
              stripeId: session.subscription as string,
              status: 'active',
              currentPeriodStart: new Date(session.subscription_details?.billing_cycle_anchor * 1000),
              currentPeriodEnd: new Date(session.subscription_details?.billing_cycle_anchor * 1000 + 30 * 24 * 60 * 60 * 1000),
            }
          })

          await prisma.user.update({
            where: { id: userId },
            data: { isPremium: true }
          })
        }
        break

      case 'customer.subscription.updated':
        const subscription = event.data.object
        await prisma.subscription.update({
          where: { stripeId: subscription.id },
          data: { status: subscription.status }
        })
        break

      case 'customer.subscription.deleted':
        const deletedSubscription = event.data.object
        await prisma.subscription.update({
          where: { stripeId: deletedSubscription.id },
          data: { status: 'canceled' }
        })

        const user = await prisma.subscription.findUnique({
          where: { stripeId: deletedSubscription.id },
          select: { userId: true }
        })

        if (user) {
          await prisma.user.update({
            where: { id: user.userId },
            data: { isPremium: false }
          })
        }
        break
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ error: 'Webhook failed' }, { status: 500 })
  }
}
