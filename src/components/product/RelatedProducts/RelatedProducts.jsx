import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiShoppingBag } from "react-icons/fi";
import { productAPI } from "../../../services/api";

const RelatedProductCard = ({ product }) => (
  <div className="group overflow-hidden bg-white border border-gray-100 transition-all duration-300 hover:border-gray-300 hover:shadow-[0_8px_40px_rgba(0,0,0,0.08)]">
    <div className="relative overflow-hidden bg-[#f5f5f3]">
      <img
        src={product.image}
        alt={product.name}
        className="h-64 w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      {product.badge && (
        <span className="absolute left-3 top-3 bg-white/90 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-gray-800 backdrop-blur-sm">
          {product.badge}
        </span>
      )}
    </div>
    <div className="p-4">
      <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-gray-400">
        {product.category?.name}
      </p>
      <h3 className="mt-1.5 text-sm font-semibold text-gray-900 line-clamp-2 leading-snug">
        {product.name}
      </h3>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-base font-black text-gray-900">₹{product.price}</span>
        <Link
          to={`/product/${product.id}`}
          className="flex h-9 w-9 items-center justify-center border border-gray-200 text-gray-500 transition hover:border-gray-900 hover:bg-gray-900 hover:text-white"
        >
          <FiArrowRight size={14} />
        </Link>
      </div>
    </div>
  </div>
);

const RelatedProducts = ({ categoryId, currentId }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (!categoryId) return;
    productAPI
      .getAll({ limit: 8 })
      .then((res) => {
        const filtered = (res.products || [])
          .filter((p) => p.categoryId === categoryId && p.id !== currentId)
          .slice(0, 4);
        setProducts(filtered);
      })
      .catch(console.error);
  }, [categoryId, currentId]);

  if (!products.length) return null;

  return (
    <section className="mt-24">
      <div className="mb-10 flex items-end justify-between">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gray-400">
            You May Also Like
          </p>
          <h2 className="mt-3 text-4xl font-black tracking-tight">Related Products</h2>
        </div>
        <Link
          to="/shop"
          className="group flex items-center gap-2 text-sm font-semibold text-gray-700 transition hover:text-black"
        >
          View All
          <FiArrowRight size={14} className="transition group-hover:translate-x-0.5" />
        </Link>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((p) => (
          <RelatedProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
};

export default RelatedProducts;
