import { Link } from "react-router-dom";
import { FiShoppingBag } from "react-icons/fi";
import { useCart } from "../../../context/CartContext";

const CartIcon = ({ light = false }) => {
  const { cartCount } = useCart();

  return (
    <Link
      to="/cart"
      aria-label="Cart"
      className={`relative flex h-9 w-9 items-center justify-center rounded-full transition-all duration-300
        ${light
          ? "text-white/90 hover:bg-white/15 hover:text-white"
          : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
        }`}
    >
      <FiShoppingBag size={19} />
      {cartCount > 0 && (
        <span className="absolute -right-0.5 -top-0.5 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-orange-500 text-[9px] font-black text-white ring-2 ring-white">
          {cartCount > 9 ? "9+" : cartCount}
        </span>
      )}
    </Link>
  );
};

export default CartIcon;
