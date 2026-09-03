import { FiStar } from "react-icons/fi";

const colorMap = {
  Black:  { bg: "bg-gray-900",  ring: "ring-gray-900"  },
  White:  { bg: "bg-white",     ring: "ring-gray-300"  },
  Blue:   { bg: "bg-[#3B6FBA]", ring: "ring-[#3B6FBA]" },
  Olive:  { bg: "bg-[#6B6B47]", ring: "ring-[#6B6B47]" },
  Beige:  { bg: "bg-[#D4C5A9]", ring: "ring-[#D4C5A9]" },
  Gray:   { bg: "bg-gray-400",  ring: "ring-gray-400"  },
};

const ProductInfo = ({ product }) => {
  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : null;

  const swatch = colorMap[product.color];

  return (
    <div className="space-y-2.5">
      {/* Category */}
      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-gray-400">
        {product.category}
      </p>

      {/* Name */}
      <h3 className="line-clamp-2 text-[15px] font-semibold leading-snug text-gray-900">
        {product.name}
      </h3>

      {/* Rating row */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <FiStar
              key={i}
              size={11}
              className={
                i < Math.round(product.rating)
                  ? "fill-gray-800 text-gray-800"
                  : "text-gray-300"
              }
            />
          ))}
        </div>
        <span className="text-xs text-gray-500">
          {product.rating} ({Math.floor(product.rating * 47)})
        </span>
      </div>

      {/* Color + sizes row */}
      <div className="flex items-center justify-between">
        {swatch && (
          <div className="flex items-center gap-1.5">
            <span
              title={product.color}
              className={`h-[14px] w-[14px] rounded-full border border-white ring-1 ${swatch.bg} ${swatch.ring}`}
            />
            <span className="text-[11px] text-gray-400">{product.color}</span>
          </div>
        )}
        {product.size && (
          <div className="flex items-center gap-1">
            {product.size.slice(0, 3).map((s) => (
              <span
                key={s}
                className="rounded border border-gray-200 px-1.5 py-0.5 text-[10px] font-medium text-gray-500"
              >
                {s}
              </span>
            ))}
            {product.size.length > 3 && (
              <span className="text-[10px] text-gray-400">+{product.size.length - 3}</span>
            )}
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="h-px w-full bg-gray-100" />

      {/* Price */}
      <div className="flex items-baseline gap-2">
        <span className="text-xl font-black text-gray-900">₹{product.price}</span>
        {product.oldPrice && (
          <>
            <span className="text-sm text-gray-400 line-through">₹{product.oldPrice}</span>
            <span className="text-xs font-semibold text-gray-500">{discount}% off</span>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductInfo;
