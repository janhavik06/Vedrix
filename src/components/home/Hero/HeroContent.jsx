import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiChevronDown } from "react-icons/fi";
import { productAPI } from "../../../services/api";

const HeroContent = () => {
  const [stats, setStats] = useState({ products: "...", customers: "50K+", rating: "4.9" });

  useEffect(() => {
    productAPI.getAll({ limit: 1 })
      .then((res) => {
        const total = res.pagination?.total || res.products?.length || 0;
        setStats((s) => ({ ...s, products: `${total}+` }));
      })
      .catch(() => setStats((s) => ({ ...s, products: "100+" })));
  }, []);

  return (
    <div className="flex h-full flex-col justify-center pb-16">
      {/* Eyebrow */}
      <div className="inline-flex items-center gap-2.5 self-start rounded-full border border-white/20 bg-white/10 px-4 py-1.5 backdrop-blur-md">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-orange-400" />
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/90">
          New Season Drop · Now Live
        </span>
      </div>

      {/* Main heading */}
      <h1 className="mt-6 text-[clamp(3.5rem,8vw,7rem)] font-black leading-[0.92] tracking-[-0.04em] text-white">
        Wear
        <br />
        Your
        <br />
        <span className="text-transparent"
          style={{ WebkitTextStroke: "2px rgba(255,255,255,0.4)" }}>
          Confidence
        </span>
        <span className="text-white">.</span>
      </h1>

      {/* Subtext */}
      <p className="mt-6 max-w-[380px] text-[15px] leading-[1.8] text-white/60">
        Premium oversized streetwear crafted for everyday comfort and timeless style.
      </p>

      {/* CTA buttons */}
      <div className="mt-8 flex flex-wrap items-center gap-4">
        <Link
          to="/shop"
          className="group inline-flex items-center gap-3 rounded-full bg-white px-7 py-3.5 text-[13px] font-bold uppercase tracking-[0.1em] text-gray-900 transition-all duration-300 hover:bg-orange-500 hover:text-white hover:shadow-[0_0_40px_rgba(249,115,22,0.4)] hover:-translate-y-0.5"
        >
          Shop Collection
          <FiArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
        </Link>
        <Link
          to="/new-arrivals"
          className="inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-3.5 text-[13px] font-bold uppercase tracking-[0.1em] text-white/80 backdrop-blur-sm transition-all duration-300 hover:border-white/60 hover:text-white hover:-translate-y-0.5"
        >
          New Arrivals
        </Link>
      </div>

      {/* Live stats row */}
      <div className="mt-12 flex items-center gap-8 border-t border-white/10 pt-8">
        {[
          { v: stats.customers,  l: "Happy Customers" },
          { v: stats.products,   l: "Products"        },
          { v: `${stats.rating}★`, l: "Avg Rating"    },
        ].map((s) => (
          <div key={s.l}>
            <p className="text-2xl font-black text-white">{s.v}</p>
            <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-widest text-white/40">
              {s.l}
            </p>
          </div>
        ))}
      </div>

      {/* Scroll hint */}
      <button
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
        className="mt-10 flex w-fit items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/30 transition hover:text-white/60"
      >
        <FiChevronDown size={14} className="animate-bounce" /> Scroll to explore
      </button>
    </div>
  );
};

export default HeroContent;
