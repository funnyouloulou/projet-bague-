import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { PRODUCT } from "@/data/product";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { size } = body;

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
              name: PRODUCT.name,
              description: `${PRODUCT.subtitle} — Taille ${size}`,
              // Remplacez par une vraie image une fois que vous en avez
              // images: ["https://votre-site.com/images/ring-1.jpg"],
            },
            unit_amount: Math.round(PRODUCT.price * 100), // en centimes
          },
          quantity: 1,
        },
      ],

      // Collecte l'adresse de livraison du client
      shipping_address_collection: {
        allowed_countries: ["FR", "BE", "CH", "LU", "MC"],
      },

      // Frais de livraison offerts
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

      // Métadonnées pour retrouver la taille dans le webhook
      metadata: {
        size,
        productName: PRODUCT.name,
      },

      // Pages de redirection
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/merci?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/#buy`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe error:", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
