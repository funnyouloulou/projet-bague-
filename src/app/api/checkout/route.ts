import { NextRequest, NextResponse } from "next/server";
import { PRODUCT } from "@/data/product";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    return NextResponse.json({ error: "Paiement non configuré" }, { status: 503 });
  }

  const Stripe = (await import("stripe")).default;
  const stripe = new Stripe(key);

  try {
    const body = await req.json();
    const { size, productName, price } = body;

    if (!size) {
      return NextResponse.json({ error: "Taille manquante" }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      locale: "fr",
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: productName ?? PRODUCT.name,
              description: `Taille ${size}`,
            },
            unit_amount: Math.round((price ?? PRODUCT.price) * 100),
          },
          quantity: 1,
        },
      ],
      shipping_address_collection: {
        allowed_countries: ["FR", "BE", "CH", "LU", "MC"],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: { amount: 0, currency: "eur" },
            display_name: "Livraison offerte",
            delivery_estimate: {
              minimum: { unit: "business_day", value: 7 },
              maximum: { unit: "business_day", value: 14 },
            },
          },
        },
      ],
      metadata: { size, productName: productName ?? PRODUCT.name },
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/merci?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/#collection`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe error:", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
