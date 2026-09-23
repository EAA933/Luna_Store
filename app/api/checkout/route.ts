
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeKey) return NextResponse.json({ error: "Stripe no configurado" }, { status: 500 });
  const stripe = new Stripe(stripeKey, { apiVersion: "2024-06-20" });
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    currency: "mxn",
    payment_method_types: ["card"],
    line_items: body.items?.map((it: any) => ({
      price_data: { currency: "mxn", product_data: { name: it.name }, unit_amount: it.amount },
      quantity: it.quantity
    })) || [],
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout?status=success`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout?status=cancel`,
  });
  return NextResponse.json({ id: session.id, url: session.url });
}
