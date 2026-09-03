import { Link } from "react-router-dom";
import { FiTrendingUp } from "react-icons/fi";

const TrendingCard = ({ collection }) => {
  return (
    <Link
      to={`/collections/${collection.title.toLowerCase().replace(/\s+/g, "-")}`}
      className="group overflow-hidden rounded-[30px] border border-neutral-200 bg-white transition-all duration-500 hover:-translate-y-2 hover:shadow-xl"
    >
      <div className="overflow-hidden">
        <img
          src={collection.image}
          alt={collection.title}
          className="h-80 w-full object-cover transition duration-700 group-hover:scale-105"
        />
      </div>

      <div className="space-y-4 p-6">
        <div className="inline-flex items-center gap-2 rounded-full bg-black px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-white">
          <FiTrendingUp />
          Trending
        </div>

        <h3 className="text-2xl font-bold text-neutral-900">
          {collection.title}
        </h3>

        <p className="leading-7 text-neutral-500">{collection.description}</p>

        <span className="inline-flex font-semibold text-black">Discover →</span>
      </div>
    </Link>
  );
};

export default TrendingCard;
