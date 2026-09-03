import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout";
import { adminAPI } from "../../services/api";
import {
  FiPackage, FiShoppingBag, FiUsers, FiDollarSign,
  FiAlertTriangle, FiArrowRight,
} from "react-icons/fi";

/* ── helpers ── */
const statusColor = {
  PENDING:    "bg-yellow-100 text-yellow-700",
  CONFIRMED:  "bg-blue-100 text-blue-700",
  PROCESSING: "bg-purple-100 text-purple-700",
  SHIPPED:    "bg-indigo-100 text-indigo-700",
  DELIVERED:  "bg-green-100 text-green-700",
  CANCELLED:  "bg-red-100 text-red-600",
  REFUNDED:   "bg-gray-100 text-gray-600",
};

const StatCard = ({ icon, label, value, sub, color }) => (
  <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
    <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${color} text-white`}>
      {icon}
    </div>
    <p className="mt-4 text-3xl font-black text-gray-900">{value}</p>
    <p className="mt-1 text-sm font-semibold text-gray-700">{label}</p>
    {sub && <p className="mt-0.5 text-xs text-gray-400">{sub}</p>}
  </div>
);

const AdminDashboard = () => {
  const [stats,   setStats]   = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState("");

  useEffect(() => {
    adminAPI.getStats()
      .then((res) => setStats(res.stats))
      .catch((e)  => setError(e.message))
      .finally(()  => setLoading(false));
  }, []);

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-black text-gray-900">Dashboard</h2>
          <p className="mt-1 text-sm text-gray-500">Overview of your store performance.</p>
        </div>

        {loading ? (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-36 animate-pulse rounded-2xl bg-gray-100" />
            ))}
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-red-100 bg-red-50 p-6 text-sm text-red-600">
            {error} — make sure the backend is running.
          </div>
        ) : (
          <>
            {/* Stat cards */}
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              <StatCard
                icon={<FiDollarSign size={22} />}
                label="Total Revenue"
                value={`₹${stats.totalRevenue.toLocaleString("en-IN")}`}
                sub="Excl. cancelled orders"
                color="bg-orange-500"
              />
              <StatCard
                icon={<FiShoppingBag size={22} />}
                label="Total Orders"
                value={stats.totalOrders}
                sub="All time"
                color="bg-black"
              />
              <StatCard
                icon={<FiPackage size={22} />}
                label="Products"
                value={stats.totalProducts}
                sub="In catalogue"
                color="bg-blue-600"
              />
              <StatCard
                icon={<FiUsers size={22} />}
                label="Customers"
                value={stats.totalCustomers}
                sub="Registered users"
                color="bg-green-600"
              />
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              {/* Recent orders */}
              <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <div className="mb-5 flex items-center justify-between">
                  <h3 className="font-black text-gray-900">Recent Orders</h3>
                  <Link to="/admin/orders" className="flex items-center gap-1 text-xs font-semibold text-gray-500 transition hover:text-black">
                    View all <FiArrowRight size={12} />
                  </Link>
                </div>
                <div className="space-y-3">
                  {stats.recentOrders.length === 0 ? (
                    <p className="text-sm text-gray-400">No orders yet.</p>
                  ) : (
                    stats.recentOrders.map((order) => (
                      <div key={order.id} className="flex items-center justify-between rounded-xl border border-gray-100 px-4 py-3">
                        <div>
                          <p className="text-sm font-bold text-gray-900">#{order.id}</p>
                          <p className="text-xs text-gray-500">{order.user?.name} · {order.items.length} item(s)</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-black text-gray-900">₹{order.total}</p>
                          <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${statusColor[order.status] || "bg-gray-100 text-gray-600"}`}>
                            {order.status}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Low stock */}
              <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FiAlertTriangle size={16} className="text-orange-500" />
                    <h3 className="font-black text-gray-900">Low Stock</h3>
                  </div>
                  <Link to="/admin/products" className="flex items-center gap-1 text-xs font-semibold text-gray-500 transition hover:text-black">
                    Manage <FiArrowRight size={12} />
                  </Link>
                </div>
                <div className="space-y-3">
                  {stats.lowStockProducts.length === 0 ? (
                    <p className="text-sm text-green-600 font-semibold">All products are well stocked!</p>
                  ) : (
                    stats.lowStockProducts.map((p) => (
                      <div key={p.id} className="flex items-center justify-between rounded-xl border border-gray-100 px-4 py-3">
                        <div>
                          <p className="text-sm font-bold text-gray-900">{p.name}</p>
                          <p className="text-xs text-gray-500">{p.category?.name}</p>
                        </div>
                        <span className={`rounded-full px-3 py-1 text-xs font-bold ${p.stock === 0 ? "bg-red-100 text-red-600" : "bg-orange-100 text-orange-600"}`}>
                          {p.stock === 0 ? "Out of stock" : `${p.stock} left`}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
