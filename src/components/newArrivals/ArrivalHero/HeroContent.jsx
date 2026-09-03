import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiShoppingBag } from "react-icons/fi";
import { productAPI } from "../../../services/api";

const HeroContent = () => {
  const [total, setTotal] = useState(null);

  useEffect(() => {
    productAPI.getAll({ limit: 1 })
      .then((r) => setTotal(r.pagination?.total || r.products?.length || 0))
      .catch(() => {});
  }, []);

  return (
    <div className="max-w-[600px]">
      {/* Eyebrow pill */}
      <div className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/10 px-5 py-2 backdrop-blur-md">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-orange-400" />
        <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-white/80">
          New Season · Latest Drop
        </span>
      </div>

      {/* Heading */}
      <h1 className="mt-6 text-[clamp(2.8rem,7vw,5.5rem)] font-black leading-[0.92] tracking-[-0.03em] text-white">
        Discover
        <br />
        The Latest
        <br />
        <span className="text-white/25" style={{ WebkitTextStroke: "2px rgba(255,255,255,0.4)" }}>
          Arrivals.
        </span>
      </h1>

      {/* Subtext */}
      <p className="mt-5 max-w-[440px] text-[14px] leading-[1.85] text-white/60">
        Fresh styles crafted with premium fabrics and timeless silhouettes.
        {total !== null && (
          <span className="ml-1 font-semibold text-white/90">
            {total}+ pieces available now.
          </span>
        )}
      </p>

      {/* CTA buttons */}
      <div className="mt-8 flex flex-wrap items-center gap-4">
        <Link
          to="/shop"
          className="group inline-flex items-center gap-3 rounded-full bg-white px-7 py-3.5 text-[12px] font-black uppercase tracking-[0.1em] text-black transition-all duration-300 hover:bg-orange-500 hover:text-white hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(249,115,22,0.35)]"
        >
          <FiShoppingBag size={14} />
          Shop All
          <FiArrowRight size={13} className="transition group-hover:translate-x-1" />
        </Link>
        <Link
          to="/collections"
          className="inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-3.5 text-[12px] font-bold uppercase tracking-[0.1em] text-white/75 backdrop-blur-sm transition-all duration-300 hover:border-white/60 hover:text-white hover:-translate-y-0.5"
        >
          Collections
        </Link>
      </div>

      {/* Stats row */}
      <div className="mt-10 flex items-center gap-8 border-t border-white/10 pt-8">
        {[
          { v: total !== null ? `${total}+` : "100+", l: "Products"        },
          { v: "4.8★",                                l: "Avg Rating"      },
          { v: "Free",                                l: "Shipping ₹999+"  },
        ].map((s) => (
          <div key={s.l}>
            <p className="text-2xl font-black text-white">{s.v}</p>
            <p className="mt-0.5 text-[9px] font-bold uppercase tracking-[0.25em] text-white/35">
              {s.l}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroContent;
