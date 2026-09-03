import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Footer } from "../../components/layout";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import { useCart } from "../../context";
import { useAuth } from "../../context/AuthContext";
import { orderAPI } from "../../services/api";
import {
  FiCheckCircle,
  FiShield,
  FiTruck,
  FiArrowLeft,
  FiCreditCard,
  FiSmartphone,
  FiDollarSign,
  FiChevronRight,
  FiTag,
} from "react-icons/fi";

/* ─── static helpers ─────────────────────────────── */

const steps = ["Delivery", "Payment", "Review"];

const paymentMethods = [
  {
    id: "card",
    label: "Credit / Debit Card",
    icon: <FiCreditCard size={20} />,
  },
  { id: "upi", label: "UPI", icon: <FiSmartphone size={20} /> },
  { id: "cod", label: "Cash on Delivery", icon: <FiDollarSign size={20} /> },
];

const trustBadges = [
  { icon: <FiShield size={16} />, text: "Secure Checkout" },
  { icon: <FiTruck size={16} />, text: "Free Delivery above ₹999" },
  { icon: <FiCheckCircle size={16} />, text: "Easy 7-day Returns" },
];

/* ─── sub-components ─────────────────────────────── */

const StepBar = ({ current }) => (
  <div className="flex items-center gap-3">
    {steps.map((step, i) => {
      const done = i < current;
      const active = i === current;
      return (
        <div key={step} className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold transition-colors ${
                done
                  ? "bg-orange-500 text-white"
                  : active
                  ? "bg-black text-white"
                  : "bg-gray-100 text-gray-400"
              }`}
            >
              {done ? <FiCheckCircle size={16} /> : i + 1}
            </div>
            <span
              className={`text-sm font-semibold hidden sm:inline ${
                active ? "text-black" : done ? "text-orange-500" : "text-gray-400"
              }`}
            >
              {step}
            </span>
          </div>
          {i < steps.length - 1 && (
            <FiChevronRight size={16} className="text-gray-300" />
          )}
        </div>
      );
    })}
  </div>
);

const OrderSummary = ({ cartItems, subtotal, shipping, discount, total, coupon, setCoupon, couponInput, setCouponInput, applyCoupon }) => (
  <aside className="sticky top-28 space-y-6">
    <div className="rounded-3xl border bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-xl font-bold">Order Summary</h2>

      {/* items */}
      <div className="space-y-4 divide-y">
        {cartItems.length === 0 ? (
          <p className="py-4 text-center text-sm text-gray-400">
            Your cart is empty.{" "}
            <Link to="/shop" className="text-orange-500 underline">
              Shop now
            </Link>
          </p>
        ) : (
          cartItems.map((item) => {
            const p = item.product; // API shape: item.product.xxx
            return (
              <div key={item.id} className="flex items-center gap-4 pt-4 first:pt-0">
                <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-gray-100">
                  {p?.image && (
                    <img
                      src={p.image}
                      alt={p.name}
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="truncate font-semibold text-sm">{p?.name}</p>
                  <p className="mt-0.5 text-xs text-gray-500">
                    {item.size  && `Size: ${item.size}`}
                    {item.size  && item.color && " · "}
                    {item.color && `Color: ${item.color}`}
                  </p>
                  <p className="mt-1 text-xs text-gray-400">Qty: {item.quantity}</p>
                </div>
                <p className="shrink-0 font-bold text-sm">
                  ₹{((p?.price || 0) * item.quantity).toLocaleString("en-IN")}
                </p>
              </div>
            );
          })
        )}
      </div>

      {/* coupon */}
      <div className="mt-6">
        {coupon ? (
          <div className="flex items-center justify-between rounded-xl bg-green-50 px-4 py-3">
            <div className="flex items-center gap-2 text-green-700">
              <FiTag size={14} />
              <span className="text-sm font-semibold">{coupon} applied!</span>
            </div>
            <button
              onClick={() => setCoupon("")}
              className="text-xs text-red-500 underline"
            >
              Remove
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <input
              type="text"
              value={couponInput}
              onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
              placeholder="Coupon code"
              className="flex-1 rounded-xl border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-black"
            />
            <button
              onClick={applyCoupon}
              className="rounded-xl bg-black px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-500"
            >
              Apply
            </button>
          </div>
        )}
      </div>

      {/* totals */}
      <div className="mt-6 space-y-3 border-t pt-5 text-sm">
        <div className="flex justify-between text-gray-500">
          <span>Subtotal</span>
          <span>₹{subtotal}</span>
        </div>
        <div className="flex justify-between text-gray-500">
          <span>Shipping</span>
          <span className="text-green-600 font-medium">
            {shipping === 0 ? "Free" : `₹${shipping}`}
          </span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Discount</span>
            <span>− ₹{discount}</span>
          </div>
        )}
        <div className="flex justify-between border-t pt-4 text-base font-black">
          <span>Total</span>
          <span>₹{total}</span>
        </div>
      </div>
    </div>

    {/* trust badges */}
    <div className="rounded-2xl border bg-white p-5">
      <div className="space-y-3">
        {trustBadges.map((b) => (
          <div key={b.text} className="flex items-center gap-3 text-sm text-gray-600">
            <span className="text-green-600">{b.icon}</span>
            {b.text}
          </div>
        ))}
      </div>
    </div>
  </aside>
);

/* ─── main page ──────────────────────────────────── */

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, cartTotal } = useCart();
  const { user } = useAuth();

  const [step, setStep] = useState(0);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [loading, setLoading] = useState(false);
  const [couponInput, setCouponInput] = useState("");
  const [coupon, setCoupon] = useState("");

  const [delivery, setDelivery] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [payment, setPayment] = useState({ method: "card", upiId: "", cardNumber: "", cardExpiry: "", cardCvv: "" });

  const subtotal = cartTotal || 0;
  const shipping = subtotal >= 999 ? 0 : subtotal > 0 ? 99 : 0;
  const discount = coupon ? 500 : 0;
  const total    = subtotal + shipping - discount;

  const handleDeliveryChange = (e) =>
    setDelivery({ ...delivery, [e.target.name]: e.target.value });

  const applyCoupon = () => {
    if (couponInput === "VEDRIX10" || couponInput === "FIRST500") {
      setCoupon(couponInput);
      setCouponInput("");
    }
  };

  const placeOrder = async () => {
    if (!user) { navigate("/login"); return; }
    setLoading(true);
    try {
      await orderAPI.create({
        paymentMethod: payment.method.toUpperCase(),
        couponCode: coupon || undefined,
      });
      setOrderPlaced(true);
    } catch (err) {
      console.error("Order error:", err);
    } finally {
      setLoading(false);
    }
  };

  /* ── Order Success ── */
  if (orderPlaced) {
    return (
      <>
        <Navbar />
        <main className="pt-[72px] mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-6 py-20 text-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-green-100 text-green-600">
            <FiCheckCircle size={48} />
          </div>
          <h1 className="mt-8 text-4xl font-black">Order Placed!</h1>
          <p className="mx-auto mt-5 max-w-md text-gray-500 leading-8">
            Your order has been confirmed and will be delivered within{" "}
            <span className="font-semibold text-black">3–5 business days</span> to{" "}
            <span className="font-semibold text-black">
              {delivery.city || "your address"}
            </span>
            .
          </p>
          <div className="mt-5 rounded-2xl bg-[#fafafa] px-8 py-4">
            <p className="text-sm text-gray-500">Order Total</p>
            <p className="mt-1 text-3xl font-black">₹{total}</p>
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link to="/orders">
              <Button variant="outline">View My Orders</Button>
            </Link>
            <Link to="/shop">
              <Button>Continue Shopping</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="pt-[72px] mx-auto max-w-7xl px-6 py-10">
        {/* header */}
        <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link
              to="/cart"
              className="mb-3 inline-flex items-center gap-2 text-sm text-gray-500 transition hover:text-black"
            >
              <FiArrowLeft size={14} />
              Back to Cart
            </Link>
            <h1 className="text-4xl font-black">Checkout</h1>
          </div>
          <StepBar current={step} />
        </div>

        <div className="grid gap-10 lg:grid-cols-3">
          {/* ── Left: Steps ── */}
          <div className="space-y-6 lg:col-span-2">

            {/* STEP 0 — Delivery */}
            {step === 0 && (
              <div className="rounded-3xl border bg-white p-8 shadow-sm">
                <h2 className="mb-7 text-2xl font-bold">Delivery Details</h2>
                <div className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Input
                      label="First Name"
                      name="firstName"
                      placeholder="Aryan"
                      value={delivery.firstName}
                      onChange={handleDeliveryChange}
                    />
                    <Input
                      label="Last Name"
                      name="lastName"
                      placeholder="Mehta"
                      value={delivery.lastName}
                      onChange={handleDeliveryChange}
                    />
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Input
                      label="Phone Number"
                      name="phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={delivery.phone}
                      onChange={handleDeliveryChange}
                    />
                    <Input
                      label="Email Address"
                      name="email"
                      type="email"
                      placeholder="aryan@example.com"
                      value={delivery.email}
                      onChange={handleDeliveryChange}
                    />
                  </div>
                  <Input
                    label="Address Line"
                    name="address"
                    placeholder="Flat / House No, Street, Area"
                    value={delivery.address}
                    onChange={handleDeliveryChange}
                  />
                  <div className="grid gap-5 sm:grid-cols-3">
                    <Input
                      label="City"
                      name="city"
                      placeholder="Bangalore"
                      value={delivery.city}
                      onChange={handleDeliveryChange}
                    />
                    <Input
                      label="State"
                      name="state"
                      placeholder="Karnataka"
                      value={delivery.state}
                      onChange={handleDeliveryChange}
                    />
                    <Input
                      label="Pincode"
                      name="pincode"
                      placeholder="560001"
                      value={delivery.pincode}
                      onChange={handleDeliveryChange}
                    />
                  </div>
                </div>
                <div className="mt-8 flex justify-end">
                  <Button size="lg" rightIcon={<FiChevronRight size={18} />} onClick={() => setStep(1)}>
                    Continue to Payment
                  </Button>
                </div>
              </div>
            )}

            {/* STEP 1 — Payment */}
            {step === 1 && (
              <div className="rounded-3xl border bg-white p-8 shadow-sm">
                <h2 className="mb-7 text-2xl font-bold">Payment Method</h2>

                <div className="space-y-4">
                  {paymentMethods.map((m) => (
                    <label
                      key={m.id}
                      className={`flex cursor-pointer items-center gap-4 rounded-2xl border p-5 transition-all ${
                        payment.method === m.id
                          ? "border-black bg-black/5"
                          : "hover:border-gray-400"
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={m.id}
                        checked={payment.method === m.id}
                        onChange={() => setPayment({ ...payment, method: m.id })}
                        className="accent-black"
                      />
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100">
                        {m.icon}
                      </span>
                      <span className="font-semibold">{m.label}</span>
                    </label>
                  ))}
                </div>

                {/* Card fields */}
                {payment.method === "card" && (
                  <div className="mt-7 space-y-5 rounded-2xl border border-dashed p-6">
                    <Input
                      label="Card Number"
                      name="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={payment.cardNumber}
                      onChange={(e) => setPayment({ ...payment, cardNumber: e.target.value })}
                    />
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Input
                        label="Expiry Date"
                        name="cardExpiry"
                        placeholder="MM / YY"
                        value={payment.cardExpiry}
                        onChange={(e) => setPayment({ ...payment, cardExpiry: e.target.value })}
                      />
                      <Input
                        label="CVV"
                        name="cardCvv"
                        placeholder="•••"
                        value={payment.cardCvv}
                        onChange={(e) => setPayment({ ...payment, cardCvv: e.target.value })}
                      />
                    </div>
                  </div>
                )}

                {/* UPI field */}
                {payment.method === "upi" && (
                  <div className="mt-7 rounded-2xl border border-dashed p-6">
                    <Input
                      label="UPI ID"
                      name="upiId"
                      placeholder="yourname@upi"
                      value={payment.upiId}
                      onChange={(e) => setPayment({ ...payment, upiId: e.target.value })}
                    />
                  </div>
                )}

                {/* COD info */}
                {payment.method === "cod" && (
                  <div className="mt-7 flex items-start gap-4 rounded-2xl bg-orange-50 p-5">
                    <FiTruck size={22} className="mt-0.5 shrink-0 text-orange-500" />
                    <p className="text-sm text-gray-600 leading-6">
                      Pay in cash when your order is delivered. Please keep
                      exact change ready. COD charges of ₹40 may apply.
                    </p>
                  </div>
                )}

                <div className="mt-8 flex justify-between">
                  <Button variant="outline" onClick={() => setStep(0)} leftIcon={<FiArrowLeft size={16} />}>
                    Back
                  </Button>
                  <Button size="lg" rightIcon={<FiChevronRight size={18} />} onClick={() => setStep(2)}>
                    Review Order
                  </Button>
                </div>
              </div>
            )}

            {/* STEP 2 — Review */}
            {step === 2 && (
              <div className="rounded-3xl border bg-white p-8 shadow-sm space-y-8">
                <h2 className="text-2xl font-bold">Review Your Order</h2>

                {/* delivery summary */}
                <div className="rounded-2xl border p-5">
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
                      Delivery Address
                    </p>
                    <button onClick={() => setStep(0)} className="text-xs font-semibold text-orange-500 underline">
                      Edit
                    </button>
                  </div>
                  <p className="font-bold">
                    {delivery.firstName} {delivery.lastName}
                  </p>
                  <p className="mt-1 text-sm text-gray-500">{delivery.address}</p>
                  <p className="text-sm text-gray-500">
                    {delivery.city}, {delivery.state} – {delivery.pincode}
                  </p>
                  <p className="text-sm text-gray-500">{delivery.phone}</p>
                </div>

                {/* payment summary */}
                <div className="rounded-2xl border p-5">
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
                      Payment Method
                    </p>
                    <button onClick={() => setStep(1)} className="text-xs font-semibold text-orange-500 underline">
                      Edit
                    </button>
                  </div>
                  <p className="font-bold">
                    {paymentMethods.find((m) => m.id === payment.method)?.label}
                  </p>
                  {payment.method === "card" && payment.cardNumber && (
                    <p className="mt-1 text-sm text-gray-500">
                      Ending in {payment.cardNumber.slice(-4)}
                    </p>
                  )}
                  {payment.method === "upi" && payment.upiId && (
                    <p className="mt-1 text-sm text-gray-500">{payment.upiId}</p>
                  )}
                </div>

                {/* price breakdown */}
                <div className="rounded-2xl border p-5 text-sm">
                  <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-gray-400">
                    Price Breakdown
                  </p>
                  <div className="space-y-2 text-gray-600">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>₹{subtotal}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span className="text-green-600">
                        {shipping === 0 ? "Free" : `₹${shipping}`}
                      </span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Coupon ({coupon})</span>
                        <span>− ₹{discount}</span>
                      </div>
                    )}
                  </div>
                  <div className="mt-4 flex justify-between border-t pt-4 text-base font-black">
                    <span>Total Payable</span>
                    <span>₹{total}</span>
                  </div>
                </div>

                <div className="mt-2 flex justify-between">
                  <Button variant="outline" onClick={() => setStep(1)} leftIcon={<FiArrowLeft size={16} />}>
                    Back
                  </Button>
                  <Button size="lg" loading={loading} onClick={placeOrder}>
                    Place Order · ₹{total}
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* ── Right: Order Summary ── */}
          <OrderSummary
            cartItems={cartItems}
            subtotal={subtotal}
            shipping={shipping}
            discount={discount}
            total={total}
            coupon={coupon}
            setCoupon={setCoupon}
            couponInput={couponInput}
            setCouponInput={setCouponInput}
            applyCoupon={applyCoupon}
          />
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Checkout;
