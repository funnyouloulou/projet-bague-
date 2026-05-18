import { getAllOrders } from "@/lib/orders";
import { Package, CheckCircle, Clock, XCircle, TrendingUp } from "lucide-react";

const STATUS_LABELS: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
  paid: {
    label: "À traiter",
    color: "bg-amber-100 text-amber-700 border-amber-200",
    icon: <Clock size={12} />,
  },
  processing: {
    label: "En cours",
    color: "bg-blue-100 text-blue-700 border-blue-200",
    icon: <Package size={12} />,
  },
  fulfilled: {
    label: "Expédié",
    color: "bg-green-100 text-green-700 border-green-200",
    icon: <CheckCircle size={12} />,
  },
  cancelled: {
    label: "Annulé",
    color: "bg-red-100 text-red-700 border-red-200",
    icon: <XCircle size={12} />,
  },
};

export default async function AdminPage() {
  const orders = getAllOrders();

  const totalRevenue = orders
    .filter((o) => o.status !== "cancelled")
    .reduce((sum, o) => sum + o.amountPaid / 100, 0);
  const pending = orders.filter((o) => o.status === "paid").length;
  const fulfilled = orders.filter((o) => o.status === "fulfilled").length;

  return (
    <main className="min-h-screen bg-[#FAF8F3] p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-serif text-3xl text-[#1a1a1a]">Dashboard Commandes</h1>
            <p className="text-[#8a8178] text-sm mt-1">
              {orders.length} commande{orders.length !== 1 ? "s" : ""} au total
            </p>
          </div>
          <a href="/" className="text-xs text-[#C9A84C] hover:underline">← Voir la boutique</a>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Revenus totaux", value: `${totalRevenue.toFixed(2)} €`, icon: <TrendingUp size={18} /> },
            { label: "À traiter", value: pending, icon: <Clock size={18} /> },
            { label: "Expédiées", value: fulfilled, icon: <CheckCircle size={18} /> },
            { label: "Total commandes", value: orders.length, icon: <Package size={18} /> },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl p-5 shadow-sm border border-[#1a1a1a]/5">
              <div className="text-[#C9A84C] mb-3">{stat.icon}</div>
              <p className="font-serif text-2xl text-[#1a1a1a]">{stat.value}</p>
              <p className="text-xs text-[#8a8178] mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Orders table */}
        {orders.length === 0 ? (
          <div className="bg-white rounded-2xl p-16 text-center shadow-sm">
            <Package size={40} className="text-[#C9A84C]/40 mx-auto mb-4" strokeWidth={1} />
            <p className="text-[#8a8178]">Aucune commande pour l&apos;instant.</p>
            <p className="text-sm text-[#8a8178]/60 mt-1">Les commandes apparaîtront ici dès qu&apos;un client paiera.</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-[#1a1a1a]/5">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#1a1a1a]/5 text-[10px] tracking-[0.15em] uppercase text-[#8a8178]">
                    {["Date", "Client", "Produit", "Taille", "Montant", "Adresse", "Statut", "Action"].map((h) => (
                      <th key={h} className="text-left px-5 py-4 font-medium">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, i) => {
                    const status = STATUS_LABELS[order.status];
                    const cjUrl = `https://cjdropshipping.com/product-list.html?searchKeyword=${encodeURIComponent(order.productName)}`;
                    return (
                      <tr
                        key={order.id}
                        className={`border-b border-[#1a1a1a]/5 hover:bg-[#FAF8F3] transition-colors ${
                          i % 2 === 0 ? "" : "bg-[#FAF8F3]/40"
                        }`}
                      >
                        <td className="px-5 py-4 text-[#8a8178] whitespace-nowrap">
                          {new Date(order.createdAt).toLocaleDateString("fr-FR")}
                        </td>
                        <td className="px-5 py-4">
                          <p className="font-medium text-[#1a1a1a]">{order.customerName}</p>
                          <p className="text-[#8a8178] text-xs">{order.customerEmail}</p>
                        </td>
                        <td className="px-5 py-4 text-[#1a1a1a]">{order.productName}</td>
                        <td className="px-5 py-4">
                          <span className="bg-[#C9A84C]/10 text-[#A07830] text-xs px-2 py-1 rounded-md font-medium">
                            {order.size}
                          </span>
                        </td>
                        <td className="px-5 py-4 font-medium text-[#1a1a1a] whitespace-nowrap">
                          {(order.amountPaid / 100).toFixed(2)} €
                        </td>
                        <td className="px-5 py-4 text-[#8a8178] text-xs max-w-[180px]">
                          <p>{order.shippingAddress}</p>
                          <p>{order.shippingPostalCode} {order.shippingCity}</p>
                          <p>{order.shippingCountry}</p>
                        </td>
                        <td className="px-5 py-4">
                          <span className={`inline-flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-full border font-medium ${status.color}`}>
                            {status.icon}
                            {status.label}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          {order.status === "paid" && (
                            <a
                              href={cjUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 bg-[#1a1a1a] hover:bg-[#C9A84C] text-white text-[11px] tracking-wide px-3 py-2 rounded-lg transition-colors whitespace-nowrap"
                            >
                              <Package size={12} />
                              Fulfil →
                            </a>
                          )}
                          {order.status === "fulfilled" && order.trackingNumber && (
                            <span className="text-xs text-[#8a8178]">{order.trackingNumber}</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="mt-8 bg-[#1a1a1a] rounded-2xl p-6 text-[#8a8178] text-sm">
          <p className="text-[#C9A84C] text-xs tracking-[0.2em] uppercase mb-3">Comment traiter une commande</p>
          <ol className="flex flex-col gap-2 list-decimal list-inside text-sm">
            <li>Cliquez <strong className="text-white">Fulfil →</strong> sur la commande à traiter</li>
            <li>Sur CJdropshipping, trouvez votre produit et ajoutez-le au panier</li>
            <li>Lors de la commande, entrez l&apos;adresse du client indiquée ici</li>
            <li>CJdropshipping expédie directement chez votre client</li>
            <li>Mettez à jour le statut et le numéro de suivi ici</li>
          </ol>
        </div>
      </div>
    </main>
  );
}
