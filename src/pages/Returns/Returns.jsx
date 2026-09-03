import { Link } from "react-router-dom";
import { Navbar, Footer } from "../../components/layout";
import {
  FiRefreshCw,
  FiCheckCircle,
  FiXCircle,
  FiAlertCircle,
} from "react-icons/fi";

const steps = [
  {
    step: "01",
    title: "Initiate Return",
    desc: 'Log in to your account, go to "My Orders", select the item and click "Request Return". Or email us at returns@vedrix.in within 7 days of delivery.',
  },
  {
    step: "02",
    title: "Pack the Item",
    desc: "Pack the item securely in its original packaging with all tags intact. Include your order ID inside the package.",
  },
  {
    step: "03",
    title: "Ship it Back",
    desc: "Drop off the package at your nearest courier centre. We'll share the return address once your request is approved.",
  },
  {
    step: "04",
    title: "Refund Processed",
    desc: "After we receive and inspect the item, we'll process your refund within 5–7 business days to your original payment method.",
  },
];

const eligible = [
  "Item received in wrong size or colour",
  "Defective or damaged product",
  "Item not as described on the website",
  "Wrong item delivered",
];

const notEligible = [
  "Items returned after 7 days of delivery",
  "Washed, worn, or used items",
  "Items without original tags",
  "Sale or clearance items (marked as non-returnable)",
  "Accessories (caps, masks, belts) for hygiene reasons",
];

const faqs = [
  {
    q: "How long does a refund take?",
    a: "Refunds are processed within 5–7 business days after we inspect the returned item. It may take an additional 2–3 banking days to reflect in your account.",
  },
  {
    q: "Can I exchange instead of returning?",
    a: "Yes! You can request a size or colour exchange. Exchanges are subject to availability. If the requested variant is unavailable, a full refund will be issued.",
  },
  {
    q: "Who pays for return shipping?",
    a: "If the return is due to our error (wrong/defective item), we cover return shipping. For size/preference returns, the customer bears the shipping cost.",
  },
  {
    q: "What if I received a damaged product?",
    a: "Please take a photo and email us at returns@vedrix.in within 48 hours of delivery. We'll arrange a replacement or full refund with priority handling.",
  },
];

const Returns = () => {
  return (
    <>
      <Navbar />
      <main className="pt-[72px]">
        {/* Hero */}
        <section className="bg-black py-20 text-white">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <span className="inline-block rounded-full bg-white/10 px-5 py-2 text-xs font-semibold uppercase tracking-[4px] text-orange-400">
              Returns &amp; Refunds
            </span>
            <h1 className="mt-6 text-5xl font-black">Hassle-Free Returns</h1>
            <p className="mt-5 text-lg text-gray-300 leading-8">
              Not happy with your order? We've made returns simple —{" "}
              <span className="font-semibold text-orange-400">7 days, no questions asked</span>{" "}
              for eligible items.
            </p>
          </div>
        </section>

        {/* Steps */}
        <section className="bg-[#fafafa] py-20">
          <div className="mx-auto max-w-5xl px-6">
            <div className="mb-14 text-center">
              <p className="text-xs font-semibold uppercase tracking-[4px] text-gray-400">
                How It Works
              </p>
              <h2 className="mt-4 text-4xl font-black">Return in 4 Steps</h2>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((s) => (
                <div
                  key={s.step}
                  className="rounded-3xl border bg-white p-7 shadow-sm"
                >
                  <p className="text-5xl font-black text-orange-500/20">
                    {s.step}
                  </p>
                  <h3 className="mt-4 text-lg font-bold">{s.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-gray-500">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Eligible / Not Eligible */}
        <section className="mx-auto max-w-5xl px-6 py-16">
          <div className="grid gap-8 md:grid-cols-2">
            {/* Eligible */}
            <div className="rounded-3xl border bg-white p-8 shadow-sm">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-green-600">
                  <FiCheckCircle size={22} />
                </div>
                <h2 className="text-xl font-bold">Eligible for Return</h2>
              </div>
              <ul className="space-y-4">
                {eligible.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-gray-600">
                    <FiCheckCircle size={16} className="mt-0.5 shrink-0 text-green-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Not Eligible */}
            <div className="rounded-3xl border bg-white p-8 shadow-sm">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100 text-red-600">
                  <FiXCircle size={22} />
                </div>
                <h2 className="text-xl font-bold">Not Eligible for Return</h2>
              </div>
              <ul className="space-y-4">
                {notEligible.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-gray-600">
                    <FiXCircle size={16} className="mt-0.5 shrink-0 text-red-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Refund note */}
          <div className="mt-8 flex items-start gap-4 rounded-3xl border border-orange-200 bg-orange-50 p-7">
            <FiAlertCircle size={22} className="mt-0.5 shrink-0 text-orange-500" />
            <p className="text-sm leading-7 text-gray-700">
              <span className="font-bold">Return Window:</span> All return
              requests must be raised within{" "}
              <span className="font-bold">7 calendar days</span> of delivery. We
              are unable to process returns requested after this window.
            </p>
          </div>
        </section>

        {/* FAQs */}
        <section className="bg-[#fafafa] py-16">
          <div className="mx-auto max-w-4xl px-6">
            <div className="mb-12 text-center">
              <p className="text-xs font-semibold uppercase tracking-[4px] text-gray-400">
                Common Questions
              </p>
              <h2 className="mt-4 text-4xl font-black">Returns FAQ</h2>
            </div>

            <div className="space-y-5">
              {faqs.map((f) => (
                <div key={f.q} className="rounded-3xl border bg-white p-7 shadow-sm">
                  <p className="font-bold">{f.q}</p>
                  <p className="mt-3 text-sm leading-7 text-gray-600">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-black py-20 text-white">
          <div className="mx-auto max-w-2xl px-6 text-center">
            <FiRefreshCw size={40} className="mx-auto text-orange-500" />
            <h2 className="mt-6 text-4xl font-black">Need to Return Something?</h2>
            <p className="mx-auto mt-5 max-w-md text-gray-400 leading-8">
              Our support team is ready to help you. Reach out and we'll make it
              right — fast.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                href="mailto:returns@vedrix.in"
                className="rounded-xl bg-orange-500 px-7 py-3 font-semibold transition hover:bg-orange-600"
              >
                Email returns@vedrix.in
              </a>
              <Link
                to="/contact"
                className="rounded-xl border border-white px-7 py-3 font-semibold transition hover:bg-white hover:text-black"
              >
                Contact Support
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Returns;
