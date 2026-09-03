import { useState } from "react";
import { FiSend, FiCheckCircle, FiMail } from "react-icons/fi";

const NewsletterForm = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1000);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center rounded-3xl bg-white p-10 text-center shadow-2xl min-h-[280px]">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
          <FiCheckCircle size={34} />
        </div>
        <h3 className="mt-6 text-2xl font-black">You're in!</h3>
        <p className="mt-3 text-gray-500 leading-7 max-w-xs">
          Welcome to the Vedrix community. Expect early drops and exclusive
          deals straight to your inbox.
        </p>
        <button
          onClick={() => { setSubmitted(false); setEmail(""); }}
          className="mt-6 text-sm text-gray-400 underline hover:text-black transition"
        >
          Subscribe another email
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl bg-white p-8 shadow-2xl">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-500">
        <FiMail size={22} />
      </div>

      <h3 className="mt-5 text-3xl font-black leading-tight">
        Get Early Access
      </h3>
      <p className="mt-3 text-gray-500 leading-7 text-sm">
        Be the first to know about new drops, flash sales and exclusive
        member-only deals.
      </p>

      <div className="mt-7 flex overflow-hidden rounded-2xl border border-gray-200 focus-within:border-black transition-all">
        <input
          type="email"
          required
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 bg-transparent px-5 py-4 text-sm outline-none placeholder:text-gray-400"
        />
        <button
          type="submit"
          disabled={loading}
          className="flex shrink-0 items-center gap-2 bg-black px-5 py-4 text-sm font-semibold text-white transition hover:bg-orange-500 disabled:opacity-60"
        >
          {loading ? (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
          ) : (
            <FiSend size={16} />
          )}
        </button>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-gray-400">
        <span>✓ No spam, ever</span>
        <span>✓ Unsubscribe anytime</span>
        <span>✓ 50K+ subscribers</span>
      </div>
    </form>
  );
};

export default NewsletterForm;
