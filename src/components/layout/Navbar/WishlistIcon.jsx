import { Link } from "react-router-dom";
import { FiHeart } from "react-icons/fi";
import { useWishlist } from "../../../context/WishlistContext";

const WishlistIcon = ({ light = false }) => {
  const { wishlistItems } = useWishlist();
  const count = wishlistItems.length;

  return (
    <Link
      to="/wishlist"
      aria-label="Wishlist"
      className={`relative flex h-9 w-9 items-center justify-center rounded-full transition-all duration-300
        ${light
          ? "text-white/90 hover:bg-white/15 hover:text-white"
          : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
        }`}
    >
      <FiHeart size={19} />
      {count > 0 && (
        <span className="absolute -right-0.5 -top-0.5 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-red-500 text-[9px] font-black text-white ring-2 ring-white">
          {count > 9 ? "9+" : count}
        </span>
      )}
    </Link>
  );
};

export default WishlistIcon;
