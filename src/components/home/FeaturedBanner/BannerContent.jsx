import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

const BannerContent = () => {
  return (
    <div className="text-white max-w-xl">
      <span className="uppercase tracking-[5px] text-sm text-orange-400">
        Vedrix Exclusive
      </span>

      <h2 className="mt-6 text-5xl lg:text-6xl font-black leading-tight">
        Designed
        <br />
        For Everyday
        <br />
        Confidence.
      </h2>

      <p className="mt-6 text-lg text-gray-300 leading-8">
        Discover timeless hoodies and premium oversized t-shirts crafted for
        comfort, confidence, and everyday streetwear.
      </p>

      <div className="flex gap-5 mt-10">
        <Link
          to="/shop"
          className="bg-white text-black px-8 py-4 rounded-xl font-semibold hover:bg-orange-500 hover:text-white transition flex items-center gap-2"
        >
          Shop Now
          <FiArrowRight />
        </Link>

        <Link
          to="/collections"
          className="border border-white px-8 py-4 rounded-xl hover:bg-white hover:text-black transition"
        >
          View Collection
        </Link>
      </div>
    </div>
  );
};

export default BannerContent;
