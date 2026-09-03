import { useState } from "react";
import { Navbar, Footer } from "../../components/layout";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiClock,
  FiInstagram,
  FiTwitter,
  FiSend,
  FiCheckCircle,
} from "react-icons/fi";

/* ---------- static data ---------- */

const contactInfo = [
  {
    icon: <FiMail size={22} />,
    label: "Email Us",
    value: "support@vedrix.in",
    sub: "We reply within 24 hours",
  },
  {
    icon: <FiPhone size={22} />,
    label: "Call Us",
    value: "+91 98765 43210",
    sub: "Mon – Sat, 10 AM – 7 PM",
  },
  {
    icon: <FiMapPin size={22} />,
    label: "Studio",
    value: "Koramangala, Bangalore",
    sub: "Karnataka, India – 560034",
  },
  {
    icon: <FiClock size={22} />,
    label: "Support Hours",
    value: "Mon – Sat",
    sub: "10:00 AM to 7:00 PM IST",
  },
];

const faqs = [
  {
    q: "How long does delivery take?",
    a: "Orders are delivered within 3–5 business days across India.",
  },
  {
    q: "Can I return or exchange a product?",
    a: "Yes — we offer hassle-free returns within 7 days of delivery.",
  },
  {
    q: "Do you offer bulk / corporate orders?",
    a: "Absolutely. Email us at bulk@vedrix.in for custom quotes.",
  },
];

/* ---------- component ---------- */

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <>
      <Navbar />

      <main className="pt-[72px]">
        {/* ── Page Header ── */}
        <section className="bg-black py-24 text-white">
          <div className="mx-auto max-w-7xl px-6 text-center">
            <span className="inline-block rounded-full bg-white/10 px-5 py-2 text-xs font-semibold uppercase tracking-[4px] text-orange-400">
              Get in Touch
            </span>
            <h1 className="mt-6 text-6xl font-black leading-tight">
              We'd Love to
              <br />
              <span className="text-orange-500">Hear from You.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg text-gray-300 leading-8">
              Questions, feedback, collabs or just want to say hi — our team is
              always happy to chat.
            </p>
          </div>
        </section>

        {/* ── Split Layout ── */}
        <section className="mx-auto max-w-7xl px-6 py-20">
          <div className="grid gap-12 lg:grid-cols-5">

            {/* Left — Info Panel */}
            <aside className="space-y-8 lg:col-span-2">
              {/* Contact cards */}
              <div className="space-y-4">
                {contactInfo.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-start gap-5 rounded-2xl border bg-white p-5 shadow-sm"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-black text-white">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
                        {item.label}
                      </p>
                      <p className="mt-1 font-bold">{item.value}</p>
                      <p className="text-sm text-gray-500">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social links */}
              <div className="rounded-2xl bg-black p-7 text-white">
                <p className="text-xs font-semibold uppercase tracking-[4px] text-orange-400">
                  Follow Us
                </p>
                <p className="mt-3 text-lg font-bold">Stay in the loop</p>
                <p className="mt-2 text-sm text-gray-400 leading-6">
                  New drops, style inspo and behind-the-scenes — all on our
                  socials.
                </p>
                <div className="mt-5 flex gap-4">
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white transition hover:bg-orange-500"
                  >
                    <FiInstagram size={18} />
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white transition hover:bg-orange-500"
                  >
                    <FiTwitter size={18} />
                  </a>
                </div>
              </div>

              {/* FAQs */}
              <div>
                <p className="mb-5 text-xs font-semibold uppercase tracking-[4px] text-gray-400">
                  Quick Answers
                </p>
                <div className="space-y-4">
                  {faqs.map((faq) => (
                    <div key={faq.q} className="rounded-2xl border bg-white p-5 shadow-sm">
                      <p className="font-semibold">{faq.q}</p>
                      <p className="mt-2 text-sm text-gray-500 leading-6">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            </aside>

            {/* Right — Form */}
            <section className="lg:col-span-3">
              {submitted ? (
                <div className="flex h-full min-h-[520px] flex-col items-center justify-center rounded-3xl border bg-white p-12 shadow-sm text-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600">
                    <FiCheckCircle size={40} />
                  </div>
                  <h2 className="mt-8 text-3xl font-black">Message Sent!</h2>
                  <p className="mx-auto mt-4 max-w-sm text-gray-500 leading-7">
                    Thanks for reaching out. We'll get back to you at{" "}
                    <span className="font-semibold text-black">{formData.email}</span>{" "}
                    within 24 hours.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setFormData({ name: "", email: "", subject: "", message: "" }); }}
                    className="mt-8 rounded-xl border border-black px-6 py-3 font-semibold transition hover:bg-black hover:text-white"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="rounded-3xl border bg-white p-8 shadow-sm space-y-6 lg:p-10"
                >
                  <div>
                    <h2 className="text-3xl font-black">Send a Message</h2>
                    <p className="mt-2 text-gray-500">
                      Fill in the form and we'll get back to you shortly.
                    </p>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <Input
                      label="Full Name"
                      name="name"
                      placeholder="Aryan Mehta"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                    <Input
                      label="Email Address"
                      name="email"
                      type="email"
                      placeholder="aryan@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <Input
                    label="Subject"
                    name="subject"
                    placeholder="Order query / Feedback / Collab..."
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Message
                    </label>
                    <textarea
                      name="message"
                      rows={7}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us what's on your mind..."
                      className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-black"
                    />
                  </div>

                  <Button
                    type="submit"
                    loading={loading}
                    size="lg"
                    rightIcon={<FiSend size={18} />}
                    className="w-full sm:w-auto"
                  >
                    Send Message
                  </Button>
                </form>
              )}
            </section>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Contact;
