import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiShoppingBag, FiTruck, FiRefreshCw, FiStar } from "react-icons/fi";
import bannerImg from "../../../assets/images/banner/banner-model.jpg";
import { productAPI } from "../../../services/api";

const perks = [
  { icon: <FiTruck    size={16} />, label: "Free Shipping", sub: "Orders above ₹999" },
  { icon: <FiRefreshCw size={16} />, label: "Easy Returns",  sub: "7-day hassle-free"  },
  { icon: <FiStar     size={16} />, label: "4.9★ Rated",    sub: "By 2,400+ customers" },
];

const FeaturedBanner = () => {
  const [featured, setFeatured] = useState(null);

  useEffect(() => {
    productAPI.getAll({ sort: "rating", order: "desc", limit: 1 })
      .then((r) => setFeatured(r.products?.[0] || null))
      .catch(() => {});
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#0a0a0a]">
      {/* Grid texture */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.1) 1px,transparent 1px)", backgroundSize: "48px 48px" }} />

      <div className="relative z-10 mx-auto max-w-[1440px] px-6 py-24 lg:grid lg:grid-cols-2 lg:items-center lg:gap-0 lg:px-16 xl:px-20">

        {/* Left — text */}
        <div className="text-white">
          {/* eyebrow */}
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-orange-500" />
            <span className="text-[9px] font-bold uppercase tracking-[0.35em] text-white/70">
              Vedrix Exclusive
            </span>
          </div>

          {/* Heading */}
          <h2 className="mt-6 text-[clamp(3rem,6vw,5.5rem)] font-black leading-[0.9] tracking-[-0.03em]">
            Designed
            <br />
            for Every
            <br />
            <span className="text-white/20" style={{ WebkitTextStroke: "1.5px rgba(255,255,255,0.3)" }}>
              Day.
            </span>
          </h2>

          <p className="mt-6 max-w-sm text-[14px] leading-[1.9] text-white/45">
            Premium 400 GSM+ fabrics, dropped shoulder fits, and minimal details.
            Built for comfort, designed to outlast every season.
          </p>

          {/* Featured product chip */}
          {featured && (
            <div className="mt-6 inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
              {featured.image && (
                <img src={featured.image} alt={featured.name} className="h-10 w-10 rounded-xl object-cover" />
              )}
              <div>
                <p className="text-[12px] font-bold text-white">{featured.name}</p>
                <p className="text-[10px] text-white/40">
                  ₹{featured.price?.toLocaleString("en-IN")} · {featured.rating}★
                </p>
              </div>
            </div>
          )}

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/shop"
              className="group inline-flex items-center gap-2.5 rounded-full bg-white px-7 py-3.5 text-[12px] font-black uppercase tracking-[0.12em] text-black transition-all duration-300 hover:bg-orange-500 hover:text-white hover:-translate-y-0.5 hover:shadow-[0_20px_60px_rgba(249,115,22,0.3)]">
              <FiShoppingBag size={14} /> Shop Now
              <FiArrowRight size={12} className="transition group-hover:translate-x-1" />
            </Link>
            <Link to="/collections"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-7 py-3.5 text-[12px] font-bold uppercase tracking-[0.12em] text-white/65 transition-all duration-300 hover:border-white/35 hover:text-white hover:-translate-y-0.5">
              Collections <FiArrowRight size={12} />
            </Link>
          </div>

          {/* Perks */}
          <div className="mt-10 flex flex-wrap gap-6 border-t border-white/8 pt-8">
            {perks.map((p) => (
              <div key={p.label} className="flex items-center gap-2.5">
                <span className="text-white/30">{p.icon}</span>
                <div>
                  <p className="text-[12px] font-bold text-white/70">{p.label}</p>
                  <p className="text-[10px] text-white/30">{p.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — image */}
        <div className="mt-14 hidden lg:mt-0 lg:flex lg:items-end lg:justify-center lg:overflow-hidden">
          <div className="absolute h-[500px] w-[500px] rounded-full bg-orange-500/8 blur-[100px]" />
          <img
            src={bannerImg}
            alt="Vedrix Model"
            className="relative z-10 max-h-[700px] object-contain drop-shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturedBanner;
