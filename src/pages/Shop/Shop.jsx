import { useCallback, useEffect, useMemo, useState } from "react";
import { Link }     from "react-router-dom";
import { Navbar, Footer } from "../../components/layout";
import { ProductFilter, SearchBar, SortDropdown } from "../../components/shop";
import ProductCard from "../../components/shop/ProductCard";
import { productAPI } from "../../services/api";
import {
  FiGrid, FiList, FiSliders, FiX,
  FiHome, FiChevronRight, FiPackage,
  FiArrowRight, FiShoppingBag,
} from "react-icons/fi";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

import heroCollectionImg from "../../assets/images/collections/hero-collection.jpg";

/* ─── constants ─────────────────────────── */
const MAX_PRICE    = 5000;
const AVAILABILITY = ["in-stock", "out-of-stock"];

/* ─── normalize DB product ──────────────── */
const normalize = (p) => ({
  ...p,
  category:    p.category?.name || p.category || "",
  color:       (() => { try { return JSON.parse(p.colors || "[]")[0] || ""; } catch { return p.color || ""; } })(),
  size:        (() => { try { return JSON.parse(p.sizes  || "[]");          } catch { return p.size  || []; } })(),
  stock:       p.stock > 0,
  badge:       p.badge || "",
  reviewCount: p.reviewCount || 0,
});

/* ─── active chip ────────────────────────── */
const Chip = ({ label, onRemove }) => (
  <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-900 px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-white">
    {label}
    <button onClick={onRemove} className="ml-0.5 transition hover:text-gray-400">
      <FiX size={10} />
    </button>
  </span>
);

/* ─── skeleton ───────────────────────────── */
const SkeletonGrid = () => (
  <div className="grid grid-cols-2 gap-5 sm:grid-cols-3">
    {[...Array(6)].map((_, i) => (
      <div key={i}>
        <div className="aspect-[3/4] animate-pulse rounded-xl bg-gray-100" />
        <div className="mt-3.5 space-y-2.5 px-0.5">
          <div className="h-2.5 w-16 animate-pulse rounded bg-gray-100" />
          <div className="h-3.5 w-full animate-pulse rounded bg-gray-100" />
          <div className="h-3 w-20 animate-pulse rounded bg-gray-100" />
          <div className="h-3 w-28 animate-pulse rounded bg-gray-100" />
        </div>
      </div>
    ))}
  </div>
);

/* ─── list card ──────────────────────────── */
const ListCard = ({ product }) => {
  const { addToCart } = useCart();
  const { user }      = useAuth();
  const [added,   setAdded]   = useState(false);
  const [loading, setLoading] = useState(false);

  const discount   = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) : null;
  const outOfStock = !product.stock;

  const handleAdd = async () => {
    if (!user) { window.location.href = "/login"; return; }
    setLoading(true);
    try { await addToCart(product.id, 1); setAdded(true); setTimeout(() => setAdded(false), 2500); }
    catch { /* noop */ } finally { setLoading(false); }
  };

  return (
    <div className="group flex overflow-hidden rounded-xl border border-gray-100 bg-white transition hover:border-gray-200 hover:shadow-md">
      {/* Image */}
      <div className="relative w-36 shrink-0 overflow-hidden bg-[#f0efed] sm:w-48">
        {product.image
          ? <img src={product.image} alt={product.name} className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105" />
          : <div className="flex h-full w-full items-center justify-center"><FiPackage size={28} className="text-gray-300" /></div>
        }
        {outOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/60">
            <span className="bg-white/80 px-3 py-1 text-[9px] font-bold uppercase tracking-widest text-gray-600">Sold Out</span>
          </div>
        )}
        {discount && !outOfStock && (
          <span className="absolute left-2 top-2 bg-[#ff3f6c] px-2 py-0.5 text-[9px] font-bold text-white">
            {discount}% OFF
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col justify-between p-4 sm:p-5">
        <div className="space-y-1.5">
          <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-gray-400">
            Vedrix · {product.category}
          </p>
          <Link to={`/product/${product.id}`}>
            <h3 className="text-[15px] font-semibold text-gray-900 hover:text-gray-600 transition-colors">
              {product.name}
            </h3>
          </Link>
          {product.size?.length > 0 && (
            <div className="flex flex-wrap gap-1 pt-0.5">
              {product.size.map((s) => (
                <span key={s} className="rounded border border-gray-200 px-1.5 py-0.5 text-[9px] font-semibold text-gray-500">{s}</span>
              ))}
            </div>
          )}
        </div>

        <div className="mt-4 flex items-center justify-between gap-3 border-t border-gray-50 pt-4">
          <div className="flex flex-wrap items-baseline gap-2">
            <span className="text-[17px] font-black text-gray-900">₹{product.price?.toLocaleString("en-IN")}</span>
            {product.oldPrice && (
              <>
                <span className="text-[12px] text-gray-400 line-through">₹{product.oldPrice?.toLocaleString("en-IN")}</span>
                <span className="text-[11px] font-bold text-[#ff3f6c]">({discount}% OFF)</span>
              </>
            )}
          </div>
          {outOfStock ? (
            <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">Unavailable</span>
          ) : (
            <div className="flex items-center gap-2">
              <button onClick={handleAdd} disabled={loading || added}
                className={`flex items-center gap-1.5 rounded-full px-5 py-2 text-[11px] font-black uppercase tracking-[0.12em] transition disabled:opacity-60
                  ${added ? "bg-green-600 text-white" : "bg-gray-900 text-white hover:bg-black"}`}>
                {added ? "Added!" : loading ? <span className="h-3 w-3 animate-spin rounded-full border-2 border-white border-t-transparent" /> : <><FiShoppingBag size={12} /> Add to Bag</>}
              </button>
              <Link to={`/product/${product.id}`}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition hover:border-gray-900 hover:bg-gray-900 hover:text-white">
                <FiArrowRight size={14} />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/* ─── Main page ──────────────────────────── */
const Shop = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [apiLoading,  setApiLoading]  = useState(true);
  const [apiError,    setApiError]    = useState("");

  const [search, setSearch] = useState("");
  const [sort,   setSort]   = useState("featured");
  const [view,   setView]   = useState("grid");

  const [filterCategories,   setFilterCategories]   = useState([]);
  const [filterMaxPrice,     setFilterMaxPrice]     = useState(MAX_PRICE);
  const [filterColors,       setFilterColors]       = useState([]);
  const [filterSizes,        setFilterSizes]        = useState([]);
  const [filterAvailability, setFilterAvailability] = useState([...AVAILABILITY]);

  useEffect(() => {
    productAPI.getAll({ limit: 100 })
      .then((r) => setAllProducts((r.products || []).map(normalize)))
      .catch((e) => setApiError(e.message))
      .finally(() => setApiLoading(false));
  }, []);

  const clearAll = useCallback(() => {
    setSearch(""); setSort("featured");
    setFilterCategories([]); setFilterMaxPrice(MAX_PRICE);
    setFilterColors([]); setFilterSizes([]);
    setFilterAvailability([...AVAILABILITY]);
  }, []);

  const filtered = useMemo(() => {
    let list = [...allProducts];
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
    }
    if (filterCategories.length) list = list.filter((p) => filterCategories.includes(p.category));
    if (filterMaxPrice < MAX_PRICE) list = list.filter((p) => p.price <= filterMaxPrice);
    if (filterColors.length) list = list.filter((p) => filterColors.includes(p.color));
    if (filterSizes.length)  list = list.filter((p) => p.size?.some((s) => filterSizes.includes(s)));
    const wantIn  = filterAvailability.includes("in-stock");
    const wantOut = filterAvailability.includes("out-of-stock");
    if (!(wantIn && wantOut)) {
      if (wantIn)  list = list.filter((p) =>  p.stock);
      if (wantOut) list = list.filter((p) => !p.stock);
    }
    switch (sort) {
      case "price-asc":  case "price-low-high":  list.sort((a, b) => a.price - b.price);   break;
      case "price-desc": case "price-high-low":  list.sort((a, b) => b.price - a.price);   break;
      case "rating":                              list.sort((a, b) => b.rating - a.rating); break;
      default: break;
    }
    return list;
  }, [allProducts, search, sort, filterCategories, filterMaxPrice, filterColors, filterSizes, filterAvailability]);

  const chips = [
    ...filterCategories.map((c) => ({ label: c, remove: () => setFilterCategories((p) => p.filter((x) => x !== c)) })),
    ...(filterMaxPrice < MAX_PRICE ? [{ label: `Under ₹${filterMaxPrice.toLocaleString("en-IN")}`, remove: () => setFilterMaxPrice(MAX_PRICE) }] : []),
    ...filterColors.map((c) => ({ label: c, remove: () => setFilterColors((p) => p.filter((x) => x !== c)) })),
    ...filterSizes.map((s)  => ({ label: s, remove: () => setFilterSizes((p) => p.filter((x) => x !== s)) })),
    ...(filterAvailability.length === 1 ? [{ label: filterAvailability[0] === "in-stock" ? "In Stock" : "Out of Stock", remove: () => setFilterAvailability([...AVAILABILITY]) }] : []),
    ...(sort !== "featured" ? [{ label: sort.replace(/-/g, " "), remove: () => setSort("featured") }] : []),
    ...(search ? [{ label: `"${search}"`, remove: () => setSearch("") }] : []),
  ];

  return (
    <>
      <Navbar />

      {/* ── Hero banner ── */}
      <section className="relative mt-[72px] h-[55vh] min-h-[400px] overflow-hidden">
        <img src={heroCollectionImg} alt="Shop" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

        <div className="relative z-10 mx-auto flex h-full max-w-[1440px] flex-col justify-center px-6 lg:px-10 xl:px-14">
          {/* Breadcrumb */}
          <nav className="mb-5 flex items-center gap-2 text-[11px] text-white/50">
            <Link to="/" className="flex items-center gap-1 hover:text-white transition"><FiHome size={11} /> Home</Link>
            <FiChevronRight size={11} />
            <span className="font-semibold text-white">Shop</span>
          </nav>

          <span className="inline-flex w-fit rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[9px] font-bold uppercase tracking-[0.35em] text-white/80 backdrop-blur-md">
            Full Collection
          </span>
          <h1 className="mt-4 text-[clamp(3rem,7vw,6rem)] font-black leading-[0.92] tracking-[-0.03em] text-white">
            All Products
          </h1>
          <p className="mt-4 max-w-md text-[14px] leading-7 text-white/55">
            {apiLoading ? "Loading collection..." : `${allProducts.length} products · New pieces added weekly · Free shipping ₹999+`}
          </p>
        </div>
      </section>

      {/* ── Main content ── */}
      <main className="mx-auto max-w-[1440px] px-4 py-10 sm:px-6 lg:px-10 xl:px-14">

        {/* Toolbar */}
        <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          {/* Left — search + result count */}
          <div className="flex flex-1 items-center gap-3">
            <div className="max-w-xs flex-1">
              <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} onSearch={() => {}} />
            </div>
            {!apiLoading && (
              <p className="shrink-0 text-[12px] text-gray-500">
                <span className="font-bold text-gray-900">{filtered.length}</span>
                {" "}of{" "}
                <span className="font-bold text-gray-900">{allProducts.length}</span>
                {" "}products
              </p>
            )}
          </div>

          {/* Right — sort + view toggle */}
          <div className="flex items-center gap-2.5 shrink-0">
            <SortDropdown value={sort} onChange={setSort} />
            <div className="flex overflow-hidden rounded-xl border border-gray-200">
              {[["grid", <FiGrid size={15} />], ["list", <FiList size={15} />]].map(([v, icon]) => (
                <button key={v} onClick={() => setView(v)} title={`${v} view`}
                  className={`flex h-10 w-10 items-center justify-center transition ${
                    view === v ? "bg-gray-900 text-white" : "text-gray-400 hover:bg-gray-50 hover:text-gray-700"
                  }`}>
                  {icon}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Active filter chips */}
        {chips.length > 0 && (
          <div className="mb-5 flex flex-wrap items-center gap-2">
            <span className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-widest text-gray-400">
              <FiSliders size={11} /> Filters:
            </span>
            {chips.map((c) => <Chip key={c.label} label={c.label} onRemove={c.remove} />)}
            <button onClick={clearAll}
              className="text-[10px] font-semibold text-gray-400 underline underline-offset-2 hover:text-gray-900 transition">
              Clear all
            </button>
          </div>
        )}

        {/* Sidebar + products */}
        <div className="grid gap-8 lg:grid-cols-[240px_1fr]">

          {/* Sidebar */}
          <aside className="hidden lg:block">
            <ProductFilter
              categories={filterCategories}    onCategoryChange={setFilterCategories}
              maxPrice={filterMaxPrice}         onPriceChange={setFilterMaxPrice}
              colors={filterColors}             onColorChange={setFilterColors}
              sizes={filterSizes}               onSizeChange={setFilterSizes}
              availability={filterAvailability} onAvailabilityChange={setFilterAvailability}
              onClear={clearAll}
            />
          </aside>

          {/* Products */}
          <section>
            {apiLoading ? (
              <SkeletonGrid />
            ) : apiError ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <p className="text-base font-semibold text-red-500">Could not load products</p>
                <p className="mt-2 text-sm text-gray-400">Make sure the backend is running on port 5000.</p>
              </div>
            ) : filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-28 text-center">
                <p className="text-8xl font-black text-gray-100">0</p>
                <p className="mt-4 text-xl font-black text-gray-800">No products match</p>
                <p className="mt-2 text-sm text-gray-400">Try adjusting your search or filters.</p>
                <button onClick={clearAll}
                  className="mt-6 rounded-full bg-gray-900 px-7 py-2.5 text-sm font-semibold text-white transition hover:bg-black">
                  Clear All Filters
                </button>
              </div>
            ) : view === "grid" ? (
              <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 xl:grid-cols-3">
                {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
              </div>
            ) : (
              <div className="space-y-3">
                {filtered.map((p) => <ListCard key={p.id} product={p} />)}
              </div>
            )}
          </section>
        </div>

        {/* Bottom CTA */}
        {!apiLoading && filtered.length > 0 && (
          <div className="mt-20 overflow-hidden rounded-2xl bg-[#0a0a0a] px-8 py-16 text-center lg:px-20">
            <span className="inline-flex rounded-full border border-white/15 bg-white/8 px-5 py-2 text-[10px] font-bold uppercase tracking-[0.25em] text-white/70">
              Free Shipping
            </span>
            <h2 className="mt-5 text-4xl font-black text-white md:text-5xl">
              On All Orders Above ₹999
            </h2>
            <p className="mx-auto mt-4 max-w-md text-[14px] leading-7 text-white/45">
              Easy 7-day returns. Secure SSL checkout. Delivered in 3–5 days.
            </p>
            <Link to="/new-arrivals"
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-white px-8 py-3.5 text-[13px] font-black uppercase tracking-[0.12em] text-black transition hover:bg-orange-500 hover:text-white">
              Explore New Arrivals <FiArrowRight size={14} />
            </Link>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
};

export default Shop;
