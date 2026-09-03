import { FiSearch } from "react-icons/fi";

const SearchInput = ({ value, onChange, placeholder }) => {
  return (
    <div className="flex flex-1 items-center px-5">
      <FiSearch size={20} className="mr-3 text-neutral-400" />

      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="
          w-full
          bg-transparent
          py-4
          text-sm
          font-medium
          text-neutral-800
          placeholder:text-neutral-400
          outline-none
        "
      />
    </div>
  );
};

export default SearchInput;
