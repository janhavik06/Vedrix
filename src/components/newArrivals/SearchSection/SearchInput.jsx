import { FiSearch } from "react-icons/fi";

const SearchInput = ({ value, onChange }) => {
  return (
    <div className="relative flex-1">
      <FiSearch
        size={20}
        className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-400"
      />

      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Search hoodies, t-shirts, shirts..."
        className="h-14 w-full rounded-2xl border border-transparent bg-neutral-50 pl-14 pr-5 text-base outline-none transition-all duration-300 focus:border-black focus:bg-white"
      />
    </div>
  );
};

export default SearchInput;
