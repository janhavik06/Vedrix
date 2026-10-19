import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Footer } from "../../components/layout";
import { LoginForm } from "../../components/auth";
import { useAuth } from "../../context";
import { FiCheckCircle } from "react-icons/fi";

const perks = [
  "Track orders in real-time",
  "Save wishlists across devices",
  "Exclusive member-only deals",
  "Faster checkout every time",
];

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { login } = useAuth();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await login(formData.email, formData.password);
      const from = location.state?.from?.pathname;
      navigate(from || (res.user?.role === "ADMIN" ? "/admin" : "/"), { replace: true });
    } catch (err) {
      setError(err.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <main className="pt-[72px] flex flex-1">
        {/* Brand panel */}
        <aside className="relative hidden overflow-hidden bg-black lg:flex lg:w-1/2 xl:w-[55%]">
          <div className="pointer-events-none absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full border border-white/5" />
          <div className="pointer-events-none absolute -bottom-40 -left-20 h-[400px] w-[400px] rounded-full border border-orange-500/10" />
          <div className="relative z-10 flex flex-col justify-between p-14 text-white">
            <Link to="/" className="text-3xl font-black tracking-[6px] transition hover:text-orange-500">
              VEDRIX
            </Link>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[4px] text-orange-400">Member Area</p>
              <h1 className="mt-5 text-5xl font-black leading-tight">
                Your style,<br /><span className="text-orange-500">your account.</span>
              </h1>
              <p className="mt-6 max-w-sm text-lg leading-8 text-gray-400">
                Sign in to access exclusive deals, track your orders, and manage your Vedrix experience.
              </p>
              <ul className="mt-10 space-y-4">
                {perks.map((perk) => (
                  <li key={perk} className="flex items-center gap-3 text-gray-300">
                    <FiCheckCircle size={18} className="shrink-0 text-orange-500" />
                    {perk}
                  </li>
                ))}
              </ul>
            </div>
            <p className="text-sm text-gray-600">"Dress how you want to be addressed."</p>
          </div>
        </aside>

        {/* Form panel */}
        <section className="flex flex-1 flex-col items-center justify-center bg-[#fafafa] px-6 py-16">
          <Link to="/" className="mb-10 text-2xl font-black tracking-[5px] lg:hidden">VEDRIX</Link>
          <div className="w-full max-w-md">
            {error && (
              <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}
            <LoginForm formData={formData} onChange={handleChange} onSubmit={handleSubmit} loading={loading} />
            <p className="mt-8 text-center text-sm text-gray-500">
              Don't have an account?{" "}
              <Link to="/register" className="font-semibold text-black underline-offset-2 hover:underline">
                Create one
              </Link>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
