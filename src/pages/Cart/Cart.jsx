import { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Footer } from "../../components/layout";
import { useCart } from "../../context";
import {
  FiShield, FiTruck, FiRefreshCw, FiArrowLeft,
  FiTag, FiPlus, FiMinus, FiTrash2, FiShoppingBag,
  FiLock, FiPackage,
} from "react-icons/fi";

/* ─────────────────────────────────────────────────────────── */
/* Cart item row — reads from API shape: item.product.xxx      */
/* ─────────────────────────────────────────────────────────── */
const CartItemRow = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const p = item.product; // API shape
  const atLimit = item.variant && item.quantity >= item.variant.stock;

  return (
    <div className="group flex flex-col gap-5 bg-white border border-gray-100 p-5 transition hover:border-gray-200 hover:shadow-sm md:flex-row md:items-start">
      {/* Image */}
      <div className="relative h-28 w-28 shrink-0 overflow-hidden bg-[#f5f5f3]">
        {p?.image ? (
          <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <FiPackage size={24} className="text-gray-300" />
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col gap-1.5">
        <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-gray-400">
          {p?.category?.name || ""}
        </p>
        <h3 className="text-base font-bold text-gray-900 leading-snug">{p?.name}</h3>

        {/* Variant chips */}
        <div className="flex flex-wrap gap-2 mt-1">
          {item.size && (
            <span className="border border-gray-200 px-2 py-0.5 text-[10px] font-medium text-gray-600">
              Size: {item.size}
            </span>
          )}
          {item.color && (
            <span className="border border-gray-200 px-2 py-0.5 text-[10px] font-medium text-gray-600">
              {item.color}
            </span>
          )}
        </div>

        {/* Mobile: price */}
        <p className="mt-2 text-lg font-black text-gray-900 md:hidden">
          ₹{(p?.price * item.quantity).toLocaleString("en-IN")}
        </p>
      </div>

      {/* Right side: qty + price + remove */}
      <div className="flex items-center justify-between gap-6 md:flex-col md:items-end md:justify-start">
        {/* Price — desktop */}
        <div className="hidden text-right md:block">
          <p className="text-lg font-black text-gray-900">
            ₹{(p?.price * item.quantity).toLocaleString("en-IN")}
          </p>
          {item.quantity > 1 && (
            <p className="text-xs text-gray-400">₹{p?.price} each</p>
          )}
        </div>

        {/* Qty control */}
        <div className="flex items-center border border-gray-200">
          <button
            onClick={() => { if (item.quantity > 1) updateQuantity(item.id, item.quantity - 1); }}
            disabled={item.quantity <= 1}
            className="flex h-9 w-9 items-center justify-center text-gray-500 transition hover:bg-gray-50 disabled:opacity-30"
          >
            <FiMinus size={13} />
          </button>
          <span className="w-9 text-center text-sm font-semibold">{item.quantity}</span>
          <button
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            disabled={atLimit}
            className="flex h-9 w-9 items-center justify-center text-gray-500 transition hover:bg-gray-50 disabled:opacity-30"
          >
            <FiPlus size={13} />
          </button>
        </div>

        {/* Remove */}
        <button
          onClick={() => removeFromCart(item.id)}
          className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-gray-400 transition hover:text-red-500"
        >
          <FiTrash2 size={13} />
          Remove
        </button>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────── */
/* Coupon row                                                   */
/* ─────────────────────────────────────────────────────────── */
const CouponRow = ({ coupon, setCoupon, couponInput, setCouponInput }) => {
  const apply = () => {
    const code = couponInput.trim().toUpperCase();
    if (code === "VEDRIX10" || code === "FIRST500") {
      setCoupon(code);
      setCouponInput("");
    }
  };

  return (
    <div className="border border-dashed border-gray-200 bg-[#fafafa] p-5">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
        Coupon Code
      </p>
      {coupon ? (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FiTag size={14} className="text-green-600" />
            <span className="text-sm font-bold text-green-700">{coupon} applied — ₹500 off</span>
          </div>
          <button onClick={() => setCoupon("")} className="text-[11px] font-semibold text-red-400 underline hover:text-red-600 transition">
            Remove
          </button>
        </div>
      ) : (
        <div className="flex gap-2">
          <input
            type="text"
            value={couponInput}
            onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
            placeholder="Enter coupon code"
            className="flex-1 border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-gray-900 transition"
          />
          <button
            onClick={apply}
            className="bg-gray-900 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.15em] text-white transition hover:bg-orange-500"
          >
            Apply
          </button>
        </div>
      )}
      <p className="mt-2.5 text-[10px] text-gray-400">
        Try: <span className="font-semibold">VEDRIX10</span> or <span className="font-semibold">FIRST500</span>
      </p>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────── */
/* Empty cart                                                   */
/* ─────────────────────────────────────────────────────────── */
const EmptyCartView = () => (
  <div className="flex flex-col items-center justify-center py-32 text-center">
    <div className="flex h-24 w-24 items-center justify-center border-2 border-dashed border-gray-200 text-gray-300">
      <FiShoppingBag size={40} />
    </div>
    <h2 className="mt-8 text-3xl font-black text-gray-900">Your cart is empty</h2>
    <p className="mt-3 text-sm text-gray-500 max-w-xs leading-relaxed">
      Looks like you haven't added anything yet. Browse our collection and find something you love.
    </p>
    <Link
      to="/shop"
      className="mt-8 inline-flex items-center gap-2 bg-black px-8 py-3.5 text-sm font-semibold uppercase tracking-[0.15em] text-white transition hover:bg-orange-500"
    >
      <FiShoppingBag size={15} />
      Start Shopping
    </Link>
  </div>
);

/* ─────────────────────────────────────────────────────────── */
/* Loading skeleton                                             */
/* ─────────────────────────────────────────────────────────── */
const CartSkeleton = () => (
  <div className="space-y-4">
    {[1, 2].map((i) => (
      <div key={i} className="flex gap-5 border border-gray-100 p-5">
        <div className="h-28 w-28 bg-gray-100 animate-pulse" />
        <div className="flex-1 space-y-3">
          <div className="h-3 w-24 bg-gray-100 animate-pulse" />
          <div className="h-4 w-48 bg-gray-100 animate-pulse" />
          <div className="h-3 w-32 bg-gray-100 animate-pulse" />
        </div>
      </div>
    ))}
  </div>
);

/* ─────────────────────────────────────────────────────────── */
/* Main page                                                    */
/* ─────────────────────────────────────────────────────────── */
const Cart = () => {
  const { cartItems, cartTotal, loading } = useCart();

  const [coupon, setCoupon] = useState("");
  const [couponInput, setCouponInput] = useState("");

  const subtotal = cartTotal || 0;
  const shipping = subtotal >= 999 ? 0 : subtotal > 0 ? 99 : 0;
  const discount = coupon ? 500 : 0;
  const total = subtotal + shipping - discount;

  return (
    <>
      <Navbar />

      {/* Page header */}
      <div className="border-b border-gray-100 bg-white py-8">
        <div className="mx-auto max-w-7xl px-6">
          <Link
            to="/shop"
            className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-gray-400 transition hover:text-gray-900"
          >
            <FiArrowLeft size={13} /> Continue Shopping
          </Link>
          <div className="flex items-end justify-between">
            <h1 className="text-4xl font-black tracking-tight text-gray-900">
              Shopping Cart
            </h1>
            {!loading && cartItems.length > 0 && (
              <span className="text-sm text-gray-500">
                <span className="font-bold text-gray-900">{cartItems.length}</span>{" "}
                {cartItems.length === 1 ? "item" : "items"}
              </span>
            )}
          </div>
        </div>
      </div>

      <main className="pt-[72px] mx-auto max-w-7xl px-6 py-10">
        {loading ? (
          <CartSkeleton />
        ) : cartItems.length === 0 ? (
          <EmptyCartView />
        ) : (
          <>
            {/* Free shipping progress */}
            {subtotal > 0 && subtotal < 999 && (
              <div className="mb-8 border border-gray-100 bg-[#fafafa] p-4">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-gray-500">
                    Add <strong className="text-gray-900">₹{999 - subtotal}</strong> more for free delivery
                  </span>
                  <span className="font-semibold text-gray-700">{Math.round((subtotal / 999) * 100)}%</span>
                </div>
                <div className="h-1 w-full bg-gray-200">
                  <div
                    className="h-full bg-gray-900 transition-all duration-500"
                    style={{ width: `${Math.min((subtotal / 999) * 100, 100)}%` }}
                  />
                </div>
              </div>
            )}
            {subtotal >= 999 && (
              <div className="mb-8 flex items-center gap-3 border border-green-100 bg-green-50 px-5 py-3">
                <FiTruck size={16} className="text-green-600 shrink-0" />
                <p className="text-sm font-semibold text-green-700">
                  You've unlocked free delivery!
                </p>
              </div>
            )}

            <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
              {/* Left — items */}
              <div className="space-y-8">
                {/* Column headers — desktop */}
                <div className="hidden border-b border-gray-100 pb-3 md:grid md:grid-cols-[1fr_auto] text-[9px] font-semibold uppercase tracking-[0.2em] text-gray-400">
                  <span>Product</span>
                  <span className="pr-24">Qty / Price</span>
                </div>

                {/* Items */}
                <div className="space-y-px">
                  {cartItems.map((item) => (
                    <CartItemRow key={item.id} item={item} />
                  ))}
                </div>

                {/* Coupon */}
                <CouponRow
                  coupon={coupon}
                  setCoupon={setCoupon}
                  couponInput={couponInput}
                  setCouponInput={setCouponInput}
                />
              </div>

              {/* Right — summary */}
              <aside className="space-y-4">
                {/* Order summary card */}
                <div className="border border-gray-100 bg-white p-6">
                  <h2 className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-gray-900">
                    Order Summary
                  </h2>

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal ({cartItems.length} items)</span>
                      <span>₹{subtotal.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Delivery</span>
                      <span className={shipping === 0 ? "font-semibold text-green-700" : ""}>
                        {shipping === 0 ? "Free" : `₹${shipping}`}
                      </span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-green-700">
                        <span>Coupon ({coupon})</span>
                        <span>− ₹{discount}</span>
                      </div>
                    )}
                  </div>

                  <div className="mt-5 flex justify-between border-t border-gray-100 pt-5">
                    <span className="text-sm font-black uppercase tracking-wide text-gray-900">
                      Total
                    </span>
                    <span className="text-xl font-black text-gray-900">
                      ₹{total.toLocaleString("en-IN")}
                    </span>
                  </div>

                  <Link to="/checkout">
                    <button className="mt-6 w-full bg-gray-900 py-4 text-xs font-bold uppercase tracking-[0.2em] text-white transition hover:bg-orange-500">
                      Proceed to Checkout
                    </button>
                  </Link>

                  {/* Secure note */}
                  <div className="mt-4 flex items-center justify-center gap-2 text-[10px] text-gray-400">
                    <FiLock size={11} /> Secure SSL encrypted checkout
                  </div>
                </div>

                {/* Trust badges */}
                <div className="border border-gray-100 bg-white divide-y divide-gray-50">
                  {[
                    { icon: <FiShield size={15} />, label: "Secure Checkout", note: "256-bit SSL encryption" },
                    { icon: <FiTruck size={15} />, label: "Free Delivery", note: "On orders above ₹999" },
                    { icon: <FiRefreshCw size={15} />, label: "Easy Returns", note: "7-day hassle-free returns" },
                  ].map((b) => (
                    <div key={b.label} className="flex items-center gap-4 px-5 py-4">
                      <span className="text-gray-400">{b.icon}</span>
                      <div>
                        <p className="text-xs font-semibold text-gray-800">{b.label}</p>
                        <p className="text-[10px] text-gray-400">{b.note}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Delivery estimate */}
                <div className="border border-dashed border-gray-200 p-4 text-xs text-gray-500">
                  <div className="flex items-start gap-2">
                    <FiTruck size={13} className="mt-0.5 shrink-0 text-gray-400" />
                    <p>
                      Order now — estimated delivery by{" "}
                      <strong className="text-gray-900">
                        {new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString("en-IN", {
                          weekday: "short", month: "short", day: "numeric",
                        })}
                      </strong>
                    </p>
                  </div>
                </div>
              </aside>
            </div>
          </>
        )}
      </main>

      <Footer />
    </>
  );
};

// Need useState import at top
export default Cart;
