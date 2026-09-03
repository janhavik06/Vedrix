import { Link } from "react-router-dom";
import { Navbar, Footer } from "../../components/layout";

const sections = [
  {
    title: "1. Acceptance of Terms",
    body: `By accessing or using the Vedrix website (vedrix.in), placing an order, or creating an account, you agree to be bound by these Terms & Conditions. If you do not agree, please do not use our website.`,
  },
  {
    title: "2. Eligibility",
    body: `You must be at least 18 years of age to use this website and make purchases. By using Vedrix, you represent and warrant that you meet this requirement. If you are under 18, please use the site only under the supervision of a parent or guardian.`,
  },
  {
    title: "3. Product Information",
    body: `We strive to display product descriptions, colours, and images as accurately as possible. However, we do not guarantee that product descriptions or other content are accurate, complete, or error-free. Colours may vary slightly depending on your screen calibration.`,
  },
  {
    title: "4. Pricing & Availability",
    body: `All prices are displayed in Indian Rupees (₹) and are inclusive of GST unless stated otherwise. We reserve the right to change prices at any time without notice. Product availability is subject to stock levels. We reserve the right to refuse or cancel any order if a pricing error has occurred.`,
  },
  {
    title: "5. Orders & Payment",
    body: `Placing an order constitutes an offer to purchase. We reserve the right to accept or decline any order. Full payment must be received before orders are processed. We accept Credit/Debit cards, UPI, and Cash on Delivery where available.`,
  },
  {
    title: "6. Shipping & Delivery",
    body: `We aim to dispatch orders within 1–2 business days. Estimated delivery is 3–5 business days across India. Vedrix is not responsible for delays caused by courier partners, natural events, or circumstances beyond our control. Please refer to our Shipping Policy for full details.`,
  },
  {
    title: "7. Returns & Refunds",
    body: `We offer a 7-day return window from the date of delivery for eligible products. Items must be unused, unwashed, with original tags intact. Refunds are processed within 5–7 business days after we receive and inspect the returned item. Please see our Returns Policy for complete terms.`,
  },
  {
    title: "8. Intellectual Property",
    body: `All content on this website — including text, graphics, logos, product images, and software — is the exclusive property of Vedrix or its content suppliers and is protected by applicable intellectual property laws. You may not reproduce, distribute, or use any content without our written permission.`,
  },
  {
    title: "9. User Accounts",
    body: `You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. Notify us immediately at support@vedrix.in if you suspect any unauthorised use of your account.`,
  },
  {
    title: "10. Limitation of Liability",
    body: `To the fullest extent permitted by law, Vedrix shall not be liable for any indirect, incidental, or consequential damages arising out of your use of — or inability to use — our website, products, or services. Our total liability in any matter shall not exceed the amount you paid for the relevant order.`,
  },
  {
    title: "11. Governing Law",
    body: `These Terms are governed by and construed in accordance with the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts of Bangalore, Karnataka.`,
  },
  {
    title: "12. Changes to Terms",
    body: `We reserve the right to modify these Terms at any time. Changes become effective upon posting. Continued use of the website after changes are posted constitutes your acceptance of the revised Terms.`,
  },
];

const Terms = () => {
  return (
    <>
      <Navbar />
      <main className="pt-[72px]">
        {/* Hero */}
        <section className="bg-black py-20 text-white">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <span className="inline-block rounded-full bg-white/10 px-5 py-2 text-xs font-semibold uppercase tracking-[4px] text-orange-400">
              Legal
            </span>
            <h1 className="mt-6 text-5xl font-black">Terms &amp; Conditions</h1>
            <p className="mt-5 text-gray-400">
              Last Updated: July 2026 &nbsp;·&nbsp; Please read carefully before using Vedrix.
            </p>
          </div>
        </section>

        {/* Body */}
        <section className="mx-auto max-w-4xl px-6 py-16">
          <p className="mb-12 text-lg leading-8 text-gray-600">
            These Terms &amp; Conditions govern your use of the Vedrix website and
            services. By accessing our site or placing an order, you agree to
            these terms in full.
          </p>

          <div className="space-y-8">
            {sections.map((s) => (
              <div key={s.title} className="rounded-3xl border bg-white p-8 shadow-sm">
                <h2 className="mb-4 text-xl font-bold">{s.title}</h2>
                <p className="leading-8 text-gray-600">{s.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-3xl bg-black p-8 text-white text-center">
            <p className="text-lg font-bold">Have questions about these Terms?</p>
            <p className="mt-3 text-gray-400">
              Contact us at{" "}
              <a href="mailto:support@vedrix.in" className="text-orange-400 underline">
                support@vedrix.in
              </a>{" "}
              and we'll be happy to clarify.
            </p>
            <Link
              to="/contact"
              className="mt-6 inline-block rounded-xl bg-orange-500 px-7 py-3 font-semibold transition hover:bg-orange-600"
            >
              Contact Us
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Terms;
