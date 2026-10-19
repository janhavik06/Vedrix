import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Navbar, Footer } from "../../components/layout";
import { orderAPI } from "../../services/api";
import { FiArrowLeft, FiPackage } from "react-icons/fi";

const statusStyle = {
  PENDING:    "bg-yellow-50 text-yellow-700 border-yellow-200",
  CONFIRMED:  "bg-blue-50 text-blue-700 border-blue-200",
  PROCESSING: "bg-purple-50 text-purple-700 border-purple-200",
  SHIPPED:    "bg-indigo-50 text-indigo-700 border-indigo-200",
  DELIVERED:  "bg-green-50 text-green-700 border-green-200",
  CANCELLED:  "bg-red-50 text-red-600 border-red-200",
  REFUNDED:   "bg-gray-50 text-gray-600 border-gray-200",
};

const inr = (n) => Number(n || 0).toLocaleString("en-IN");

// Prefer the address copied into the order; fall back to the linked address
const getAddress = (order) => {
  try {
    return order.shippingAddress ? JSON.parse(order.shippingAddress) : order.address;
  } catch {
    return order.address;
  }
};

const eventLabel = (e) => {
  if (e.field === "paymentStatus") {
    return e.toValue === "PAID" ? "Cash payment received" : `Payment ${e.toValue.toLowerCase()}`;
  }
  if (!e.fromValue) return "Order placed";
  return `Order ${e.toValue.toLowerCase()}`;
};

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    setLoading(true);
    orderAPI
      .getById(id)
      .then((res) => setOrder(res.order))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  const cancelOrder = async () => {
    if (!window.confirm("Cancel this order?")) return;
    setCancelling(true);
    setError("");
    try {
      const res = await orderAPI.cancel(id);
      setOrder((prev) => ({ ...prev, ...res.order }));
    } catch (err) {
      setError(err.message);
    } finally {
      setCancelling(false);
    }
  };

  const address = order ? getAddress(order) : null;
  const canCancel = order && ["PENDING", "CONFIRMED"].includes(order.status);

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-4xl px-6 py-10 pt-[72px]">
        <Link
          to="/orders"
          className="mb-4 inline-flex items-center gap-2 text-sm text-gray-500 transition hover:text-black"
        >
          <FiArrowLeft size={14} />
          My orders
        </Link>

        {loading ? (
          <div className="py-20 text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-black border-t-transparent" />
          </div>
        ) : !order ? (
          <p className="py-20 text-center text-gray-500">{error || "Order not found."}</p>
        ) : (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h1 className="text-3xl font-black">Order #{order.id}</h1>
                <p className="mt-1 text-sm text-gray-500">
                  Placed on{" "}
                  {new Date(order.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
              <span
                className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider ${
                  statusStyle[order.status] || "bg-gray-100 text-gray-600"
                }`}
              >
                {order.status}
              </span>
            </div>

            {error && (
              <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                {error}
              </p>
            )}

            {/* Items */}
            <div className="divide-y rounded-3xl border bg-white p-6 shadow-sm">
              {order.items?.map((item) => (
                <div key={item.id} className="flex items-center gap-4 py-4 first:pt-0 last:pb-0">
                  <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-gray-100">
                    {item.image ? (
                      <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <FiPackage size={24} className="text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <Link
                      to={`/product/${item.productId}`}
                      className="block truncate font-semibold hover:underline"
                    >
                      {item.name}
                    </Link>
                    <p className="mt-0.5 text-xs text-gray-500">
                      {item.size && `Size: ${item.size}`}
                      {item.size && item.color && " · "}
                      {item.color && `Color: ${item.color}`}
                    </p>
                    <p className="mt-1 text-xs text-gray-400">
                      Qty {item.quantity} × ₹{inr(item.price)}
                    </p>
                  </div>
                  <p className="shrink-0 font-bold">₹{inr(item.price * item.quantity)}</p>
                </div>
              ))}
            </div>

            {/* Timeline */}
            {order.history?.length > 0 && (
              <div className="rounded-3xl border bg-white p-6 shadow-sm">
                <h2 className="mb-4 font-bold">Order timeline</h2>
                <ol className="space-y-4 border-l border-gray-200 pl-5">
                  {order.history.map((e) => (
                    <li key={e.id} className="relative">
                      <span className="absolute -left-[26px] top-1.5 h-2.5 w-2.5 rounded-full bg-black" />
                      <p className="text-sm font-semibold">{eventLabel(e)}</p>
                      <p className="text-xs text-gray-400">
                        {new Date(e.createdAt).toLocaleString("en-IN", {
                          day: "numeric",
                          month: "short",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            <div className="grid gap-6 md:grid-cols-2">
              {/* Address */}
              <div className="rounded-3xl border bg-white p-6 shadow-sm">
                <h2 className="mb-3 font-bold">Delivery address</h2>
                {address ? (
                  <div className="space-y-0.5 text-sm text-gray-600">
                    <p className="font-semibold text-black">
                      {address.firstName} {address.lastName}
                    </p>
                    <p>{address.address}</p>
                    <p>
                      {address.city}, {address.state} – {address.pincode}
                    </p>
                    <p>{address.phone}</p>
                  </div>
                ) : (
                  <p className="text-sm text-gray-400">Address not available.</p>
                )}
              </div>

              {/* Payment */}
              <div className="rounded-3xl border bg-white p-6 shadow-sm">
                <h2 className="mb-3 font-bold">Payment</h2>
                <p className="mb-4 text-sm text-gray-600">
                  Cash on Delivery ·{" "}
                  <span className="font-semibold text-black">
                    {order.paymentStatus === "PAID" ? "Paid" : "Pay on delivery"}
                  </span>
                </p>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{inr(order.subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{order.shipping === 0 ? "Free" : `₹${inr(order.shipping)}`}</span>
                  </div>
                  <div className="flex justify-between border-t pt-3 text-base font-black text-black">
                    <span>Total</span>
                    <span>₹{inr(order.total)}</span>
                  </div>
                </div>
              </div>
            </div>

            {canCancel && (
              <div className="flex justify-end">
                <button
                  onClick={cancelOrder}
                  disabled={cancelling}
                  className="rounded-xl border border-red-200 px-6 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                >
                  {cancelling ? "Cancelling…" : "Cancel order"}
                </button>
              </div>
            )}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
};

export default OrderDetails;