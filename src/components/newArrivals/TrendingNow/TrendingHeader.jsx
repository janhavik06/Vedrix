import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

const TrendingHeader = () => {
  return (
    <div className="mb-10 flex flex-col gap-4 border-b border-gray-100 pb-10 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gray-400">
          Most Loved
        </p>
        <h2 className="mt-3 text-4xl font-black tracking-tight text-gray-900">
          Trending Now
        </h2>
        <p className="mt-3 max-w-lg text-sm leading-relaxed text-gray-500">
          Handpicked by our community. The styles everyone's wearing right now.
        </p>
      </div>
      <Link
        to="/shop"
        className="group inline-flex shrink-0 items-center gap-2 border border-gray-200 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.15em] text-gray-700 transition hover:border-gray-900 hover:bg-gray-900 hover:text-white"
      >
        Shop All
        <FiArrowRight size={13} className="transition group-hover:translate-x-0.5" />
      </Link>
    </div>
  );
};

export default TrendingHeader;
