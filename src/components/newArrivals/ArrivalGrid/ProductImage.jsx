import { FiHeart } from "react-icons/fi";

const ProductImage = ({ product }) => {
  return (
    <div className="relative overflow-hidden bg-neutral-100">
      {product.isNew && (
        <span className="absolute left-4 top-4 z-10 rounded-full bg-black px-3 py-1 text-xs font-semibold text-white">
          NEW
        </span>
      )}

      <button className="absolute right-4 top-4 z-10 rounded-full bg-white p-2 shadow transition hover:scale-110">
        <FiHeart size={18} />
      </button>

      <img
        src={product.image}
        alt={product.name}
        className="aspect-[2/2] w-full object-cover transition duration-700 group-hover:scale-105"
      />
    </div>
  );
};

export default ProductImage;
