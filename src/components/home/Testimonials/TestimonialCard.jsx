import { FiStar, FiCheckCircle } from "react-icons/fi";

const avatarColors = [
  "bg-orange-500", "bg-gray-900", "bg-stone-600",
  "bg-orange-400", "bg-gray-700",
];

const TestimonialCard = ({ testimonial, index = 0 }) => {
  const name   = testimonial.user?.name || testimonial.name || "Customer";
  const body   = testimonial.body   || testimonial.review || "";
  const rating = testimonial.rating || 5;
  const product = testimonial.productName || testimonial.product || null;

  return (
    <div className="group flex flex-col justify-between rounded-[28px] border border-gray-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Stars */}
      <div>
        <div className="flex gap-0.5 mb-5">
          {[...Array(5)].map((_, i) => (
            <FiStar
              key={i}
              size={14}
              className={i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-200"}
            />
          ))}
        </div>

        <p className="text-[15px] italic leading-[1.8] text-gray-700">
          "{body}"
        </p>

        {product && (
          <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-gray-100 bg-gray-50 px-4 py-1.5">
            <span className="text-[10px] font-semibold text-gray-400">Purchased:</span>
            <span className="text-[10px] font-bold text-gray-900">{product}</span>
          </div>
        )}
      </div>

      {/* Author */}
      <div className="mt-7 flex items-center gap-4">
        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${avatarColors[index % avatarColors.length]} text-lg font-black text-white ring-4 ring-offset-2 ring-orange-500/15`}>
          {name.charAt(0).toUpperCase()}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <p className="font-bold text-gray-900">{name}</p>
            <FiCheckCircle size={13} className="text-orange-500" title="Verified Purchase" />
          </div>
          <p className="text-xs text-gray-400">Verified Customer</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
