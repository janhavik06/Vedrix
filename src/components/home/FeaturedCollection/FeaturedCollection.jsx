import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiShoppingBag } from "react-icons/fi";
import { productAPI } from "../../../services/api";

import hoodieImg from "../../../assets/images/products/hoodies/hoodie1.jpg";
import tshirtImg from "../../../assets/images/products/tshirts/tshirt1.jpg";
import shirtImg  from "../../../assets/images/products/shirts/shirt1.jpg";
import joggerImg from "../../../assets/images/products/joggers/jogger1.jpg";

const FALLBACKS = [hoodieImg, tshirtImg, shirtImg, joggerImg];

/* Large feature card (left) */
const LargeCard = ({ product }) => (
  <div className="group relative overflow-hidden rounded-2xl bg-gray-100 lg:row-span-2">
    <div className="aspect-[3/4] overflow-hidden">
      <img
        src={product.image || FALLBACKS[0]}
        alt={product.name}
        className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
      />
    </div>
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
      <span className="inline-block rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.2em] backdrop-blur-sm">
        {product.category || "Featured"}
      </span>
      <h3 className="mt-3 text-2xl font-black leading-snug">{product.name}</h3>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="text-xl font-black">₹{product.price?.toLocaleString("en-IN")}</span>
        {product.oldPrice && (
          <span className="text-sm text-white/50 line-through">₹{product.oldPrice?.toLocaleString("en-IN")}</span>
        )}
      </div>
      <Link
        to={`/product/${product.id}`}
        className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-[11px] font-black uppercase tracking-[0.15em] text-black transition-all duration-300 hover:bg-orange-500 hover:text-white"
      >
        <FiShoppingBag size={12} /> Shop Now
      </Link>
    </div>
  </div>
);

/* Small card (right column) */
const SmallCard = ({ product, fallbackIdx = 0 }) => (
  <div className="group relative overflow-hidden rounded-2xl bg-gray-100">
    <div className="aspect-[4/3] overflow-hidden">
      <img
        src={product.image || FALLBACKS[fallbackIdx]}
        alt={product.name}
        className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
      />
    </div>
    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
      <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/60">{product.category}</p>
      <h3 className="mt-1 text-[15px] font-black leading-snug line-clamp-1">{product.name}</h3>
      <div className="mt-1 flex items-center justify-between">
        <span className="text-sm font-black">₹{product.price?.toLocaleString("en-IN")}</span>
        <Link
          to={`/product/${product.id}`}
          className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition hover:bg-white hover:text-black"
        >
          <FiArrowRight size={12} />
        </Link>
      </div>
    </div>
  </div>
);

const FeaturedCollection = () => {
  const [products, setProducts] = useState([]);
  const [loading,  setLoading]  = useState(true);

  useEffect(() => {
    productAPI.getAll({ sort: "rating", order: "desc", limit: 5 })
      .then((r) => setProducts(
        (r.products || []).slice(0, 5).map((p) => ({
          ...p, category: p.category?.name || p.category || "",
        }))
      ))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-16 xl:px-20">

        {/* Header */}
        <div className="mb-12 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-gray-400">Handpicked For You</p>
            <h2 className="mt-3 text-5xl font-black tracking-tight text-gray-900">Featured Collection</h2>
          </div>
          <Link
            to="/shop"
            className="group inline-flex w-fit shrink-0 items-center gap-2 rounded-full border-2 border-gray-900 px-7 py-3 text-[12px] font-black uppercase tracking-[0.12em] text-gray-900 transition-all duration-300 hover:bg-gray-900 hover:text-white"
          >
            View All <FiArrowRight size={13} className="transition group-hover:translate-x-0.5" />
          </Link>
        </div>

        {loading ? (
          <div className="grid gap-4 lg:grid-cols-3">
            <div className="aspect-[3/4] animate-pulse rounded-2xl bg-gray-100 lg:row-span-2" />
            {[...Array(4)].map((_, i) => (
              <div key={i} className="aspect-[4/3] animate-pulse rounded-2xl bg-gray-100" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="py-16 text-center text-sm text-gray-400">
            No products available right now. Check back soon.
          </div>
        ) : (
          <div className="grid gap-4 lg:grid-cols-3 lg:grid-rows-2">
            {products[0] && <LargeCard product={products[0]} />}
            {products.slice(1, 5).map((p, i) => (
              <SmallCard key={p.id} product={p} fallbackIdx={i + 1} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedCollection;
