import SearchInput from "./SearchInput";
import SearchButton from "./SearchButton";

const SearchBar = ({
  value,
  onChange,
  onSearch,
  placeholder = "Search jackets, shirts, sneakers...",
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch?.();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="
    group
    flex
    flex-1
    min-w-0
    items-center
    overflow-hidden
    rounded-2xl
    border
    border-neutral-200
    bg-white
    shadow-sm
    transition-all
    duration-300
    hover:border-neutral-400
    hover:shadow-md
    focus-within:border-black
    focus-within:ring-4
    focus-within:ring-black/5
  "
    >
      <SearchInput
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />

      <SearchButton />
    </form>
  );
};

export default SearchBar;
