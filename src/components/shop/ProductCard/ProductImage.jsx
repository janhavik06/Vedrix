import { useState } from "react";
import { FiHeart } from "react-icons/fi";

const ProductImage = ({ product }) => {
  const [wishlisted, setWishlisted] = useState(false);

  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : null;

  return (
    <div className="relative overflow-hidden bg-[#f5f5f3]">
      {/* Product image */}
      <img
        src={product.image}
        alt={product.name}
        className="h-[300px] w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />

      {/* Sold-out dim */}
      {product.stock === false && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/70">
          <span className="border border-gray-400 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-gray-600">
            Sold Out
          </span>
        </div>
      )}

      {/* Top-left: single clean label — only badge OR discount, never colourful */}
      {product.stock !== false && (
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {product.badge && (
            <span className="bg-white/90 backdrop-blur-sm px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-800">
              {product.badge}
            </span>
          )}
          {discount && (
            <span className="bg-black px-3 py-1 text-[10px] font-semibold tracking-wide text-white">
              −{discount}%
            </span>
          )}
        </div>
      )}

      {/* Wishlist — top right */}
      <button
        onClick={(e) => {
          e.preventDefault();
          setWishlisted(!wishlisted);
        }}
        className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-300 ${
          wishlisted
            ? "border-black bg-black text-white"
            : "border-white/60 bg-white/80 text-gray-600 backdrop-blur-sm hover:border-black hover:bg-black hover:text-white"
        }`}
      >
        <FiHeart size={15} className={wishlisted ? "fill-white" : ""} />
      </button>
    </div>
  );
};

export default ProductImage;
