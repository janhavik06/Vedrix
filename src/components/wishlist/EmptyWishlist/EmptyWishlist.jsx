import { Link } from "react-router-dom";
import { FiHeart } from "react-icons/fi";

const EmptyWishlist = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <FiHeart className="mb-6 text-7xl text-gray-300" />

      <h2 className="mb-3 text-3xl font-bold">Your Wishlist is Empty</h2>

      <p className="mb-8 max-w-md text-gray-500">
        Save your favourite products here and shop them later.
      </p>

      <Link
        to="/shop"
        className="rounded-lg bg-black px-6 py-3 text-white transition hover:bg-gray-800"
      >
        Continue Shopping
      </Link>
    </div>
  );
};

export default EmptyWishlist;
