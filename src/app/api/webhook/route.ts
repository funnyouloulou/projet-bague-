import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { createOrder } from "@/lib/orders";
import { nanoid } from "nanoid";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return NextResponse.json({ error: "Non configuré" }, { status: 503 });
  const Stripe = (await import("stripe")).default;
  const stripe = new Stripe(key);
  const body = await req.text();
  const sig = req.headers.get("stripe-signature")!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature error:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const session = event.data.object as any;

    const shipping = session.shipping_details as { name?: string; address?: { line1?: string; city?: string; postal_code?: string; country?: string } } | null;
    const customer = session.customer_details as { name?: string; email?: string } | null;

    // Sauvegarder la commande
    createOrder({
      id: nanoid(10),
      createdAt: new Date().toISOString(),
      status: "paid",
      customerName: customer?.name ?? "Inconnu",
      customerEmail: customer?.email ?? "",
      productName: session.metadata?.productName ?? "",
      size: session.metadata?.size ?? "",
      quantity: 1,
      amountPaid: session.amount_total ?? 0,
      currency: session.currency ?? "eur",
      shippingName: shipping?.name ?? "",
      shippingAddress: shipping?.address?.line1 ?? "",
      shippingCity: shipping?.address?.city ?? "",
      shippingPostalCode: shipping?.address?.postal_code ?? "",
      shippingCountry: shipping?.address?.country ?? "",
      stripeSessionId: session.id,
    });

    console.log(`✅ Nouvelle commande reçue — ${customer?.email}`);
  }

  return NextResponse.json({ received: true });
}

