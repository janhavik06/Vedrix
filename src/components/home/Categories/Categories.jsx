import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import CategoryCard from "./CategoryCard";

import hoodieImg  from "../../../assets/images/categories/hoodies.jpg";
import tshirtImg  from "../../../assets/images/categories/tshirts.jpg";
import shirtImg   from "../../../assets/images/categories/shirts.jpg";
import bottomImg  from "../../../assets/images/categories/bottomwear.jpg";
import accessImg  from "../../../assets/images/categories/accessories.jpg";

const FALLBACK = {
  hoodies:     { image: hoodieImg,  subtitle: "Premium Comfort"   },
  tshirts:     { image: tshirtImg,  subtitle: "Everyday Essential" },
  shirts:      { image: shirtImg,   subtitle: "Relaxed Smart"      },
  joggers:     { image: bottomImg,  subtitle: "Street Bottoms"     },
  accessories: { image: accessImg,  subtitle: "Finish The Look"    },
};

const STATIC_FALLBACK = [
  { id: 1, name: "Hoodies",    slug: "hoodies",     ...FALLBACK.hoodies     },
  { id: 2, name: "T-Shirts",   slug: "tshirts",     ...FALLBACK.tshirts     },
  { id: 3, name: "Shirts",     slug: "shirts",      ...FALLBACK.shirts      },
  { id: 4, name: "Joggers",    slug: "joggers",     ...FALLBACK.joggers     },
  { id: 5, name: "Accessories",slug: "accessories", ...FALLBACK.accessories },
];

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading,    setLoading]    = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/admin/categories", {
      headers: { Authorization: `Bearer ${localStorage.getItem("vedrix_token") || ""}` },
    })
      .then((r) => r.json())
      .then((res) => {
        const cats = (res.categories || []).map((c) => {
          const fb = FALLBACK[c.slug] || FALLBACK.hoodies;
          return {
            ...c,
            image:    c.image || fb.image,
            subtitle: fb.subtitle || "Explore Now",
            link:     `/shop?category=${encodeURIComponent(c.name)}`,
          };
        });
        setCategories(cats.length > 0 ? cats : STATIC_FALLBACK.map((c) => ({ ...c, link: `/shop?category=${encodeURIComponent(c.name)}` })));
      })
      .catch(() => setCategories(STATIC_FALLBACK.map((c) => ({ ...c, link: `/shop?category=${encodeURIComponent(c.name)}` }))))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="bg-[#f8f8f6] py-24">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-16 xl:px-20">

        {/* Header */}
        <div className="mb-12 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-gray-400">Shop by Category</p>
            <h2 className="mt-3 text-5xl font-black tracking-tight text-gray-900">Find Your Style</h2>
          </div>
          <Link
            to="/shop"
            className="group inline-flex w-fit shrink-0 items-center gap-2 rounded-full border-2 border-gray-900 px-7 py-3 text-[12px] font-black uppercase tracking-[0.12em] text-gray-900 transition-all duration-300 hover:bg-gray-900 hover:text-white"
          >
            All Categories <FiArrowRight size={13} className="transition group-hover:translate-x-0.5" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="aspect-[2/3] animate-pulse rounded-2xl bg-gray-200" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
            {categories.map((cat) => (
              <CategoryCard key={cat.id} category={cat} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Categories;
