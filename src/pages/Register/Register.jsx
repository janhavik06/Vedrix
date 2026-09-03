import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Footer } from "../../components/layout";
import { RegisterForm } from "../../components/auth";
import { useAuth } from "../../context";
import { FiStar, FiTruck, FiRefreshCw, FiGift } from "react-icons/fi";

const benefits = [
  { icon: <FiGift size={20} />,     title: "Welcome Offer",  desc: "₹200 off on your first order" },
  { icon: <FiTruck size={20} />,    title: "Free Shipping",  desc: "On all orders above ₹999" },
  { icon: <FiRefreshCw size={20} />,title: "Easy Returns",   desc: "Hassle-free 7-day returns" },
  { icon: <FiStar size={20} />,     title: "Early Access",   desc: "New drops before everyone else" },
];

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    name: "", email: "", password: "", confirmPassword: "",
  });
  const [error, setError]     = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match.");
    }
    if (formData.password.length < 6) {
      return setError("Password must be at least 6 characters.");
    }

    setLoading(true);
    try {
      await register(formData.name, formData.email, formData.password);
      navigate("/");
    } catch (err) {
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <main className="pt-[72px] flex flex-1">
        {/* Brand panel */}
        <aside className="relative hidden overflow-hidden bg-black lg:flex lg:w-1/2 xl:w-[45%]">
          <div className="pointer-events-none absolute -right-20 -top-20 h-[400px] w-[400px] rounded-full border border-white/5" />
          <div className="pointer-events-none absolute -bottom-32 left-10 h-[350px] w-[350px] rounded-full border border-orange-500/10" />
          <div className="relative z-10 flex flex-col justify-between p-14 text-white">
            <Link to="/" className="text-3xl font-black tracking-[6px] transition hover:text-orange-500">VEDRIX</Link>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[4px] text-orange-400">Join the Community</p>
              <h1 className="mt-5 text-5xl font-black leading-tight">
                Join 50,000+<br /><span className="text-orange-500">style-forward</span><br />shoppers.
              </h1>
              <p className="mt-6 max-w-sm text-lg leading-8 text-gray-400">
                Create your Vedrix account and unlock exclusive perks from day one.
              </p>
              <div className="mt-10 grid grid-cols-2 gap-4">
                {benefits.map((b) => (
                  <div key={b.title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500/20 text-orange-400">{b.icon}</div>
                    <p className="font-bold text-sm">{b.title}</p>
                    <p className="mt-0.5 text-xs text-gray-500">{b.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <p className="text-sm text-gray-600">© {new Date().getFullYear()} Vedrix. All Rights Reserved.</p>
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
            <RegisterForm formData={formData} onChange={handleChange} onSubmit={handleSubmit} loading={loading} />
            <p className="mt-8 text-center text-sm text-gray-500">
              Already have an account?{" "}
              <Link to="/login" className="font-semibold text-black underline-offset-2 hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Register;
