import { Fragment, useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { adminAPI } from "../../services/api";
import { FiSearch, FiShoppingBag, FiChevronDown } from "react-icons/fi";

const STATUS_OPTIONS = ["PENDING","CONFIRMED","PROCESSING","SHIPPED","DELIVERED","CANCELLED","REFUNDED"];

const statusStyle = {
  PENDING:    "bg-yellow-100 text-yellow-700",
  CONFIRMED:  "bg-blue-100 text-blue-700",
  PROCESSING: "bg-purple-100 text-purple-700",
  SHIPPED:    "bg-indigo-100 text-indigo-700",
  DELIVERED:  "bg-green-100 text-green-700",
  CANCELLED:  "bg-red-100 text-red-600",
  REFUNDED:   "bg-gray-100 text-gray-600",
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

const StatusBadge = ({ status }) => (
  <span className={`inline-block rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${statusStyle[status] || "bg-gray-100"}`}>
    {status}
  </span>
);

const AdminOrders = () => {
  const [orders,   setOrders]   = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [search,   setSearch]   = useState("");
  const [filter,   setFilter]   = useState("ALL");
  const [updating, setUpdating] = useState(null);
  const [expanded, setExpanded] = useState(null);
  const [error,    setError]    = useState("");

  const load = () => {
    setLoading(true);
    adminAPI.getOrders({ limit: 100 })
      .then((res) => setOrders(res.orders || []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  // data is { status } and/or { paymentStatus }
  const handleUpdate = async (orderId, data) => {
    if (data.status === "CANCELLED" &&
        !window.confirm("Cancel this order and return the items to stock?")) {
      return;
    }
    setUpdating(orderId);
    setError("");
    try {
      const res = await adminAPI.updateOrder(orderId, data);
      // merge so fields the update doesn't return (like the customer) are kept
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, ...res.order } : o))
      );
    } catch (err) {
      setError(err.message || "Could not update the order.");
    } finally {
      setUpdating(null);
    }
  };

  const filtered = orders.filter((o) => {
    const matchFilter = filter === "ALL" || o.status === filter;
    const matchSearch = !search ||
      o.id.toString().includes(search) ||
      o.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
      o.user?.email?.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-black text-gray-900">Orders</h2>
          <p className="mt-1 text-sm text-gray-500">{orders.length} total orders</p>
        </div>

        {error && (
          <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
            {error}
          </p>
        )}

        {/* Toolbar */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative max-w-sm flex-1">
            <FiSearch size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by order ID, customer..."
              className="w-full rounded-xl border border-gray-200 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-black"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {["ALL", ...STATUS_OPTIONS].map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`rounded-full px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider transition ${
                  filter === s ? "bg-black text-white" : "border border-gray-200 text-gray-500 hover:border-black"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-black border-t-transparent" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <FiShoppingBag size={36} className="text-gray-300" />
              <p className="mt-3 font-semibold text-gray-600">No orders found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    {["Order", "Customer", "Items", "Total", "Payment", "Status", "Date", "Update Status"].map((h) => (
                      <th key={h} className="whitespace-nowrap px-5 py-3 text-left text-[10px] font-bold uppercase tracking-[0.15em] text-gray-500">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filtered.map((order) => {
                    const address = getAddress(order);
                    const isOpen  = expanded === order.id;
                    const locked  = order.status === "CANCELLED";
                    const busy    = updating === order.id;

                    return (
                      <Fragment key={order.id}>
                        <tr className="transition hover:bg-gray-50">
                          <td className="px-5 py-4">
                            <button
                              onClick={() => setExpanded(isOpen ? null : order.id)}
                              className="flex items-center gap-1.5 font-black text-gray-900"
                            >
                              #{order.id}
                              <FiChevronDown
                                size={12}
                                className={`text-gray-400 transition ${isOpen ? "rotate-180" : ""}`}
                              />
                            </button>
                          </td>
                          <td className="px-5 py-4">
                            <p className="font-semibold text-gray-900">{order.user?.name}</p>
                            <p className="text-xs text-gray-400">{order.user?.email}</p>
                          </td>
                          <td className="px-5 py-4 text-gray-600">{order.items?.length || 0} item(s)</td>
                          <td className="px-5 py-4 font-black text-gray-900">₹{inr(order.total)}</td>
                          <td className="px-5 py-4 text-xs text-gray-600">
                            <p>{order.paymentMethod}</p>
                            {order.paymentStatus === "PAID" ? (
                              <p className="font-bold text-green-600">Paid</p>
                            ) : locked ? (
                              <p className="text-gray-400">Not collected</p>
                            ) : (
                              <>
                                <p className="text-gray-400">Pending</p>
                                <button
                                  onClick={() => handleUpdate(order.id, { paymentStatus: "PAID" })}
                                  disabled={busy}
                                  className="mt-0.5 font-semibold text-orange-500 underline disabled:opacity-50"
                                >
                                  Mark paid
                                </button>
                              </>
                            )}
                          </td>
                          <td className="px-5 py-4">
                            <StatusBadge status={order.status} />
                          </td>
                          <td className="whitespace-nowrap px-5 py-4 text-xs text-gray-500">
                            {new Date(order.createdAt).toLocaleDateString("en-IN", {
                              day: "numeric", month: "short", year: "numeric",
                            })}
                          </td>
                          <td className="px-5 py-4">
                            <div className="relative">
                              <select
                                value={order.status}
                                onChange={(e) => handleUpdate(order.id, { status: e.target.value })}
                                disabled={busy || locked}
                                className="w-full cursor-pointer appearance-none rounded-xl border border-gray-200 bg-white py-2 pl-3 pr-8 text-xs font-semibold text-gray-700 outline-none focus:border-black disabled:cursor-not-allowed disabled:opacity-50"
                              >
                                {STATUS_OPTIONS.map((s) => (
                                  <option key={s} value={s}>{s}</option>
                                ))}
                              </select>
                              <FiChevronDown size={12} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
                            </div>
                          </td>
                        </tr>

                        {isOpen && (
                          <tr className="bg-gray-50">
                            <td colSpan={8} className="px-5 py-5">
                              <div className="grid gap-8 md:grid-cols-3">
                                <div>
                                  <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.15em] text-gray-500">
                                    Deliver to
                                  </p>
                                  {address ? (
                                    <div className="space-y-0.5 text-sm text-gray-700">
                                      <p className="font-semibold text-gray-900">
                                        {address.firstName} {address.lastName}
                                      </p>
                                      <p>{address.address}</p>
                                      <p>{address.city}, {address.state} – {address.pincode}</p>
                                      <p className="font-semibold">Phone: {address.phone}</p>
                                    </div>
                                  ) : (
                                    <p className="text-sm text-gray-400">No address saved for this order.</p>
                                  )}
                                </div>

                                <div>
                                  <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.15em] text-gray-500">
                                    Items to pack
                                  </p>
                                  <ul className="space-y-1.5 text-sm text-gray-700">
                                    {order.items?.map((item) => (
                                      <li key={item.id} className="flex justify-between gap-4">
                                        <span>
                                          {item.name}
                                          {(item.size || item.color) && (
                                            <span className="text-gray-400">
                                              {" "}({[item.size, item.color].filter(Boolean).join(", ")})
                                            </span>
                                          )}
                                          <span className="text-gray-400"> × {item.quantity}</span>
                                        </span>
                                        <span className="font-semibold">₹{inr(item.price * item.quantity)}</span>
                                      </li>
                                    ))}
                                  </ul>
                                  <p className="mt-3 border-t pt-2 text-sm font-black text-gray-900">
                                    Collect ₹{inr(order.total)} in cash
                                  </p>
                                </div>

                                <div>
                                  <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.15em] text-gray-500">
                                    History
                                  </p>
                                  <ul className="space-y-2 text-xs text-gray-600">
                                    {order.history?.map((e) => (
                                      <li key={e.id}>
                                        <span className="font-semibold text-gray-900">
                                          {e.field === "paymentStatus" ? "Payment" : "Status"}:{" "}
                                          {e.fromValue ? `${e.fromValue} → ${e.toValue}` : e.toValue}
                                        </span>
                                        <br />
                                        {e.changedBy?.name || "System"} ·{" "}
                                        {new Date(e.createdAt).toLocaleString("en-IN", {
                                          day: "numeric",
                                          month: "short",
                                          hour: "2-digit",
                                          minute: "2-digit",
                                        })}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminOrders;