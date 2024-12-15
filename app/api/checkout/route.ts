// app/api/checkout/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-09-30.acacia' });

export async function POST(req: NextRequest) {
  try {
    const { quantity = 1 } = await req.json(); // Get quantity from the request body
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: 'price_1Q9mtKBbjU1BWOm6tMqPDSw0', // replace this with the price ID from your Stripe dashboard
          quantity,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_DOMAIN}/success`, // after successful payment
      cancel_url: `${process.env.NEXT_PUBLIC_DOMAIN}/cancel`,  // if payment is canceled
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error('Error creating Stripe session:', err);
    return NextResponse.json({ error: 'Error creating Stripe session' }, { status: 500 });
  }
  
}
