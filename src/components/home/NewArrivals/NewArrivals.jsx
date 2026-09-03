import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import ProductCard from "./ProductCard";
import { productAPI } from "../../../services/api";

const normalize = (p) => ({
  ...p,
  category: p.category?.name || p.category || "",
  colors: (() => { try { return JSON.parse(p.colors || "[]"); } catch { return []; } })(),
  badge: p.badge || "",
  reviews: p.reviewCount || 0,
});

const NewArrivals = () => {
  const [products, setProducts] = useState([]);
  const [loading,  setLoading]  = useState(true);

  useEffect(() => {
    productAPI.getAll({ limit: 8, sort: "createdAt", order: "desc" })
      .then((r) => setProducts((r.products || []).map(normalize)))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-16 xl:px-20">

        {/* Header */}
        <div className="mb-12 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-gray-400">
              Latest Drops
            </p>
            <h2 className="mt-3 text-5xl font-black tracking-tight text-gray-900">
              New Arrivals
            </h2>
            <p className="mt-3 max-w-md text-[14px] leading-7 text-gray-500">
              Fresh off the rack — limited stock, premium quality.
            </p>
          </div>
          <Link
            to="/new-arrivals"
            className="group inline-flex w-fit shrink-0 items-center gap-2 rounded-full border-2 border-gray-900 px-7 py-3 text-[12px] font-black uppercase tracking-[0.12em] text-gray-900 transition-all duration-300 hover:bg-gray-900 hover:text-white"
          >
            View All <FiArrowRight size={13} className="transition group-hover:translate-x-0.5" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="overflow-hidden rounded-2xl">
                <div className="aspect-[3/4] animate-pulse bg-gray-100" />
                <div className="mt-3 space-y-2 px-1">
                  <div className="h-3 w-20 animate-pulse rounded bg-gray-100" />
                  <div className="h-4 w-36 animate-pulse rounded bg-gray-100" />
                </div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-lg font-semibold text-gray-600">No products yet.</p>
            <p className="mt-2 text-sm text-gray-400">Check back soon for new arrivals.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default NewArrivals;
