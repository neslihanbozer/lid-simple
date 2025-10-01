import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import Stripe from 'stripe'

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
  const signature = req.headers.get('stripe-signature')
  if (!signature) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 })
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
  if (!webhookSecret) {
    return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 })
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2023-10-16' })

  let event: Stripe.Event
  const rawBody = await req.text()

  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret)
  } catch (err) {
    console.error('Webhook signature verification failed.', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        const userId = (session.metadata as any)?.userId
        if (userId) {
          await prisma.user.update({ where: { id: userId }, data: { isPremium: true } })
        }
        break
      }
      case 'invoice.paid': {
        const customerId = (event.data.object as Stripe.Invoice).customer as string
        const userId = (event.data.object as any)?.metadata?.userId
        if (userId) {
          await prisma.user.update({ where: { id: userId }, data: { isPremium: true } })
        }
        break
      }
      case 'customer.subscription.deleted': {
        const userId = (event.data.object as any)?.metadata?.userId
        if (userId) {
          await prisma.user.update({ where: { id: userId }, data: { isPremium: false } })
        }
        break
      }
      default:
        break
    }
    return NextResponse.json({ received: true }, { status: 200 })
  } catch (err) {
    console.error('Webhook handler failed', err)
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
}

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
