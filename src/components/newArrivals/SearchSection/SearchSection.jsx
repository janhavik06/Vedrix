import SearchInput from "./SearchInput";
import SearchButton from "./SearchButton";

const SearchSection = ({ value, onChange, onSearch }) => {
  return (
    <section className="my-10">
      <div className="rounded-[30px] border border-neutral-200 bg-white p-2 shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row">
          <SearchInput value={value} onChange={onChange} />

          <SearchButton onClick={onSearch} />
        </div>
      </div>
    </section>
  );
};

export default SearchSection;
