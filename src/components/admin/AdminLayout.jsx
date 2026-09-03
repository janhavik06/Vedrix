import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  FiGrid, FiPackage, FiShoppingBag, FiUsers,
  FiLogOut, FiMenu, FiX, FiExternalLink,
} from "react-icons/fi";

const navItems = [
  { label: "Dashboard",  icon: <FiGrid size={18} />,        path: "/admin"          },
  { label: "Products",   icon: <FiPackage size={18} />,     path: "/admin/products" },
  { label: "Orders",     icon: <FiShoppingBag size={18} />, path: "/admin/orders"   },
  { label: "Customers",  icon: <FiUsers size={18} />,       path: "/admin/customers"},
];

const AdminLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const location         = useLocation();
  const navigate         = useNavigate();
  const [open, setOpen]  = useState(false);

  const handleLogout = () => { logout(); navigate("/"); };

  const Sidebar = ({ mobile = false }) => (
    <aside className={`${mobile ? "fixed inset-0 z-50 flex" : "hidden lg:flex"} flex-col`}>
      {mobile && (
        <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
      )}
      <div className={`relative flex h-full w-64 flex-col bg-black text-white ${mobile ? "" : ""}`}>
        {/* Logo */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
          <Link to="/" className="text-xl font-black tracking-[5px]">VEDRIX</Link>
          <span className="rounded-full bg-orange-500 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider">
            Admin
          </span>
        </div>

        {/* Nav */}
        <nav className="flex-1 space-y-1 px-4 py-5">
          {navItems.map((item) => {
            const active = item.path === "/admin"
              ? location.pathname === "/admin"
              : location.pathname.startsWith(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all ${
                  active
                    ? "bg-white text-black"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-white/10 p-4 space-y-2">
          <Link
            to="/"
            target="_blank"
            className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs text-white/50 transition hover:text-white"
          >
            <FiExternalLink size={14} /> View Store
          </Link>
          <div className="flex items-center gap-3 px-4 py-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 text-sm font-black">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="truncate text-xs font-semibold text-white">{user?.name}</p>
              <p className="truncate text-[10px] text-white/40">{user?.email}</p>
            </div>
            <button onClick={handleLogout} className="text-white/40 transition hover:text-red-400">
              <FiLogOut size={16} />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );

  return (
    <div className="flex min-h-screen bg-[#f7f7f5]">
      <Sidebar />
      {open && <Sidebar mobile />}

      {/* Main */}
      <div className="flex flex-1 flex-col lg:pl-64">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
          <button
            className="lg:hidden text-gray-500 hover:text-black transition"
            onClick={() => setOpen(true)}
          >
            <FiMenu size={22} />
          </button>
          <div className="hidden lg:block">
            <h1 className="text-sm font-semibold text-gray-500 capitalize">
              {navItems.find((n) =>
                n.path === "/admin"
                  ? location.pathname === "/admin"
                  : location.pathname.startsWith(n.path)
              )?.label || "Admin"}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">Welcome, <strong>{user?.name}</strong></span>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
