import { Link } from "react-router-dom";

const SeasonCard = ({ collection }) => {
  return (
    <Link
      to={`/collections/${collection.season.toLowerCase()}`}
      className="group overflow-hidden rounded-[30px] bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl"
    >
      <div className="overflow-hidden">
        <img
          src={collection.image}
          alt={collection.title}
          className="h-80 w-full object-cover transition duration-700 group-hover:scale-105"
        />
      </div>

      <div className="space-y-3 p-6">
        <span className="text-sm font-semibold uppercase tracking-[0.15em] text-neutral-500">
          {collection.season}
        </span>

        <h3 className="text-2xl font-bold text-neutral-900">
          {collection.title}
        </h3>

        <p className="leading-7 text-neutral-500">{collection.description}</p>

        <span className="inline-flex font-semibold text-black">Explore →</span>
      </div>
    </Link>
  );
};

export default SeasonCard;
