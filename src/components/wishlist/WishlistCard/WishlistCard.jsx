import { Link } from "react-router-dom";
import { FiShoppingCart, FiTrash2 } from "react-icons/fi";

const WishlistCard = ({ product, onRemove, onAddToCart }) => {
  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
      <img
        src={product.image}
        alt={product.name}
        className="h-72 w-full object-cover"
      />

      <div className="space-y-3 p-5">
        <h3 className="text-xl font-semibold">{product.name}</h3>

        <p className="text-lg font-bold">₹{product.price}</p>

        <div className="flex gap-3">
          <button
            onClick={() => onAddToCart(product)}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-black py-2 text-white"
          >
            <FiShoppingCart />
            Add to Cart
          </button>

          <button
            onClick={() => onRemove(product.id)}
            className="rounded-lg border p-3"
          >
            <FiTrash2 />
          </button>
        </div>

        <Link
          to={`/product/${product.id}`}
          className="block text-center text-blue-600"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default WishlistCard;
