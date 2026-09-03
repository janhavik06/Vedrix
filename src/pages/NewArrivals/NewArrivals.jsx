import { useEffect, useMemo, useState } from "react";
import { Navbar, Footer } from "../../components/layout";
import ArrivalHero from "../../components/newArrivals/ArrivalHero/ArrivalHero";
import ArrivalCard from "../../components/newArrivals/ArrivalGrid/ArrivalCard";
import TrendingNow from "../../components/newArrivals/TrendingNow/TrendingNow";
import { productAPI } from "../../services/api";
import {
  FiX, FiSliders, FiSearch, FiChevronDown,
} from "react-icons/fi";

/* ─── normalize ─────────────────────────── */
const normalize = (p) => ({
  ...p,
  category:    p.category?.name || p.category || "",
  color:       (() => { try { return JSON.parse(p.colors || "[]")[0] || ""; } catch { return p.color || ""; } })(),
  size:        (() => { try { return JSON.parse(p.sizes  || "[]");          } catch { return p.size  || []; } })(),
  colors:      (() => { try { return JSON.parse(p.colors || "[]");          } catch { return [];           } })(),
  isNew:       true,
  reviewCount: p.reviewCount || 0,
});

/* ─── chip ──────────────────────────────── */
const Chip = ({ label, onRemove }) => (
  <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-900 px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-white">
    {label}
    <button onClick={onRemove} className="ml-0.5 hover:text-gray-400 transition">
      <FiX size={10} />
    </button>
  </span>
);

/* ─── skeleton ──────────────────────────── */
const Skeleton = () => (
  <div className="grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
    {[...Array(8)].map((_, i) => (
      <div key={i}>
        <div className="aspect-square animate-pulse rounded-2xl bg-gray-100" />
        <div className="mt-4 space-y-2.5">
          <div className="h-2.5 w-16 animate-pulse rounded bg-gray-100" />
          <div className="h-3.5 w-full animate-pulse rounded bg-gray-100" />
          <div className="h-3 w-24 animate-pulse rounded bg-gray-100" />
          <div className="h-3 w-32 animate-pulse rounded bg-gray-100" />
        </div>
      </div>
    ))}
  </div>
);

/* ─── styled select ─────────────────────── */
const Select = ({ value, onChange, children }) => (
  <div className="relative">
    <select
      value={value}
      onChange={onChange}
      className="h-10 appearance-none rounded-xl border border-gray-200 bg-white pl-4 pr-9 text-[12px] font-semibold text-gray-700 outline-none transition focus:border-gray-900 cursor-pointer"
    >
      {children}
    </select>
    <FiChevronDown size={12} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
  </div>
);

/* ─── Main page ─────────────────────────── */
const NewArrivals = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [search,      setSearch]      = useState("");
  const [category,    setCategory]    = useState("All");
  const [sortBy,      setSortBy]      = useState("newest");
  const [filterSize,  setFilterSize]  = useState("");
  const [filterPrice, setFilterPrice] = useState("");

  useEffect(() => {
    productAPI.getAll({ limit: 100, sort: "createdAt", order: "desc" })
      .then((r) => setAllProducts((r.products || []).map(normalize)))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const categories = useMemo(() => {
    const cats = [...new Set(allProducts.map((p) => p.category).filter(Boolean))];
    return ["All", ...cats];
  }, [allProducts]);

  const allSizes = useMemo(() => {
    return [...new Set(allProducts.flatMap((p) => p.size || []))];
  }, [allProducts]);

  const clearAll = () => {
    setSearch(""); setCategory("All");
    setSortBy("newest"); setFilterSize(""); setFilterPrice("");
  };

  const filtered = useMemo(() => {
    let list = [...allProducts];
    if (search.trim()) list = list.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
    if (category !== "All") list = list.filter((p) => p.category === category);
    if (filterSize) list = list.filter((p) => p.size?.includes(filterSize));
    switch (filterPrice) {
      case "0-1000":    list = list.filter((p) => p.price <= 1000);                   break;
      case "1000-2000": list = list.filter((p) => p.price >= 1000 && p.price <= 2000); break;
      case "2000+":     list = list.filter((p) => p.price >= 2000);                   break;
      default: break;
    }
    switch (sortBy) {
      case "price-asc":  list.sort((a, b) => a.price - b.price);   break;
      case "price-desc": list.sort((a, b) => b.price - a.price);   break;
      case "rating":     list.sort((a, b) => b.rating - a.rating); break;
      default: break;
    }
    return list;
  }, [allProducts, search, category, sortBy, filterSize, filterPrice]);

  const trending = useMemo(() =>
    [...allProducts].sort((a, b) => b.rating - a.rating).slice(0, 4),
    [allProducts]
  );

  const chips = [
    ...(category !== "All"  ? [{ label: category,               remove: () => setCategory("All")    }] : []),
    ...(filterSize          ? [{ label: `Size: ${filterSize}`,   remove: () => setFilterSize("")     }] : []),
    ...(filterPrice         ? [{ label: `₹${filterPrice.replace("-", "–")}`, remove: () => setFilterPrice("") }] : []),
    ...(sortBy !== "newest" ? [{ label: sortBy.replace(/-/g," "),remove: () => setSortBy("newest")   }] : []),
    ...(search              ? [{ label: `"${search}"`,           remove: () => setSearch("")         }] : []),
  ];

  return (
    /*
      bg-[#0a0a0a] on the outer wrapper means the 72px gap behind the
      transparent navbar is dark — matches the hero image, no white flash.
    */
    <div className="bg-[#0a0a0a]">
      <Navbar />

      {/* Full-viewport hero — image starts at y=0 behind navbar */}
      <ArrivalHero />

      {/* White content area */}
      <div className="bg-white min-h-[70vh]">

        {/* ── Category tabs ── */}
        <div className="border-b border-gray-100 bg-white">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-10 xl:px-14">
            <div className="no-scrollbar flex items-center gap-3 overflow-x-auto py-4">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`shrink-0 rounded-full px-5 py-2 text-[11px] font-bold uppercase tracking-[0.1em] whitespace-nowrap transition-all duration-200
                    ${category === cat
                      ? "bg-gray-900 text-white"
                      : "border border-gray-200 text-gray-500 hover:border-gray-700 hover:text-gray-900"
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Main content ── */}
        <main className="mx-auto max-w-[1440px] px-6 lg:px-10 xl:px-14">

          {/* ── Toolbar row ── */}
          <div className="flex flex-col gap-3 py-6 sm:flex-row sm:items-center sm:justify-between">

            {/* Left: search + count */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <FiSearch size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search products…"
                  className="h-10 w-56 rounded-xl border border-gray-200 bg-white pl-9 pr-4 text-[13px] outline-none transition focus:border-gray-900 placeholder:text-gray-400"
                />
              </div>
              {!loading && (
                <p className="shrink-0 text-[12px] text-gray-400">
                  <span className="font-bold text-gray-900">{filtered.length}</span>
                  {" "}of{" "}
                  <span className="font-bold text-gray-900">{allProducts.length}</span>
                  {" "}items
                </p>
              )}
            </div>

            {/* Right: dropdowns */}
            <div className="flex flex-wrap items-center gap-2.5">
              <Select value={filterSize} onChange={(e) => setFilterSize(e.target.value)}>
                <option value="">All Sizes</option>
                {allSizes.map((s) => <option key={s} value={s}>{s}</option>)}
              </Select>
              <Select value={filterPrice} onChange={(e) => setFilterPrice(e.target.value)}>
                <option value="">All Prices</option>
                <option value="0-1000">Under ₹1,000</option>
                <option value="1000-2000">₹1,000 – ₹2,000</option>
                <option value="2000+">Above ₹2,000</option>
              </Select>
              <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="newest">Newest First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </Select>
            </div>
          </div>

          {/* ── Active chips ── */}
          {chips.length > 0 && (
            <div className="mb-6 flex flex-wrap items-center gap-2">
              <span className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-widest text-gray-400">
                <FiSliders size={11} /> Active:
              </span>
              {chips.map((c) => (
                <Chip key={c.label} label={c.label} onRemove={c.remove} />
              ))}
              <button
                onClick={clearAll}
                className="text-[10px] font-semibold text-gray-400 underline underline-offset-2 hover:text-gray-900 transition"
              >
                Clear all
              </button>
            </div>
          )}

          {/* ── Divider ── */}
          <div className="mb-8 h-px w-full bg-gray-100" />

          {/* ── Product grid ── */}
          {loading ? (
            <Skeleton />
          ) : filtered.length === 0 ? (
            <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
              <p className="text-[90px] font-black leading-none text-gray-100">0</p>
              <p className="mt-3 text-xl font-black text-gray-800">No products found</p>
              <p className="mt-2 text-sm text-gray-400">Try adjusting your filters or search.</p>
              <button
                onClick={clearAll}
                className="mt-6 rounded-full bg-gray-900 px-8 py-3 text-sm font-semibold text-white transition hover:bg-black"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
              {filtered.map((p) => (
                <ArrivalCard key={p.id} product={p} />
              ))}
            </div>
          )}

          {/* ── Trending section ── */}
          {!loading && trending.length > 0 && (
            <div className="mt-20 border-t border-gray-100 pb-16">
              <TrendingNow products={trending} />
            </div>
          )}

        </main>
      </div>

      <Footer />
    </div>
  );
};

export default NewArrivals;
