import { FiShoppingBag } from "react-icons/fi";

const ProductActions = () => {
  return (
    <button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-black py-4 font-semibold text-white transition hover:bg-neutral-800">
      <FiShoppingBag />
      Add To Cart
    </button>
  );
};

export default ProductActions;
