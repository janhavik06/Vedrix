import { Navbar, Footer } from "../../components/layout";
import {
  FiTruck,
  FiPackage,
  FiClock,
  FiMapPin,
  FiAlertCircle,
  FiCheckCircle,
} from "react-icons/fi";

const highlights = [
  {
    icon: <FiTruck size={26} />,
    title: "Free Delivery",
    desc: "On all orders above ₹999",
  },
  {
    icon: <FiClock size={26} />,
    title: "3–5 Business Days",
    desc: "Estimated delivery across India",
  },
  {
    icon: <FiPackage size={26} />,
    title: "Dispatch in 24–48 hrs",
    desc: "After order confirmation",
  },
  {
    icon: <FiMapPin size={26} />,
    title: "15+ Cities",
    desc: "Pan-India delivery network",
  },
];

const sections = [
  {
    title: "Order Processing",
    body: `Once your order is placed and payment is confirmed, our team processes it within 1–2 business days. You will receive an email confirmation with your order details. Orders placed after 5 PM IST or on public holidays will be processed the next business day.`,
  },
  {
    title: "Delivery Timelines",
    body: `Standard delivery takes 3–5 business days for metro cities (Bangalore, Mumbai, Delhi, Chennai, Hyderabad, Pune) and 5–7 business days for other locations across India. Delivery timelines are estimates and may vary due to unforeseen circumstances such as weather events or courier delays.`,
  },
  {
    title: "Shipping Charges",
    body: `We offer free shipping on all orders above ₹999. For orders below ₹999, a flat shipping fee of ₹99 is applied at checkout. Cash on Delivery orders may incur an additional handling fee of ₹40.`,
  },
  {
    title: "Order Tracking",
    body: `Once your order is dispatched, you will receive a shipping confirmation email with a tracking number and a link to track your shipment. You can also track your order from the "My Orders" section in your Vedrix account.`,
  },
  {
    title: "Delivery Attempts",
    body: `Our courier partner will attempt delivery up to 3 times. If delivery fails after 3 attempts, the package will be returned to our warehouse. In such cases, please contact support@vedrix.in to arrange re-delivery (additional shipping charges may apply).`,
  },
  {
    title: "Incorrect Address",
    body: `Please ensure your delivery address is complete and correct at checkout. Vedrix is not responsible for delayed or failed deliveries due to incorrect address information. If you need to change an address after placing an order, contact us immediately at support@vedrix.in — changes can only be made before dispatch.`,
  },
  {
    title: "Damaged or Lost Packages",
    body: `If your package arrives damaged or is lost in transit, please contact us within 48 hours of the expected delivery date. We will investigate with our courier partner and either replace the item or issue a full refund, at your preference.`,
  },
  {
    title: "Shipping Restrictions",
    body: `Currently, we only ship within India. International shipping is not available at this time but is on our roadmap. Some remote areas (beyond PIN serviceable zones) may experience longer delivery times.`,
  },
];

const ShippingPolicy = () => {
  return (
    <>
      <Navbar />
      <main className="pt-[72px]">
        {/* Hero */}
        <section className="bg-black py-20 text-white">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <span className="inline-block rounded-full bg-white/10 px-5 py-2 text-xs font-semibold uppercase tracking-[4px] text-orange-400">
              Shipping
            </span>
            <h1 className="mt-6 text-5xl font-black">Shipping Policy</h1>
            <p className="mt-5 text-gray-400">
              Everything you need to know about how we get your order to you.
            </p>
          </div>
        </section>

        {/* Highlights */}
        <section className="bg-[#fafafa] py-14">
          <div className="mx-auto grid max-w-5xl grid-cols-2 gap-5 px-6 md:grid-cols-4">
            {highlights.map((h) => (
              <div
                key={h.title}
                className="rounded-2xl border bg-white p-6 text-center shadow-sm"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-black text-white">
                  {h.icon}
                </div>
                <p className="font-bold">{h.title}</p>
                <p className="mt-1 text-sm text-gray-500">{h.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Body */}
        <section className="mx-auto max-w-4xl px-6 py-16">
          <div className="space-y-8">
            {sections.map((s) => (
              <div key={s.title} className="rounded-3xl border bg-white p-8 shadow-sm">
                <div className="mb-4 flex items-center gap-3">
                  <FiCheckCircle size={20} className="shrink-0 text-orange-500" />
                  <h2 className="text-xl font-bold">{s.title}</h2>
                </div>
                <p className="leading-8 text-gray-600">{s.body}</p>
              </div>
            ))}
          </div>

          {/* note */}
          <div className="mt-10 flex items-start gap-4 rounded-3xl border border-orange-200 bg-orange-50 p-7">
            <FiAlertCircle size={22} className="mt-0.5 shrink-0 text-orange-500" />
            <p className="text-sm leading-7 text-gray-700">
              <span className="font-bold">Note:</span> Delivery timelines may be
              affected during sale events, festive seasons, or unforeseen
              disruptions. We'll keep you informed via email if there are any
              significant delays on your order.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default ShippingPolicy;
