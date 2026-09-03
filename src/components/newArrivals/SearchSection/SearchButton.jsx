import { FiArrowRight } from "react-icons/fi";

const SearchButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="group flex h-14 items-center justify-center gap-3 rounded-2xl bg-black px-8 font-semibold text-white transition-all duration-300 hover:bg-neutral-800"
    >
      Search
      <FiArrowRight
        size={18}
        className="transition-transform duration-300 group-hover:translate-x-1"
      />
    </button>
  );
};

export default SearchButton;
