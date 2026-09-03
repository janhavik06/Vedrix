import { Navbar, Footer } from "../../components/layout";

const sections = [
  {
    title: "1. Information We Collect",
    body: `When you use Vedrix, we collect information you provide directly — such as your name, email address, phone number, shipping address, and payment details when you place an order. We also automatically collect certain data like your IP address, browser type, pages visited, and how you interact with our site to help us improve your experience.`,
  },
  {
    title: "2. How We Use Your Information",
    body: `We use your information to process and fulfil your orders, send order confirmations and shipping updates, respond to customer support queries, personalise your shopping experience, and send you promotional communications (only if you opt in). We never sell your personal data to third parties.`,
  },
  {
    title: "3. Sharing of Information",
    body: `We share your information only with trusted service providers who help us operate our business — such as payment processors, courier partners, and analytics providers. All third parties are bound by strict confidentiality agreements and may not use your data for their own purposes.`,
  },
  {
    title: "4. Cookies",
    body: `Vedrix uses cookies and similar tracking technologies to enhance your browsing experience, remember your preferences, and understand how visitors use our site. You can control cookie settings in your browser, though disabling them may affect site functionality.`,
  },
  {
    title: "5. Data Security",
    body: `We take reasonable technical and organisational measures to protect your personal data from unauthorised access, loss, or misuse. All payment transactions are encrypted using SSL technology. However, no method of transmission over the internet is 100% secure.`,
  },
  {
    title: "6. Data Retention",
    body: `We retain your personal data only for as long as necessary to fulfil the purposes outlined in this policy, comply with legal obligations, or resolve disputes. You may request deletion of your account data at any time by contacting support@vedrix.in.`,
  },
  {
    title: "7. Your Rights",
    body: `You have the right to access, correct, or delete your personal data. You may also object to processing, request data portability, or withdraw consent at any time. To exercise any of these rights, please email us at support@vedrix.in and we'll respond within 7 business days.`,
  },
  {
    title: "8. Children's Privacy",
    body: `Vedrix is not directed at children under the age of 13. We do not knowingly collect personal information from children. If we become aware that a child has provided us with personal data, we will delete it promptly.`,
  },
  {
    title: "9. Changes to This Policy",
    body: `We may update this Privacy Policy from time to time. When we do, we'll revise the "Last Updated" date below and, where appropriate, notify you by email or with a notice on our website.`,
  },
  {
    title: "10. Contact Us",
    body: `If you have any questions about this Privacy Policy or how we handle your data, please contact us at support@vedrix.in or write to us at: Vedrix, Koramangala, Bangalore, Karnataka – 560034.`,
  },
];

const PrivacyPolicy = () => {
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
            <h1 className="mt-6 text-5xl font-black">Privacy Policy</h1>
            <p className="mt-5 text-gray-400">
              Last Updated: July 2026 &nbsp;·&nbsp; Effective: July 2026
            </p>
          </div>
        </section>

        {/* Body */}
        <section className="mx-auto max-w-4xl px-6 py-16">
          <p className="mb-12 text-lg leading-8 text-gray-600">
            At Vedrix, your privacy matters. This policy explains what personal
            information we collect, how we use it, and the choices you have.
            Please read it carefully before using our website or placing an
            order.
          </p>

          <div className="space-y-10">
            {sections.map((s) => (
              <div key={s.title} className="rounded-3xl border bg-white p-8 shadow-sm">
                <h2 className="mb-4 text-xl font-bold">{s.title}</h2>
                <p className="leading-8 text-gray-600">{s.body}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
