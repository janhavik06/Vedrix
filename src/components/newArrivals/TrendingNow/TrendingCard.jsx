import { useState } from "react";
import { Link } from "react-router-dom";
import { FiHeart, FiStar, FiArrowRight, FiShoppingBag, FiCheck } from "react-icons/fi";
import { useCart }     from "../../../context/CartContext";
import { useWishlist } from "../../../context/WishlistContext";
import { useAuth }     from "../../../context/AuthContext";

const TrendingCard = ({ product, rank = 1 }) => {
  const { addToCart }                                       = useCart();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { user }                                            = useAuth();

  const [loading,  setLoading]  = useState(false);
  const [added,    setAdded]    = useState(false);
  const [hovering, setHovering] = useState(false);

  const inWishlist = isInWishlist(product.id);
  const discount   = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : null;

  const handleCart = async (e) => {
    e.preventDefault();
    if (!user) { window.location.href = "/login"; return; }
    setLoading(true);
    try {
      await addToCart(product.id, 1);
      setAdded(true);
      setTimeout(() => setAdded(false), 2500);
    } catch { /* noop */ }
    finally { setLoading(false); }
  };

  const handleWishlist = async () => {
    if (!user) { window.location.href = "/login"; return; }
    if (inWishlist) await removeFromWishlist(product.id);
    else            await addToWishlist(product.id);
  };

  return (
    <div
      className="group relative flex flex-col"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {/* Image */}
      <div className="relative overflow-hidden rounded-xl bg-[#f0efed]">
        {/* Rank badge */}
        <div className="absolute left-2.5 top-2.5 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-[11px] font-black text-gray-900 shadow backdrop-blur-sm">
          {rank}
        </div>

        {/* Discount */}
        {discount && (
          <span className="absolute right-2.5 top-2.5 z-10 bg-[#ff3f6c] px-2.5 py-0.5 text-[9px] font-bold text-white shadow-sm">
            {discount}% OFF
          </span>
        )}

        {/* Wishlist */}
        <button
          onClick={handleWishlist}
          className={`absolute bottom-2.5 right-2.5 z-10 flex h-8 w-8 items-center justify-center rounded-full border shadow-sm transition-all duration-200
            ${inWishlist
              ? "border-pink-400 bg-pink-50 text-pink-500"
              : "border-white/70 bg-white/80 text-gray-500 backdrop-blur-sm hover:border-pink-400 hover:text-pink-500"
            }`}
        >
          <FiHeart size={14} className={inWishlist ? "fill-pink-500" : ""} />
        </button>

        <Link to={`/product/${product.id}`}>
          <img
            src={product.image || ""}
            alt={product.name}
            className={`aspect-square w-full object-cover object-center transition-transform duration-700 ${hovering ? "scale-[1.04]" : "scale-100"}`}
          />
        </Link>

        {/* Slide-up action */}
        <div className={`absolute inset-x-0 bottom-0 transition-all duration-300 ${hovering ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`}>
          <button
            onClick={handleCart}
            disabled={loading || added}
            className={`flex w-full items-center justify-center gap-2 py-3 text-[11px] font-black uppercase tracking-[0.15em] transition-colors
              ${added ? "bg-green-600 text-white" : "bg-white/95 text-gray-900 hover:bg-gray-900 hover:text-white backdrop-blur-sm"}`}
          >
            {added
              ? <><FiCheck size={13} /> Added!</>
              : loading
                ? <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                : <><FiShoppingBag size={13} /> Add to Bag</>
            }
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="mt-3.5 space-y-2 px-0.5">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
          Vedrix · {product.category || "Streetwear"}
        </p>
        <Link to={`/product/${product.id}`}>
          <h3 className="line-clamp-2 text-[14px] font-semibold leading-snug text-gray-900 hover:text-gray-500 transition-colors">
            {product.name}
          </h3>
        </Link>

        {product.rating > 0 && (
          <div className="flex items-center gap-2">
            <div className="inline-flex items-center gap-1 rounded bg-green-600 px-1.5 py-0.5">
              <span className="text-[10px] font-bold text-white">{product.rating}</span>
              <FiStar size={9} className="fill-white text-white" />
            </div>
          </div>
        )}

        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 pt-1">
          <span className="text-[15px] font-black text-gray-900">
            ₹{product.price?.toLocaleString("en-IN")}
          </span>
          {product.oldPrice && (
            <>
              <span className="text-[12px] text-gray-400 line-through">₹{product.oldPrice?.toLocaleString("en-IN")}</span>
              <span className="text-[11px] font-bold text-[#ff3f6c]">({discount}% OFF)</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrendingCard;
