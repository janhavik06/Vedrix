import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

const CollectionCard = ({ collection }) => {
  return (
    <Link
      to={`/collections/${collection.slug}`}
      className="group relative overflow-hidden rounded-[36px]"
    >
      <img
        src={collection.image}
        alt={collection.title}
        className="h-[520px] w-full object-cover transition duration-700 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 p-10">
        <span className="rounded-full bg-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-white backdrop-blur-md">
          {collection.products} Products
        </span>

        <h3 className="mt-5 text-4xl font-black text-white">
          {collection.title}
        </h3>

        <p className="mt-3 max-w-md text-neutral-200">
          {collection.description}
        </p>

        <div className="mt-8 inline-flex items-center gap-3 font-semibold text-white">
          Explore Collection
          <FiArrowRight className="transition group-hover:translate-x-2" />
        </div>
      </div>
    </Link>
  );
};

export default CollectionCard;
