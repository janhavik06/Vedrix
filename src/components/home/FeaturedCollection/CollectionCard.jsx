import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

const CollectionCard = ({ collection, index = 0 }) => {
  return (
    <div className="group relative overflow-hidden rounded-3xl bg-gray-100 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl">
      {/* Image */}
      <div className="overflow-hidden">
        <img
          src={collection.image}
          alt={collection.title}
          className="h-[460px] w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>

      {/* Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

      {/* Top right badge */}
      <div className="absolute right-5 top-5 rounded-full bg-white/15 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.3em] text-white backdrop-blur-sm">
        Vedrix Collection
      </div>

      {/* Bottom content */}
      <div className="absolute bottom-0 left-0 right-0 p-7 text-white">
        <h2 className="text-3xl font-black leading-tight tracking-tight">
          {collection.title}
        </h2>
        <p className="mt-2 text-sm text-gray-300 leading-6">
          {collection.description}
        </p>

        {/* CTA — slides up on hover */}
        <div className="mt-5 flex items-center justify-between">
          <Link
            to={collection.route}
            className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-black transition-all duration-300 hover:bg-orange-500 hover:text-white"
          >
            Shop Now
            <FiArrowRight />
          </Link>

          {/* Progress bar decoration */}
          <div className="hidden lg:block">
            <div className="h-1 w-24 overflow-hidden rounded-full bg-white/20">
              <div
                className="h-full rounded-full bg-orange-500 transition-all duration-700 group-hover:w-full"
                style={{ width: "33%" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionCard;
