import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiUser, FiPackage, FiHeart, FiLogOut,
  FiChevronDown, FiLogIn, FiSettings,
} from "react-icons/fi";
import { useAuth } from "../../../context/AuthContext";

const Item = ({ icon, label, to, onClick, red }) => {
  const cls = `flex w-full items-center gap-3 px-4 py-2.5 text-[13px] font-medium transition-colors
    ${red ? "text-red-500 hover:bg-red-50" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}`;
  return to ? (
    <Link to={to} onClick={onClick} className={cls}>{icon} {label}</Link>
  ) : (
    <button onClick={onClick} className={`${cls} text-left`}>{icon} {label}</button>
  );
};

const ProfileDropdown = ({ light = false }) => {
  const { user, logout } = useAuth();
  const navigate         = useNavigate();
  const [open, setOpen]  = useState(false);
  const ref              = useRef(null);

  useEffect(() => {
    const fn = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  const close       = () => setOpen(false);
  const handleLogout = () => { logout(); close(); navigate("/"); };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        aria-label="Account"
        className={`flex h-9 items-center gap-1.5 rounded-full border px-3 transition-all duration-300
          ${light
            ? "border-white/25 text-white/90 hover:bg-white/15 hover:text-white hover:border-white/40"
            : "border-gray-200 text-gray-700 hover:bg-gray-100 hover:border-gray-300"
          }`}
      >
        {user ? (
          <div className={`flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-black
            ${light ? "bg-white text-gray-900" : "bg-gray-900 text-white"}`}>
            {user.name?.charAt(0).toUpperCase()}
          </div>
        ) : (
          <FiUser size={16} />
        )}
        <FiChevronDown
          size={12}
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute right-0 top-[calc(100%+10px)] z-50 w-60 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.15)]">
          {!user ? (
            <div className="p-4">
              <p className="text-[13px] font-bold text-gray-900">Welcome to Vedrix</p>
              <p className="mt-0.5 text-xs text-gray-400">Sign in to access your account.</p>
              <div className="mt-4 flex gap-2">
                <Link to="/login" onClick={close}
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-gray-900 py-2.5 text-xs font-semibold text-white transition hover:bg-black">
                  <FiLogIn size={13} /> Sign In
                </Link>
                <Link to="/register" onClick={close}
                  className="flex flex-1 items-center justify-center rounded-xl border border-gray-200 py-2.5 text-xs font-semibold text-gray-700 transition hover:border-gray-900">
                  Register
                </Link>
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-3 border-b border-gray-50 bg-gray-50 px-4 py-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-900 text-sm font-black text-white">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-[13px] font-bold text-gray-900">{user.name}</p>
                  <p className="truncate text-[11px] text-gray-400">{user.email}</p>
                </div>
              </div>
              <div className="py-1">
                <Item icon={<FiUser size={14} />}    label="My Profile"  to="/profile"  onClick={close} />
                <Item icon={<FiPackage size={14} />} label="My Orders"   to="/orders"   onClick={close} />
                <Item icon={<FiHeart size={14} />}   label="Wishlist"    to="/wishlist" onClick={close} />
                {user.role === "ADMIN" && (
                  <Item icon={<FiSettings size={14} />} label="Admin Panel" to="/admin" onClick={close} />
                )}
              </div>
              <div className="border-t border-gray-50 py-1">
                <Item icon={<FiLogOut size={14} />} label="Sign Out" onClick={handleLogout} red />
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
