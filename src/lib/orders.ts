// Base de données simple basée sur un fichier JSON
// Pour la production, remplacez par PostgreSQL/Supabase
import fs from "fs";
import path from "path";

const DB_PATH = path.join(process.cwd(), "data", "orders.json");

export type OrderStatus = "paid" | "processing" | "fulfilled" | "cancelled";

export interface Order {
  id: string;
  createdAt: string;
  status: OrderStatus;
  // Client
  customerName: string;
  customerEmail: string;
  // Produit
  productName: string;
  size: string;
  quantity: number;
  // Prix
  amountPaid: number; // en centimes
  currency: string;
  // Livraison (renseigné par Stripe Checkout)
  shippingName: string;
  shippingAddress: string;
  shippingCity: string;
  shippingPostalCode: string;
  shippingCountry: string;
  // Stripe
  stripeSessionId: string;
  // Fulfillment
  trackingNumber?: string;
  fulfilledAt?: string;
  notes?: string;
}

function readDB(): Order[] {
  if (!fs.existsSync(DB_PATH)) {
    fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
    fs.writeFileSync(DB_PATH, "[]");
    return [];
  }
  return JSON.parse(fs.readFileSync(DB_PATH, "utf-8"));
}

function writeDB(orders: Order[]): void {
  fs.writeFileSync(DB_PATH, JSON.stringify(orders, null, 2));
}

export function getAllOrders(): Order[] {
  return readDB().sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function getOrderById(id: string): Order | null {
  return readDB().find((o) => o.id === id) ?? null;
}

export function createOrder(order: Order): void {
  const orders = readDB();
  orders.push(order);
  writeDB(orders);
}

export function updateOrder(id: string, updates: Partial<Order>): Order | null {
  const orders = readDB();
  const idx = orders.findIndex((o) => o.id === id);
  if (idx === -1) return null;
  orders[idx] = { ...orders[idx], ...updates };
  writeDB(orders);
  return orders[idx];
}
