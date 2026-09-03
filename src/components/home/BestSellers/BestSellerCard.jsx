import { FiArrowRight, FiStar, FiTrendingUp } from "react-icons/fi";
import { Link } from "react-router-dom";

const colorDots = ["bg-gray-900", "bg-stone-400", "bg-white border border-gray-300"];

const BestSellerCard = ({ product, index = 0 }) => {
  const oldPrice = Math.round(product.price * 1.25);
  const discount = Math.round(((oldPrice - product.price) / oldPrice) * 100);

  return (
    <div className="group flex flex-col md:flex-row overflow-hidden rounded-3xl bg-white shadow-sm transition-all duration-500 hover:shadow-xl hover:-translate-y-0.5 border border-gray-100">
      {/* Image */}
      <div className="relative md:w-72 overflow-hidden shrink-0">
        <img
          src={product.image}
          alt={product.name}
          className="h-72 w-full object-cover transition-transform duration-700 group-hover:scale-110 md:h-full"
        />
        {/* Rank badge */}
        <div className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-black text-sm font-black text-white shadow-lg">
          #{index + 1}
        </div>
        {/* Discount badge */}
        <div className="absolute right-4 top-4 rounded-full bg-orange-500 px-3 py-1 text-xs font-bold text-white">
          -{discount}%
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col justify-between p-7 md:p-8">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 rounded-full bg-orange-50 px-3 py-1 text-xs font-bold text-orange-600">
              <FiTrendingUp size={12} />
              Best Seller
            </span>
            <span className="text-xs text-gray-400 uppercase tracking-wider">{product.category}</span>
          </div>

          <h2 className="mt-4 text-3xl font-black leading-tight">{product.name}</h2>

          {/* Rating row */}
          <div className="mt-4 flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-1.5">
              <FiStar size={16} className="fill-yellow-400 text-yellow-400" />
              <span className="font-semibold">{product.rating}</span>
            </div>
            <span className="text-sm text-gray-400">{product.sold}</span>
          </div>

          {/* Color swatches */}
          <div className="mt-4 flex items-center gap-2">
            <span className="text-xs text-gray-400 uppercase tracking-wider mr-1">Colors:</span>
            {colorDots.map((c, i) => (
              <span key={i} className={`h-5 w-5 rounded-full cursor-pointer ring-offset-1 hover:ring-2 hover:ring-gray-400 transition ${c}`} />
            ))}
          </div>

          {/* Stock bar */}
          <div className="mt-5">
            <div className="flex items-center justify-between text-xs text-gray-400 mb-1.5">
              <span>Stock availability</span>
              <span className="font-semibold text-black">72% remaining</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
              <div className="h-full w-[72%] rounded-full bg-orange-500 transition-all duration-700 group-hover:w-[74%]" />
            </div>
          </div>
        </div>

        {/* Price + CTA */}
        <div className="mt-7 flex items-center justify-between">
          <div>
            <span className="text-4xl font-black">₹{product.price}</span>
            <span className="ml-3 text-lg text-gray-400 line-through">₹{oldPrice}</span>
          </div>
          <Link
            to={`/product/${product.id}`}
            className="flex items-center gap-2 rounded-xl bg-black px-6 py-3 font-semibold text-white transition-all duration-300 hover:bg-orange-500 hover:-translate-y-0.5"
          >
            View Product
            <FiArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BestSellerCard;
