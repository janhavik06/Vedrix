import { useState } from "react";
import { FiShoppingBag, FiArrowRight, FiCheck } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useCart } from "../../../context/CartContext";
import { useAuth } from "../../../context/AuthContext";

const ProductActions = ({ product }) => {
  const { addToCart }   = useCart();
  const { user }        = useAuth();
  const [added, setAdded]     = useState(false);
  const [loading, setLoading] = useState(false);

  if (product.stock === false || product.stock === 0) {
    return (
      <div className="mt-4">
        <button
          disabled
          className="w-full border border-gray-200 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-gray-400 cursor-not-allowed"
        >
          Currently Unavailable
        </button>
      </div>
    );
  }

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!user) {
      window.location.href = "/login";
      return;
    }
    setLoading(true);
    try {
      await addToCart(product.id, 1);
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    } catch (err) {
      console.error("Add to cart:", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4 flex items-center gap-2.5">
      <button
        onClick={handleAdd}
        disabled={loading || added}
        className={`flex flex-1 items-center justify-center gap-2 border py-3 text-xs font-semibold uppercase tracking-[0.15em] transition-all duration-300 active:scale-95 disabled:opacity-70 ${
          added
            ? "border-green-600 bg-green-600 text-white"
            : "border-gray-900 bg-gray-900 text-white hover:bg-white hover:text-gray-900"
        }`}
      >
        {added ? (
          <><FiCheck size={13} /> Added!</>
        ) : loading ? (
          <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
        ) : (
          <><FiShoppingBag size={13} /> Add to Cart</>
        )}
      </button>

      <Link
        to={`/product/${product.id}`}
        className="flex h-[46px] w-[46px] shrink-0 items-center justify-center border border-gray-200 text-gray-500 transition-all duration-300 hover:border-gray-900 hover:bg-gray-900 hover:text-white"
      >
        <FiArrowRight size={15} />
      </Link>
    </div>
  );
};

export default ProductActions;
