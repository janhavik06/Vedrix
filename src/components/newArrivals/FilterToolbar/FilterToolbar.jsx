import PriceFilter from "./PriceFilter";
import SizeFilter from "./SizeFilter";
import ColorFilter from "./ColorFilter";
import SortDropdown from "./SortDropdown";

const FilterToolbar = ({
  filters,
  onFilterChange,
  sort,
  onSortChange,
  priceRanges,
  sizes,
  colors,
  sortOptions,
}) => {
  return (
    <section className="my-10 rounded-[28px] border border-neutral-200 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-center gap-5">
        <PriceFilter
          value={filters.price}
          options={priceRanges}
          onChange={(value) => onFilterChange("price", value)}
        />

        <SizeFilter
          value={filters.size}
          options={sizes}
          onChange={(value) => onFilterChange("size", value)}
        />

        <ColorFilter
          value={filters.color}
          options={colors}
          onChange={(value) => onFilterChange("color", value)}
        />

        <div className="ml-auto">
          <SortDropdown
            value={sort}
            options={sortOptions}
            onChange={onSortChange}
          />
        </div>
      </div>
    </section>
  );
};

export default FilterToolbar;
