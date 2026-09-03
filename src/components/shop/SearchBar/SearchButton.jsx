import { FiArrowRight } from "react-icons/fi";

const SearchButton = () => {
  return (
    <button
      type="submit"
      className="
        m-2
        flex
        h-12
        w-12
        items-center
        justify-center
        rounded-xl
        bg-black
        text-white
        transition-all
        duration-300
        hover:scale-105
        hover:bg-neutral-800
        active:scale-95
      "
    >
      <FiArrowRight size={18} />
    </button>
  );
};

export default SearchButton;
