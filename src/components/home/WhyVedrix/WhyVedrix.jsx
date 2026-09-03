import {
  FiTruck, FiRefreshCw, FiShield, FiStar,
  FiPackage, FiHeart,
} from "react-icons/fi";

const features = [
  {
    icon: <FiTruck size={24} />,
    title: "Free Shipping",
    desc: "On all orders above ₹999. Delivered in 3–5 business days nationwide.",
  },
  {
    icon: <FiRefreshCw size={24} />,
    title: "Easy Returns",
    desc: "Not satisfied? Return within 7 days. No questions asked.",
  },
  {
    icon: <FiShield size={24} />,
    title: "Secure Payments",
    desc: "256-bit SSL encryption on every transaction. Shop with confidence.",
  },
  {
    icon: <FiStar size={24} />,
    title: "Premium Quality",
    desc: "400 GSM+ fabrics sourced locally. Stitched to last, not to fade.",
  },
  {
    icon: <FiPackage size={24} />,
    title: "Real-time Tracking",
    desc: "Track every order from warehouse to your doorstep, live.",
  },
  {
    icon: <FiHeart size={24} />,
    title: "Made in India",
    desc: "Every piece is designed and crafted in our Bangalore studio.",
  },
];

const WhyVedrix = () => {
  return (
    <section className="py-28 bg-[#f8f8f6]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16 text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">Our Promise</p>
          <h2 className="mt-4 text-5xl font-black tracking-tight text-gray-900">Why Vedrix?</h2>
          <p className="mx-auto mt-4 max-w-xl text-gray-500 leading-8">
            Every product, every order, every interaction — we obsess over the details.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-200 overflow-hidden rounded-[32px] shadow-sm">
          {features.map((f, i) => (
            <div
              key={i}
              className="group flex flex-col gap-5 bg-white p-8 transition-colors duration-300 hover:bg-gray-900"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100 text-gray-900 transition-all duration-300 group-hover:bg-white/10 group-hover:text-white">
                {f.icon}
              </div>
              <div>
                <h3 className="text-lg font-black text-gray-900 transition-colors duration-300 group-hover:text-white">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm leading-7 text-gray-500 transition-colors duration-300 group-hover:text-white/60">
                  {f.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyVedrix;
