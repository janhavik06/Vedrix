import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiShoppingBag } from "react-icons/fi";
import heroImg   from "../../../assets/images/hero/hero1.jpg";
import hero2Img  from "../../../assets/images/hero/hero2.jpg";
import { productAPI } from "../../../services/api";

const slides = [
  {
    image:    heroImg,
    eyebrow:  "New Season · SS 2026",
    heading1: "Dress",
    heading2: "Boldly.",
    sub:      "Premium oversized streetwear crafted for everyday confidence.",
    cta:      { label: "Shop Now",     to: "/shop"          },
    cta2:     { label: "New Arrivals", to: "/new-arrivals"  },
  },
  {
    image:    hero2Img,
    eyebrow:  "Limited Drop · Live Now",
    heading1: "Define",
    heading2: "Your Style.",
    sub:      "Exclusive hoodies, tees and more. Free shipping above ₹999.",
    cta:      { label: "Explore Drops",    to: "/new-arrivals" },
    cta2:     { label: "View Collections", to: "/collections"  },
  },
];

const ticker = [
  "Premium Streetwear", "New Season Drop", "Free Shipping ₹999+",
  "Easy 7-Day Returns", "50K+ Happy Customers", "Rated 4.9★",
  "100% Premium Cotton", "Made in India",
];

const Hero = () => {
  const [idx,     setIdx]     = useState(0);
  const [fading,  setFading]  = useState(false);
  const [stats,   setStats]   = useState({ total: 0, rating: "4.9", customers: "50K+" });

  /* Auto-slide */
  useEffect(() => {
    const t = setInterval(() => {
      setFading(true);
      setTimeout(() => { setIdx((i) => (i + 1) % slides.length); setFading(false); }, 500);
    }, 5500);
    return () => clearInterval(t);
  }, []);

  /* Live product count from API */
  useEffect(() => {
    productAPI.getAll({ limit: 1 })
      .then((r) => setStats((s) => ({ ...s, total: r.pagination?.total || r.products?.length || 0 })))
      .catch(() => {});
  }, []);

  const s = slides[idx];

  return (
    <>
      {/* ── Cinematic hero ── */}
      <section className="relative h-[100svh] min-h-[640px] overflow-hidden bg-black">

        {/* Background image — crossfade */}
        <img
          key={idx}
          src={s.image}
          alt="Vedrix"
          className={`absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-700 ${fading ? "opacity-0" : "opacity-100"}`}
        />

        {/* Layered gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

        {/* Content */}
        <div className={`relative z-10 mx-auto flex h-full max-w-[1440px] flex-col justify-center px-6 pb-24 pt-32 lg:px-16 xl:px-20 transition-all duration-500 ${fading ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"}`}>

          {/* Eyebrow pill */}
          <div className="mb-6 inline-flex w-fit items-center gap-2.5 rounded-full border border-white/15 bg-white/10 px-5 py-2 backdrop-blur-md">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-orange-400" />
            <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-white/80">
              {s.eyebrow}
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-[clamp(4rem,10vw,9rem)] font-black leading-[0.88] tracking-[-0.04em] text-white">
            {s.heading1}
            <br />
            <span className="text-white/20" style={{ WebkitTextStroke: "2px rgba(255,255,255,0.35)" }}>
              {s.heading2}
            </span>
          </h1>

          {/* Subtext */}
          <p className="mt-6 max-w-[420px] text-[15px] leading-[1.85] text-white/55">
            {s.sub}
          </p>

          {/* CTAs */}
          <div className="mt-9 flex flex-wrap gap-4">
            <Link to={s.cta.to}
              className="group inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-[13px] font-black uppercase tracking-[0.1em] text-black transition-all duration-300 hover:bg-orange-500 hover:text-white hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(249,115,22,0.35)]">
              <FiShoppingBag size={15} />
              {s.cta.label}
              <FiArrowRight size={13} className="transition group-hover:translate-x-1" />
            </Link>
            <Link to={s.cta2.to}
              className="inline-flex items-center rounded-full border border-white/25 px-8 py-4 text-[13px] font-bold uppercase tracking-[0.1em] text-white/75 backdrop-blur-sm transition-all duration-300 hover:border-white/50 hover:text-white hover:-translate-y-1">
              {s.cta2.label}
            </Link>
          </div>

          {/* Live stats */}
          <div className="mt-14 flex items-center gap-10 border-t border-white/10 pt-8">
            {[
              { v: stats.customers,                   l: "Happy Customers" },
              { v: stats.total > 0 ? `${stats.total}+` : "100+", l: "Products"        },
              { v: `${stats.rating}★`,                l: "Average Rating"  },
            ].map((st) => (
              <div key={st.l}>
                <p className="text-3xl font-black text-white">{st.v}</p>
                <p className="mt-0.5 text-[9px] font-bold uppercase tracking-[0.25em] text-white/35">{st.l}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Slide dots */}
        <div className="absolute bottom-10 left-1/2 z-20 flex -translate-x-1/2 gap-2.5">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => { setFading(true); setTimeout(() => { setIdx(i); setFading(false); }, 400); }}
              className={`h-1 rounded-full transition-all duration-500 ${i === idx ? "w-8 bg-white" : "w-2 bg-white/30"}`}
            />
          ))}
        </div>
      </section>

      {/* ── Marquee ticker ── */}
      <div className="overflow-hidden bg-[#0a0a0a] py-3">
        <div className="flex whitespace-nowrap" style={{ animation: "marquee 32s linear infinite" }}>
          {[...ticker, ...ticker, ...ticker].map((item, i) => (
            <span key={i} className="mx-10 inline-flex items-center gap-4 text-[9px] font-bold uppercase tracking-[0.35em] text-white/40">
              {item} <span className="text-orange-500/70">◆</span>
            </span>
          ))}
        </div>
      </div>
    </>
  );
};

export default Hero;
