import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Footer } from "../../components/layout";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import { useCart } from "../../context";
import { useAuth } from "../../context/AuthContext";
import { orderAPI, profileAPI } from "../../services/api";
import { FiCheckCircle, FiTruck, FiArrowLeft, FiShield } from "react-icons/fi";

/* ─── helpers ────────────────────────────────────── */

const emptyForm = {
  firstName: "",
  lastName: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
};

// keep the last 10 digits so "+91 98765 43210" becomes "9876543210"
const toPhone = (value) => value.replace(/\D/g, "").slice(-10);

const validate = (f) => {
  if (!f.firstName.trim() || !f.lastName.trim()) return "Enter your first and last name.";
  if (!/^[6-9]\d{9}$/.test(toPhone(f.phone))) return "Enter a valid 10-digit mobile number.";
  if (!f.address.trim()) return "Enter your delivery address.";
  if (!f.city.trim() || !f.state.trim()) return "Enter your city and state.";
  if (!/^\d{6}$/.test(f.pincode.trim())) return "Enter a valid 6-digit pincode.";
  return "";
};

const inr = (n) => Number(n || 0).toLocaleString("en-IN");

/* ─── order summary ──────────────────────────────── */

const OrderSummary = ({ cartItems, subtotal, shipping, total }) => (
  <aside className="sticky top-28 space-y-6">
    <div className="rounded-3xl border bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-xl font-bold">Order Summary</h2>

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
            const p = item.product;
            return (
              <div key={item.id} className="flex items-center gap-4 pt-4 first:pt-0">
                <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-gray-100">
                  {p?.image && (
                    <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">{p?.name}</p>
                  <p className="mt-0.5 text-xs text-gray-500">
                    {item.size && `Size: ${item.size}`}
                    {item.size && item.color && " · "}
                    {item.color && `Color: ${item.color}`}
                  </p>
                  <p className="mt-1 text-xs text-gray-400">Qty: {item.quantity}</p>
                </div>
                <p className="shrink-0 text-sm font-bold">
                  ₹{inr((p?.price || 0) * item.quantity)}
                </p>
              </div>
            );
          })
        )}
      </div>

      <div className="mt-6 space-y-3 border-t pt-5 text-sm">
        <div className="flex justify-between text-gray-500">
          <span>Subtotal</span>
          <span>₹{inr(subtotal)}</span>
        </div>
        <div className="flex justify-between text-gray-500">
          <span>Shipping</span>
          <span className={shipping === 0 ? "font-medium text-green-600" : ""}>
            {shipping === 0 ? "Free" : `₹${shipping}`}
          </span>
        </div>
        <div className="flex justify-between border-t pt-4 text-base font-black">
          <span>Total to pay on delivery</span>
          <span>₹{inr(total)}</span>
        </div>
      </div>
    </div>

    <div className="flex items-center gap-3 rounded-2xl border bg-white p-5 text-sm text-gray-600">
      <FiShield size={16} className="text-green-600" />
      Free delivery on orders above ₹999
    </div>
  </aside>
);

/* ─── main page ──────────────────────────────────── */

const Checkout = () => {
  const { user } = useAuth();
  const { cartItems, cartTotal, fetchCart } = useCart();

  const [addresses, setAddresses] = useState([]);
  const [selectedId, setSelectedId] = useState(null); // null = entering a new address
  const [form, setForm] = useState(emptyForm);
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState("");
  const [placedOrder, setPlacedOrder] = useState(null);

  // Load saved addresses (backend returns the default address first)
  useEffect(() => {
    if (!user) return;
    profileAPI
      .getAddresses()
      .then((res) => {
        const list = res.addresses || [];
        setAddresses(list);
        setSelectedId(list[0]?.id ?? null);
      })
      .catch(console.error);
  }, [user]);

  // Must match the backend rule in orderController.createOrder
  const subtotal = cartTotal || 0;
  const shipping = subtotal === 0 || subtotal >= 999 ? 0 : 99;
  const total = subtotal + shipping;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const placeOrder = async () => {
    setError("");

    if (cartItems.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    setPlacing(true);
    try {
      let addressId = selectedId;

      if (addressId === null) {
        const message = validate(form);
        if (message) {
          setError(message);
          return;
        }
        const res = await profileAPI.addAddress({
          ...form,
          phone: toPhone(form.phone),
          label: "Home",
          isDefault: addresses.length === 0,
        });
        // keep it selected so a retry doesn't save a duplicate
        setAddresses((prev) => [...prev, res.address]);
        setSelectedId(res.address.id);
        addressId = res.address.id;
      }

      const res = await orderAPI.create({ addressId });
      setPlacedOrder(res.order);
      fetchCart(); // the backend already emptied the cart; reload it
    } catch (err) {
      setError(err.message || "Could not place your order. Please try again.");
    } finally {
      setPlacing(false);
    }
  };

  /* ── Order success ── */
  if (placedOrder) {
    return (
      <>
        <Navbar />
        <main className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-6 py-20 pt-[72px] text-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-green-100 text-green-600">
            <FiCheckCircle size={48} />
          </div>
          <h1 className="mt-8 text-4xl font-black">Order placed</h1>
          <p className="mt-2 text-sm font-semibold text-gray-400">Order #{placedOrder.id}</p>
          <p className="mx-auto mt-5 max-w-md leading-8 text-gray-500">
            We'll deliver to{" "}
            <span className="font-semibold text-black">
              {placedOrder.address?.city || "your address"}
            </span>{" "}
            in <span className="font-semibold text-black">3–5 business days</span>. Keep the
            payment ready in cash.
          </p>
          <div className="mt-5 rounded-2xl bg-[#fafafa] px-8 py-4">
            <p className="text-sm text-gray-500">Pay on delivery</p>
            <p className="mt-1 text-3xl font-black">₹{inr(placedOrder.total)}</p>
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link to={`/orders/${placedOrder.id}`}>
              <Button variant="outline">View order</Button>
            </Link>
            <Link to="/shop">
              <Button>Continue shopping</Button>
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

      <main className="mx-auto max-w-7xl px-6 py-10 pt-[72px]">
        <div className="mb-10">
          <Link
            to="/cart"
            className="mb-3 inline-flex items-center gap-2 text-sm text-gray-500 transition hover:text-black"
          >
            <FiArrowLeft size={14} />
            Back to cart
          </Link>
          <h1 className="text-4xl font-black">Checkout</h1>
        </div>

        <div className="grid gap-10 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            {/* Delivery address */}
            <div className="rounded-3xl border bg-white p-8 shadow-sm">
              <h2 className="mb-6 text-2xl font-bold">Delivery address</h2>

              {addresses.length > 0 && (
                <div className="mb-6 space-y-3">
                  {addresses.map((a) => (
                    <label
                      key={a.id}
                      className={`flex cursor-pointer items-start gap-4 rounded-2xl border p-5 transition-all ${
                        selectedId === a.id ? "border-black bg-black/5" : "hover:border-gray-400"
                      }`}
                    >
                      <input
                        type="radio"
                        name="address"
                        checked={selectedId === a.id}
                        onChange={() => setSelectedId(a.id)}
                        className="mt-1 accent-black"
                      />
                      <div className="text-sm">
                        <p className="font-bold">
                          {a.firstName} {a.lastName}
                          <span className="ml-2 text-xs font-normal text-gray-400">{a.label}</span>
                        </p>
                        <p className="mt-1 text-gray-500">{a.address}</p>
                        <p className="text-gray-500">
                          {a.city}, {a.state} – {a.pincode}
                        </p>
                        <p className="text-gray-500">{a.phone}</p>
                      </div>
                    </label>
                  ))}

                  <label
                    className={`flex cursor-pointer items-center gap-4 rounded-2xl border p-5 transition-all ${
                      selectedId === null ? "border-black bg-black/5" : "hover:border-gray-400"
                    }`}
                  >
                    <input
                      type="radio"
                      name="address"
                      checked={selectedId === null}
                      onChange={() => setSelectedId(null)}
                      className="accent-black"
                    />
                    <span className="text-sm font-semibold">Use a new address</span>
                  </label>
                </div>
              )}

              {selectedId === null && (
                <div className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Input
                      label="First Name"
                      name="firstName"
                      value={form.firstName}
                      onChange={handleChange}
                    />
                    <Input
                      label="Last Name"
                      name="lastName"
                      value={form.lastName}
                      onChange={handleChange}
                    />
                  </div>
                  <Input
                    label="Mobile Number"
                    name="phone"
                    type="tel"
                    placeholder="98765 43210"
                    value={form.phone}
                    onChange={handleChange}
                  />
                  <Input
                    label="Address"
                    name="address"
                    placeholder="Flat / House No, Street, Area"
                    value={form.address}
                    onChange={handleChange}
                  />
                  <div className="grid gap-5 sm:grid-cols-3">
                    <Input label="City" name="city" value={form.city} onChange={handleChange} />
                    <Input label="State" name="state" value={form.state} onChange={handleChange} />
                    <Input
                      label="Pincode"
                      name="pincode"
                      placeholder="411018"
                      value={form.pincode}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Payment — COD only */}
            <div className="rounded-3xl border bg-white p-8 shadow-sm">
              <h2 className="mb-6 text-2xl font-bold">Payment</h2>
              <div className="flex items-start gap-4 rounded-2xl bg-orange-50 p-5">
                <FiTruck size={22} className="mt-0.5 shrink-0 text-orange-500" />
                <div>
                  <p className="font-semibold">Cash on Delivery</p>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Pay in cash when your order arrives. Please keep the exact amount ready.
                  </p>
                </div>
              </div>

              {error && (
                <p className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                  {error}
                </p>
              )}

              <div className="mt-8 flex justify-end">
                <Button size="lg" loading={placing} onClick={placeOrder}>
                  Place order · ₹{inr(total)}
                </Button>
              </div>
            </div>
          </div>

          <OrderSummary
            cartItems={cartItems}
            subtotal={subtotal}
            shipping={shipping}
            total={total}
          />
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Checkout;