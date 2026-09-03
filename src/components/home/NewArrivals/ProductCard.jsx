import { useState } from "react";
import { Link } from "react-router-dom";
import { FiHeart, FiShoppingBag, FiStar, FiCheck } from "react-icons/fi";
import { useCart }     from "../../../context/CartContext";
import { useWishlist } from "../../../context/WishlistContext";
import { useAuth }     from "../../../context/AuthContext";

/* Myntra / Ajio style card — portrait ratio, minimal chrome */
const ProductCard = ({ product }) => {
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

  const handleWishlist = async (e) => {
    e.preventDefault();
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
      {/* ── Image block ── */}
      <div className="relative overflow-hidden rounded-xl bg-[#f0efed]">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.image || "/images/placeholder.jpg"}
            alt={product.name}
            className={`aspect-[3/4] w-full object-cover object-top transition-transform duration-700 ${hovering ? "scale-105" : "scale-100"}`}
          />
        </Link>

        {/* Top-left badges */}
        <div className="absolute left-2.5 top-2.5 flex flex-col gap-1.5">
          {product.badge && (
            <span className="rounded bg-white/90 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.15em] text-gray-800 shadow-sm backdrop-blur-sm">
              {product.badge}
            </span>
          )}
          {discount && (
            <span className="rounded bg-[#ff3f6c] px-2 py-0.5 text-[9px] font-bold text-white shadow-sm">
              {discount}% OFF
            </span>
          )}
        </div>

        {/* Wishlist — top right */}
        <button
          onClick={handleWishlist}
          className={`absolute right-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-200
            ${inWishlist
              ? "border-pink-500 bg-pink-50 text-pink-500 shadow"
              : "border-white/70 bg-white/80 text-gray-500 shadow backdrop-blur-sm hover:border-pink-400 hover:text-pink-500"
            }`}
        >
          <FiHeart size={14} className={inWishlist ? "fill-pink-500" : ""} />
        </button>

        {/* Add to cart — slides up on hover */}
        <div className={`absolute inset-x-0 bottom-0 transition-all duration-300 ${hovering ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`}>
          <button
            onClick={handleCart}
            disabled={loading || added}
            className={`flex w-full items-center justify-center gap-2 py-3 text-[11px] font-black uppercase tracking-[0.15em] transition-colors duration-200
              ${added
                ? "bg-green-600 text-white"
                : "bg-white/95 text-gray-900 hover:bg-gray-900 hover:text-white backdrop-blur-sm"
              }`}
          >
            {added   ? <><FiCheck size={13} /> Added!</> :
             loading  ? <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" /> :
             <><FiShoppingBag size={13} /> Add to Bag</>}
          </button>
        </div>
      </div>

      {/* ── Info block ── */}
      <div className="mt-3 px-0.5">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
          {product.category || "Vedrix"}
        </p>
        <Link to={`/product/${product.id}`}>
          <h3 className="mt-1 line-clamp-2 text-[13px] font-semibold leading-snug text-gray-900 hover:text-gray-600 transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Price row */}
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <span className="text-[15px] font-black text-gray-900">
            ₹{product.price.toLocaleString("en-IN")}
          </span>
          {product.oldPrice && (
            <>
              <span className="text-[12px] text-gray-400 line-through">
                ₹{product.oldPrice.toLocaleString("en-IN")}
              </span>
              <span className="text-[11px] font-bold text-[#ff3f6c]">
                ({discount}% OFF)
              </span>
            </>
          )}
        </div>

        {/* Rating */}
        {product.rating > 0 && (
          <div className="mt-1.5 flex items-center gap-1.5">
            <div className="flex items-center gap-0.5 rounded bg-green-600 px-1.5 py-0.5">
              <span className="text-[10px] font-bold text-white">{product.rating}</span>
              <FiStar size={9} className="fill-white text-white" />
            </div>
            {product.reviews > 0 && (
              <span className="text-[10px] text-gray-400">
                ({product.reviews.toLocaleString("en-IN")})
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
