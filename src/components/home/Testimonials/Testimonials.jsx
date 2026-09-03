import { useEffect, useState } from "react";
import TestimonialCard from "./TestimonialCard";
import { productAPI } from "../../../services/api";

/* Pull real reviews from DB (from the latest 3 reviewed products) */
const useReviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    /* Fetch top-rated products, then get their reviews */
    productAPI.getAll({ limit: 6, sort: "rating", order: "desc" })
      .then(async (res) => {
        const products = res.products || [];
        const reviewPromises = products.slice(0, 3).map((p) =>
          fetch(`http://localhost:5000/api/reviews/${p.id}`)
            .then((r) => r.json())
            .then((d) => (d.reviews || []).slice(0, 1).map((r) => ({ ...r, productName: p.name })))
            .catch(() => [])
        );
        const nested = await Promise.all(reviewPromises);
        const flat   = nested.flat();

        if (flat.length > 0) {
          setReviews(flat.slice(0, 3));
        } else {
          /* fallback to static */
          setReviews(STATIC);
        }
      })
      .catch(() => setReviews(STATIC));
  }, []);

  return reviews;
};

const STATIC = [
  { id: 1, user: { name: "Rahul Sharma"  }, rating: 5, body: "The hoodie quality exceeded my expectations. Super soft fabric and a perfect oversized fit.", productName: "Essential Black Hoodie"    },
  { id: 2, user: { name: "Aarav Patel"   }, rating: 5, body: "Minimal design, premium quality, and fast delivery. Vedrix has become my go-to brand.",       productName: "Classic White T-Shirt"    },
  { id: 3, user: { name: "Sneha Joshi"   }, rating: 5, body: "Loved the oversized tee! The fabric feels premium and the fit is exactly what I wanted.",       productName: "Oversized Black Tee"      },
];

const Testimonials = () => {
  const reviews = useReviews();

  return (
    <section className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">Customer Stories</p>
          <h2 className="mt-4 text-5xl font-black tracking-tight text-gray-900">What They Say</h2>

          {/* Rating summary */}
          <div className="mt-8 inline-flex items-center gap-5 rounded-2xl border border-gray-100 bg-[#f8f8f6] px-8 py-4 shadow-sm">
            <div className="text-center">
              <p className="text-3xl font-black text-gray-900">4.9</p>
              <p className="text-[10px] uppercase tracking-widest text-gray-400">Rating</p>
            </div>
            <div className="h-10 w-px bg-gray-200" />
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-xl text-yellow-400">★</span>
              ))}
            </div>
            <div className="h-10 w-px bg-gray-200" />
            <div className="text-center">
              <p className="text-3xl font-black text-gray-900">2,400+</p>
              <p className="text-[10px] uppercase tracking-widest text-gray-400">Reviews</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-7">
          {(reviews.length > 0 ? reviews : STATIC).map((r, i) => (
            <TestimonialCard key={r.id || i} testimonial={r} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
