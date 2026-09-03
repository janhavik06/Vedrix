import { useEffect, useState } from "react";
import { Link }       from "react-router-dom";
import { FiArrowRight, FiStar, FiShoppingBag, FiHeart, FiCheck } from "react-icons/fi";
import { productAPI }  from "../../../services/api";
import { useCart }     from "../../../context/CartContext";
import { useWishlist } from "../../../context/WishlistContext";
import { useAuth }     from "../../../context/AuthContext";

/* Inline card — wide horizontal Myntra "top picks" style */
const BestCard = ({ product, rank }) => {
  const { addToCart }                                       = useCart();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { user }                                            = useAuth();
  const [loading,  setLoading]  = useState(false);
  const [added,    setAdded]    = useState(false);

  const inWishlist = isInWishlist(product.id);
  const oldPrice   = product.oldPrice || Math.round(product.price * 1.3);
  const discount   = Math.round(((oldPrice - product.price) / oldPrice) * 100);

  const handleCart = async () => {
    if (!user) { window.location.href = "/login"; return; }
    setLoading(true);
    try { await addToCart(product.id, 1); setAdded(true); setTimeout(() => setAdded(false), 2500); }
    catch { /* noop */ } finally { setLoading(false); }
  };

  const handleWish = async () => {
    if (!user) { window.location.href = "/login"; return; }
    if (inWishlist) await removeFromWishlist(product.id);
    else            await addToWishlist(product.id);
  };

  return (
    <div className="group flex gap-5 rounded-2xl border border-gray-100 bg-white p-4 transition-all duration-300 hover:border-gray-200 hover:shadow-lg">
      {/* Image */}
      <div className="relative w-32 shrink-0 overflow-hidden rounded-xl bg-[#f5f5f3]">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.image || ""}
            alt={product.name}
            className="h-40 w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
        </Link>
        {/* Rank */}
        <div className="absolute left-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-black text-[9px] font-black text-white">
          {rank}
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col justify-between py-1">
        <div>
          <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-gray-400">
            {product.category}
          </p>
          <Link to={`/product/${product.id}`}>
            <h3 className="mt-1.5 text-[14px] font-bold leading-snug text-gray-900 hover:text-gray-600 transition-colors line-clamp-2">
              {product.name}
            </h3>
          </Link>

          {/* Rating */}
          {product.rating > 0 && (
            <div className="mt-2 inline-flex items-center gap-1 rounded bg-green-600 px-1.5 py-0.5">
              <span className="text-[10px] font-bold text-white">{product.rating}</span>
              <FiStar size={9} className="fill-white text-white" />
            </div>
          )}
        </div>

        {/* Price + actions */}
        <div>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="text-[15px] font-black text-gray-900">₹{product.price.toLocaleString("en-IN")}</span>
            <span className="text-[12px] text-gray-400 line-through">₹{oldPrice.toLocaleString("en-IN")}</span>
            <span className="text-[11px] font-bold text-[#ff3f6c]">({discount}% OFF)</span>
          </div>

          <div className="mt-3 flex items-center gap-2">
            <button
              onClick={handleCart}
              disabled={loading || added}
              className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2.5 text-[11px] font-black uppercase tracking-[0.1em] transition-all duration-200 disabled:opacity-60
                ${added ? "bg-green-600 text-white" : "bg-gray-900 text-white hover:bg-black"}`}
            >
              {added   ? <><FiCheck size={12} /> Added</> :
               loading  ? <span className="h-3 w-3 animate-spin rounded-full border-2 border-white border-t-transparent" /> :
               <><FiShoppingBag size={12} /> Add to Bag</>}
            </button>
            <button
              onClick={handleWish}
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition-all duration-200
                ${inWishlist ? "border-pink-400 bg-pink-50 text-pink-500" : "border-gray-200 text-gray-400 hover:border-pink-400 hover:text-pink-500"}`}
            >
              <FiHeart size={14} className={inWishlist ? "fill-pink-500" : ""} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const BestSellers = () => {
  const [products, setProducts] = useState([]);
  const [loading,  setLoading]  = useState(true);

  useEffect(() => {
    productAPI.getAll({ sort: "rating", order: "desc", limit: 6 })
      .then((r) => setProducts(
        (r.products || []).slice(0, 6).map((p) => ({
          ...p,
          category: p.category?.name || p.category || "",
        }))
      ))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="bg-[#f8f8f6] py-24">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-16 xl:px-20">

        {/* Header */}
        <div className="mb-12 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-gray-400">Customer Favorites</p>
            <h2 className="mt-3 text-5xl font-black tracking-tight text-gray-900">Best Sellers</h2>
            <p className="mt-3 max-w-md text-[14px] leading-7 text-gray-500">
              The styles our customers keep coming back for — real ratings, real reviews.
            </p>
          </div>
          <Link
            to="/shop"
            className="group inline-flex w-fit shrink-0 items-center gap-2 rounded-full border-2 border-gray-900 px-7 py-3 text-[12px] font-black uppercase tracking-[0.12em] text-gray-900 transition-all duration-300 hover:bg-gray-900 hover:text-white"
          >
            Shop All <FiArrowRight size={13} className="transition group-hover:translate-x-0.5" />
          </Link>
        </div>

        {loading ? (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex gap-5 rounded-2xl border border-gray-100 bg-white p-4">
                <div className="h-40 w-32 animate-pulse rounded-xl bg-gray-100 shrink-0" />
                <div className="flex-1 space-y-3 py-2">
                  <div className="h-3 w-20 animate-pulse rounded bg-gray-100" />
                  <div className="h-4 w-full animate-pulse rounded bg-gray-100" />
                  <div className="h-4 w-2/3 animate-pulse rounded bg-gray-100" />
                </div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="py-16 text-center text-gray-400 text-sm">
            No products available right now. Check back soon.
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {products.map((p, i) => (
              <BestCard key={p.id} product={p} rank={i + 1} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default BestSellers;
