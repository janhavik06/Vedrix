import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Navbar, Footer } from "../../components/layout";
import {
  ProductGallery,
  ProductInfo,
  SizeSelector,
  ColorSelector,
  QuantitySelector,
  ProductTabs,
  RelatedProducts,
} from "../../components/product";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useAuth } from "../../context/AuthContext";
import { productAPI, reviewAPI } from "../../services/api";
import { FiHeart, FiShoppingBag, FiStar } from "react-icons/fi";

const COLOR_CODES = {
  Black: "#111111",
  White: "#ffffff",
  Blue: "#2563eb",
  Olive: "#6b6b47",
  Beige: "#d4c5a9",
  Gray: "#888888",
  Cream: "#f5f0e1",
  Charcoal: "#36454f",
};

const safeParse = (json, fallback) => {
  try {
    return json ? JSON.parse(json) : fallback;
  } catch {
    return fallback;
  }
};

/* ── Review Form ─────────────────────────────────────────── */
const ReviewForm = ({ productId, onSubmitted }) => {
  const { user } = useAuth();
  const [rating, setRating]   = useState(5);
  const [title, setTitle]     = useState("");
  const [body, setBody]       = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");

  if (!user) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await reviewAPI.add({ productId, rating, title, body });
      setTitle(""); setBody(""); setRating(5);
      onSubmitted();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-10 rounded-3xl border bg-white p-7 shadow-sm">
      <h3 className="text-xl font-bold mb-6">Write a Review</h3>
      {error && <p className="mb-4 text-sm text-red-500">{error}</p>}

      {/* Star picker */}
      <div className="flex gap-2 mb-5">
        {[1,2,3,4,5].map((s) => (
          <button type="button" key={s} onClick={() => setRating(s)}>
            <FiStar size={24} className={s <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} />
          </button>
        ))}
      </div>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Review title (optional)"
        className="mb-4 w-full rounded-xl border px-4 py-3 text-sm outline-none focus:border-black"
      />
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        rows={4}
        placeholder="Share your experience..."
        className="mb-5 w-full resize-none rounded-xl border px-4 py-3 text-sm outline-none focus:border-black"
      />
      <button
        type="submit"
        disabled={loading}
        className="rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-500 disabled:opacity-60"
      >
        {loading ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
};

/* ── Review Card ─────────────────────────────────────────── */
const ReviewCard = ({ review }) => (
  <div className="rounded-2xl border bg-white p-6 shadow-sm">
    <div className="flex items-center gap-2 mb-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-sm font-bold text-white">
        {review.user?.name?.charAt(0)}
      </div>
      <div>
        <p className="text-sm font-semibold">{review.user?.name}</p>
        <div className="flex gap-0.5">
          {[1,2,3,4,5].map((s) => (
            <FiStar key={s} size={11} className={s <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-200"} />
          ))}
        </div>
      </div>
    </div>
    {review.title && <p className="font-semibold text-sm mb-1">{review.title}</p>}
    {review.body  && <p className="text-sm text-gray-600 leading-6">{review.body}</p>}
  </div>
);

/* ── Main Page ───────────────────────────────────────────── */
const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart }       = useCart();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { user }            = useAuth();

  const [product, setProduct]   = useState(null);
  const [reviews, setReviews]   = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState("");

  const [selectedSize, setSelectedSize]   = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity]           = useState(1);
  const [addingToCart, setAddingToCart]   = useState(false);
  const [cartMsg, setCartMsg]             = useState("");

  const inWishlist = product ? isInWishlist(product.id) : false;

  /* ── variants: one row per size + color, each with its own stock ── */
  const variants   = product?.variants ?? [];
  const sizes      = [...new Set(variants.map((v) => v.size).filter(Boolean))];
  const colorNames = [...new Set(variants.map((v) => v.color).filter(Boolean))];
  const colorObjects = colorNames.map((name) => ({
    name,
    code: COLOR_CODES[name] || "#888888",
  }));

  // A size is sold out when none of its variants has stock
  // (counting only the chosen color, once one is chosen)
  const soldOutSizes = sizes.filter(
    (s) => !variants.some(
      (v) => v.size === s && (!selectedColor || v.color === selectedColor) && v.stock > 0
    )
  );
  const soldOutColors = colorNames.filter(
    (c) => !variants.some(
      (v) => v.color === c && (!selectedSize || v.size === selectedSize) && v.stock > 0
    )
  );

  const needsSize  = sizes.length > 0;
  const needsColor = colorNames.length > 0;
  const choiceMade = (!needsSize || selectedSize) && (!needsColor || selectedColor);

  const selectedVariant = choiceMade
    ? variants.find((v) => v.size === selectedSize && v.color === selectedColor)
    : undefined;

  const allSoldOut = variants.length > 0
    ? variants.every((v) => v.stock <= 0)
    : product?.stock === 0;

  const fetchProduct = async (silent = false) => {
    try {
      if (!silent) setLoading(true);
      const [prodRes, revRes] = await Promise.all([
        productAPI.getById(id),
        // a broken reviews request must not hide the whole product
        reviewAPI.getForProduct(id).catch(() => ({ reviews: [] })),
      ]);
      setProduct(prodRes.product);
      setReviews(revRes.reviews || []);
    } catch (err) {
      setError("Product not found.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setSelectedSize("");
    setSelectedColor("");
    setQuantity(1);
    setCartMsg("");
    fetchProduct();
  }, [id]);

  // Picking a size or color keeps the other choice only if that pair is in stock
  const handleSize = (size) => {
    setSelectedSize(size);
    if (
      selectedColor &&
      !variants.some((v) => v.size === size && v.color === selectedColor && v.stock > 0)
    ) {
      setSelectedColor("");
    }
    setQuantity(1);
    setCartMsg("");
  };

  const handleColor = (color) => {
    setSelectedColor(color);
    if (
      selectedSize &&
      !variants.some((v) => v.color === color && v.size === selectedSize && v.stock > 0)
    ) {
      setSelectedSize("");
    }
    setQuantity(1);
    setCartMsg("");
  };

  const handleAddToCart = async () => {
    if (!user) { setCartMsg("Please login to add to cart."); return; }
    if (needsSize && !selectedSize)   { setCartMsg("Select a size.");  return; }
    if (needsColor && !selectedColor) { setCartMsg("Select a color."); return; }
    if (selectedVariant && quantity > selectedVariant.stock) {
      setCartMsg(`Only ${selectedVariant.stock} left in this size and color.`);
      return;
    }

    setAddingToCart(true);
    setCartMsg("");
    try {
      await addToCart(product.id, quantity, selectedSize, selectedColor);
      setCartMsg("Added to cart!");
      setTimeout(() => setCartMsg(""), 3000);
    } catch (err) {
      setCartMsg(err.message);
    } finally {
      setAddingToCart(false);
    }
  };

  const handleWishlist = async () => {
    if (!user) return;
    if (inWishlist) await removeFromWishlist(product.id);
    else await addToWishlist(product.id);
  };

  /* loading state */
  if (loading) {
    return (
      <>
        <Navbar />
        <main className="mx-auto max-w-7xl px-6 py-20 text-center">
          <div className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-black border-t-transparent" />
          <p className="mt-4 text-gray-500">Loading product...</p>
        </main>
        <Footer />
      </>
    );
  }

  /* error state */
  if (error || !product) {
    return (
      <>
        <Navbar />
        <main className="mx-auto max-w-7xl px-6 py-20 text-center">
          <p className="text-2xl font-bold text-gray-700">{error || "Product not found."}</p>
          <Link to="/shop" className="mt-6 inline-block rounded-xl bg-black px-6 py-3 text-white transition hover:bg-orange-500">
            Back to Shop
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-10">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-sm text-gray-500">
          <Link to="/" className="hover:text-black transition">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-black transition">Shop</Link>
          <span>/</span>
          <span className="font-semibold text-gray-900">{product.name}</span>
        </nav>

        {/* Main grid */}
        <div className="grid gap-12 lg:grid-cols-2">
          <ProductGallery
            images={
              safeParse(product.images, null) ||
              (product.image ? [product.image] : [])
            }
          />

          <div className="space-y-6">
            <ProductInfo product={{
              ...product,
              category: product.category?.name,
              reviews: product.reviewCount,
            }} />

            {needsColor && (
              <ColorSelector
                colors={colorObjects}
                value={selectedColor}
                onChange={handleColor}
                disabled={soldOutColors}
              />
            )}

            {needsSize && (
              <SizeSelector
                sizes={sizes}
                value={selectedSize}
                onChange={handleSize}
                disabled={soldOutSizes}
              />
            )}

            <QuantitySelector
              value={quantity}
              onChange={setQuantity}
              max={selectedVariant ? Math.max(selectedVariant.stock, 1) : undefined}
            />

            {/* Stock for the chosen size + color */}
            {selectedVariant && selectedVariant.stock > 0 && selectedVariant.stock <= 5 && (
              <p className="text-sm font-semibold text-orange-600">
                Only {selectedVariant.stock} left in this size and color!
              </p>
            )}
            {selectedVariant && selectedVariant.stock === 0 && (
              <p className="text-sm font-semibold text-red-500">
                This size and color is sold out.
              </p>
            )}

            {/* Cart message */}
            {cartMsg && (
              <p className={`text-sm font-semibold ${cartMsg.includes("Added") ? "text-green-600" : "text-red-500"}`}>
                {cartMsg}
              </p>
            )}

            {/* Action buttons */}
            <div className="flex gap-4">
              <button
                onClick={handleAddToCart}
                disabled={addingToCart || allSoldOut}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-black py-4 font-semibold text-white transition hover:bg-orange-500 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <FiShoppingBag size={18} />
                {allSoldOut ? "Out of Stock" : addingToCart ? "Adding..." : "Add to Cart"}
              </button>

              <button
                onClick={handleWishlist}
                disabled={!user}
                className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border-2 transition ${
                  inWishlist ? "border-red-500 bg-red-50 text-red-500" : "border-gray-200 hover:border-black"
                }`}
              >
                <FiHeart size={20} className={inWishlist ? "fill-red-500" : ""} />
              </button>
            </div>
          </div>
        </div>

        <ProductTabs product={product} />

        {/* Reviews section */}
        <section className="mt-24">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-4xl font-bold">
              Customer Reviews
              <span className="ml-3 text-2xl text-gray-400">({reviews.length})</span>
            </h2>
          </div>

          {reviews.length > 0 ? (
            <div className="grid gap-5 lg:grid-cols-2">
              {reviews.map((r) => <ReviewCard key={r.id} review={r} />)}
            </div>
          ) : (
            <p className="text-gray-500 py-8">No reviews yet. Be the first to review this product!</p>
          )}

          <ReviewForm productId={product.id} onSubmitted={() => fetchProduct(true)} />
        </section>

        <RelatedProducts categoryId={product.categoryId} currentId={product.id} />
      </main>

      <Footer />
    </>
  );
};

export default ProductDetails;