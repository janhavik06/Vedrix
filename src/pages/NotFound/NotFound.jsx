import { Link } from "react-router-dom";
import { FiArrowLeft, FiShoppingBag, FiGrid, FiHome } from "react-icons/fi";

const quickLinks = [
  { label: "Home", to: "/", icon: <FiHome size={18} /> },
  { label: "Shop", to: "/shop", icon: <FiShoppingBag size={18} /> },
  { label: "Collections", to: "/collections", icon: <FiGrid size={18} /> },
];

const NotFound = () => {
  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden bg-black text-white">
      {/* decorative background text */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center text-[32vw] font-black leading-none text-white/[0.03] select-none"
      >
        404
      </span>

      {/* top bar */}
      <div className="relative z-10 flex items-center justify-between px-8 py-6">
        <Link
          to="/"
          className="text-2xl font-black tracking-[5px] text-white transition hover:text-orange-500"
        >
          VEDRIX
        </Link>
        <Link
          to="/"
          className="flex items-center gap-2 rounded-xl border border-white/20 px-5 py-2 text-sm font-medium transition hover:border-white hover:text-white text-gray-400"
        >
          <FiArrowLeft size={16} />
          Go Back
        </Link>
      </div>

      {/* main content */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 text-center">
        {/* 404 number */}
        <div className="relative">
          <p className="text-[140px] font-black leading-none tracking-tighter text-white md:text-[200px]">
            4
            <span className="text-orange-500">0</span>
            4
          </p>
          <div className="absolute -bottom-2 left-1/2 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-orange-500 to-transparent" />
        </div>

        {/* message */}
        <h1 className="mt-10 text-4xl font-black md:text-5xl">
          Page Not Found
        </h1>
        <p className="mx-auto mt-5 max-w-md text-lg leading-8 text-gray-400">
          Looks like this page took the day off. The URL might be wrong, or the
          page may have moved.
        </p>

        {/* quick links */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
          {quickLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="flex items-center gap-2 rounded-xl border border-white/20 px-6 py-3 font-medium text-gray-300 transition-all duration-300 hover:border-orange-500 hover:text-orange-500"
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
        </div>

        {/* primary CTA */}
        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-orange-500 px-8 py-4 font-semibold text-white transition-all duration-300 hover:bg-orange-600"
        >
          <FiHome size={18} />
          Back to Home
        </Link>
      </div>

      {/* bottom strip */}
      <div className="relative z-10 border-t border-white/10 px-8 py-5 text-center text-sm text-gray-600">
        © {new Date().getFullYear()} Vedrix. All Rights Reserved.
      </div>
    </main>
  );
};

export default NotFound;
