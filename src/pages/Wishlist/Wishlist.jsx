import { Link } from "react-router-dom";
import { Navbar, Footer } from "../../components/layout";
import { useWishlist } from "../../context";
import { useCart } from "../../context";
import { FiHeart, FiShoppingBag, FiArrowRight, FiTrash2 } from "react-icons/fi";

const WishlistCard = ({ item }) => {
  const { removeFromWishlist }  = useWishlist();
  const { addToCart }           = useCart();
  const product = item.product;

  const handleAddToCart = async () => {
    try {
      await addToCart(product.id, 1);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="group overflow-hidden bg-white border border-gray-100 transition-all duration-300 hover:border-gray-300 hover:shadow-[0_8px_40px_rgba(0,0,0,0.08)]">
      {/* Image */}
      <div className="relative overflow-hidden bg-[#f5f5f3]">
        <img
          src={product.image}
          alt={product.name}
          className="h-72 w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <button
          onClick={() => removeFromWishlist(product.id)}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/60 bg-white/80 text-gray-500 backdrop-blur-sm transition hover:border-red-500 hover:text-red-500"
        >
          <FiTrash2 size={15} />
        </button>
      </div>

      {/* Info */}
      <div className="p-5 space-y-2">
        <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-gray-400">
          {product.category?.name}
        </p>
        <h3 className="font-semibold text-base leading-snug line-clamp-2">{product.name}</h3>

        <div className="h-px w-full bg-gray-100 !mt-3" />

        <div className="flex items-center justify-between !mt-3">
          <span className="text-lg font-black">₹{product.price}</span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleAddToCart}
              className="flex items-center gap-2 border border-gray-900 bg-gray-900 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-white transition hover:bg-orange-500 hover:border-orange-500"
            >
              <FiShoppingBag size={13} /> Add to Cart
            </button>
            <Link
              to={`/product/${product.id}`}
              className="flex h-9 w-9 items-center justify-center border border-gray-200 text-gray-500 transition hover:border-gray-900 hover:bg-gray-900 hover:text-white"
            >
              <FiArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const Wishlist = () => {
  const { wishlistItems, loading } = useWishlist();

  return (
    <>
      <Navbar />
      <main className="pt-[72px] mx-auto max-w-7xl px-6 py-10">
        <h1 className="mb-8 text-4xl font-black">My Wishlist</h1>

        {loading ? (
          <div className="py-20 text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-black border-t-transparent" />
            <p className="mt-3 text-gray-500">Loading wishlist...</p>
          </div>
        ) : wishlistItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <FiHeart size={48} className="text-gray-200" />
            <h2 className="mt-6 text-2xl font-black">Your wishlist is empty</h2>
            <p className="mt-3 text-gray-500">Save items you love and find them here.</p>
            <Link
              to="/shop"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-black px-7 py-3.5 font-semibold text-white transition hover:bg-orange-500"
            >
              Start Shopping <FiArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {wishlistItems.map((item) => (
              <WishlistCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
};

export default Wishlist;
