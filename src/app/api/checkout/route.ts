import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    return NextResponse.json(
      { error: "Paiement non encore configuré. Revenez bientôt !" },
      { status: 503 }
    );
  }

  try {
    const body = await req.json();
    const { items } = body as {
      items: { productName: string; size: string; price: number; currency: string; quantity: number }[];
    };

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Panier vide" }, { status: 400 });
    }

    const { default: Stripe } = await import("stripe");
    const stripe = new Stripe(key);

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "";

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      locale: "fr",
      line_items: items.map((item) => ({
        price_data: {
          currency: item.currency ?? "eur",
          product_data: {
            name: item.productName,
            description: item.size ? `Taille ${item.size}` : undefined,
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      })),
      shipping_address_collection: { allowed_countries: ["FR", "BE", "CH", "LU", "MC"] },
      shipping_options: [{
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: { amount: 0, currency: "eur" },
          display_name: "Livraison offerte",
          delivery_estimate: {
            minimum: { unit: "business_day", value: 7 },
            maximum: { unit: "business_day", value: 14 },
          },
        },
      }],
      metadata: {
        productName: items.map((i) => i.productName).join(", "),
        size: items.map((i) => i.size).join(", "),
      },
      success_url: `${siteUrl}/merci?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/#collection`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe error:", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
