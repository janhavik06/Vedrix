import { Link } from "react-router-dom";

const CategoryCard = ({ category }) => {
  return (
    <Link
      to={category.link}
      className="group relative overflow-hidden rounded-2xl bg-gray-100"
    >
      {/* Image */}
      <div className="aspect-[2/3] overflow-hidden">
        <img
          src={category.image}
          alt={category.name}
          className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />

      {/* Label */}
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
        <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-white/60 mb-1">
          {category.subtitle}
        </p>
        <h3 className="text-[18px] font-black leading-tight tracking-tight">
          {category.name}
        </h3>
        <p className="mt-1.5 text-[10px] font-semibold uppercase tracking-widest text-white/50 opacity-0 transition-all duration-300 group-hover:opacity-100">
          Shop Now →
        </p>
      </div>
    </Link>
  );
};

export default CategoryCard;
