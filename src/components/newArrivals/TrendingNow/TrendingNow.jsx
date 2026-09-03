import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import TrendingCard from "./TrendingCard";

const TrendingNow = ({ products = [] }) => {
  const items = products.slice(0, 4);
  if (!items.length) return null;

  return (
    <section className="pt-14 pb-4">
      {/* Header */}
      <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-gray-400">
            Most Loved
          </p>
          <h2 className="mt-2 text-4xl font-black tracking-tight text-gray-900">
            Trending Now
          </h2>
          <p className="mt-2 max-w-md text-[14px] leading-7 text-gray-500">
            Our highest-rated styles — loved by thousands of customers.
          </p>
        </div>
        <Link
          to="/shop"
          className="group inline-flex w-fit shrink-0 items-center gap-2 rounded-full border-2 border-gray-900 px-6 py-2.5 text-[12px] font-black uppercase tracking-[0.12em] text-gray-900 transition-all hover:bg-gray-900 hover:text-white"
        >
          Shop All
          <FiArrowRight size={13} className="transition group-hover:translate-x-0.5" />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
        {items.map((p, i) => (
          <TrendingCard key={p.id} product={p} rank={i + 1} />
        ))}
      </div>
    </section>
  );
};

export default TrendingNow;
