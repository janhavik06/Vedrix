import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Footer } from "../../components/layout";
import { ProfileSidebar } from "../../components/profile";
import { orderAPI } from "../../services/api";
import { useAuth } from "../../context";
import { FiPackage, FiShoppingBag, FiChevronRight } from "react-icons/fi";

/* ── Status badge ─────────────────────────────────────────── */
const statusStyle = {
  PENDING:    "bg-yellow-50 text-yellow-700 border-yellow-200",
  CONFIRMED:  "bg-blue-50 text-blue-700 border-blue-200",
  PROCESSING: "bg-purple-50 text-purple-700 border-purple-200",
  SHIPPED:    "bg-indigo-50 text-indigo-700 border-indigo-200",
  DELIVERED:  "bg-green-50 text-green-700 border-green-200",
  CANCELLED:  "bg-red-50 text-red-600 border-red-200",
  REFUNDED:   "bg-gray-50 text-gray-600 border-gray-200",
};

const StatusBadge = ({ status }) => (
  <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider ${statusStyle[status] || "bg-gray-100 text-gray-600"}`}>
    {status}
  </span>
);

/* ── Order Card ───────────────────────────────────────────── */
const OrderCard = ({ order }) => {
  const firstItem = order.items?.[0];
  const date = new Date(order.createdAt).toLocaleDateString("en-IN", {
    day: "numeric", month: "short", year: "numeric",
  });

  return (
    <div className="rounded-3xl border bg-white p-6 shadow-sm transition hover:shadow-md">
      <div className="flex flex-col gap-5 md:flex-row md:items-center">
        {/* Image */}
        <div className="h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-gray-100">
          {firstItem?.image ? (
            <img src={firstItem.image} alt={firstItem.name} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <FiPackage size={28} className="text-gray-400" />
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 space-y-1.5">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <h3 className="font-bold text-lg leading-tight">
              {firstItem?.name}
              {order.items.length > 1 && (
                <span className="ml-2 text-sm font-normal text-gray-500">
                  +{order.items.length - 1} more
                </span>
              )}
            </h3>
            <StatusBadge status={order.status} />
          </div>
          <p className="text-xs text-gray-400 font-medium uppercase tracking-widest">
            Order #{order.id} &nbsp;·&nbsp; {date}
          </p>
          <p className="text-sm text-gray-500">
            {order.items.length} {order.items.length === 1 ? "item" : "items"} &nbsp;·&nbsp;
            Payment: {order.paymentMethod}
          </p>
          <p className="text-xl font-black mt-2">₹{order.total}</p>
        </div>

        {/* CTA */}
        <Link
          to={`/orders/${order.id}`}
          className="flex shrink-0 items-center gap-2 rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-semibold transition hover:border-black hover:bg-black hover:text-white"
        >
          View Details
          <FiChevronRight size={15} />
        </Link>
      </div>
    </div>
  );
};

/* ── Main Page ────────────────────────────────────────────── */
const Orders = () => {
  const { user } = useAuth();
  const [orders, setOrders]   = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { setLoading(false); return; }
    orderAPI
      .getMyOrders()
      .then((res) => setOrders(res.orders || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [user]);

  return (
    <>
      <Navbar />
      <main className="pt-[72px] mx-auto max-w-7xl px-6 py-10">
        <div className="grid gap-8 lg:grid-cols-4">
          <aside>
            <ProfileSidebar activeItem="orders" />
          </aside>

          <section className="space-y-6 lg:col-span-3">
            <h1 className="text-3xl font-black">My Orders</h1>

            {!user ? (
              <div className="rounded-3xl border bg-white p-12 text-center shadow-sm">
                <FiShoppingBag size={40} className="mx-auto text-gray-300" />
                <p className="mt-4 font-semibold text-gray-700">Please log in to view your orders.</p>
                <Link to="/login" className="mt-5 inline-block rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-500">
                  Login
                </Link>
              </div>
            ) : loading ? (
              <div className="py-20 text-center">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-black border-t-transparent" />
                <p className="mt-3 text-gray-500">Loading orders...</p>
              </div>
            ) : orders.length === 0 ? (
              <div className="rounded-3xl border bg-white p-12 text-center shadow-sm">
                <FiPackage size={40} className="mx-auto text-gray-300" />
                <p className="mt-4 text-xl font-bold">No orders yet</p>
                <p className="mt-2 text-gray-500">Once you place an order, it will appear here.</p>
                <Link to="/shop" className="mt-6 inline-block rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-500">
                  Start Shopping
                </Link>
              </div>
            ) : (
              orders.map((order) => <OrderCard key={order.id} order={order} />)
            )}
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Orders;
