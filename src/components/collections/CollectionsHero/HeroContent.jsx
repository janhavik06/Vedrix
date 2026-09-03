import { Link } from "react-router-dom";
import { FiArrowRight, FiShoppingBag } from "react-icons/fi";

const HeroContent = () => {
  return (
    <div className="max-w-2xl">
      {/* Eyebrow */}
      <div className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/10 px-5 py-2 backdrop-blur-md">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-orange-400" />
        <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-white/80">
          Curated Collections
        </span>
      </div>

      {/* Heading */}
      <h1 className="mt-6 text-[clamp(3rem,7vw,6rem)] font-black leading-[0.92] tracking-[-0.03em] text-white">
        Crafted
        <br />
        For Every
        <br />
        <span
          className="text-white/20"
          style={{ WebkitTextStroke: "2px rgba(255,255,255,0.35)" }}
        >
          Style.
        </span>
      </h1>

      {/* Sub */}
      <p className="mt-6 max-w-xl text-[15px] leading-[1.85] text-white/55">
        Explore exclusive collections thoughtfully curated for every season,
        every occasion, and every personality.
      </p>

      {/* CTAs */}
      <div className="mt-9 flex flex-wrap gap-4">
        <Link
          to="/shop"
          className="group inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-[13px] font-black uppercase tracking-[0.1em] text-black transition-all duration-300 hover:bg-orange-500 hover:text-white hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(249,115,22,0.35)]"
        >
          <FiShoppingBag size={14} />
          Shop Collection
          <FiArrowRight size={13} className="transition group-hover:translate-x-1" />
        </Link>
        <Link
          to="/new-arrivals"
          className="inline-flex items-center gap-2 rounded-full border border-white/25 px-8 py-4 text-[13px] font-bold uppercase tracking-[0.1em] text-white/75 backdrop-blur-sm transition-all duration-300 hover:border-white/50 hover:text-white hover:-translate-y-0.5"
        >
          New Arrivals
        </Link>
      </div>
    </div>
  );
};

export default HeroContent;
