import { FiRotateCcw, FiSliders } from "react-icons/fi";
import FilterSection from "./FilterSection";
import CategoryFilter from "./CategoryFilter";
import PriceFilter from "./PriceFilter";
import ColorFilter from "./ColorFilter";
import SizeFilter from "./SizeFilter";
import AvailabilityFilter from "./AvailabilityFilter";

const MAX_PRICE = 5000;

const ProductFilter = ({
  categories,   onCategoryChange,
  maxPrice,     onPriceChange,
  colors,       onColorChange,
  sizes,        onSizeChange,
  availability, onAvailabilityChange,
  onClear,
}) => {
  const hasActive =
    categories.length > 0 ||
    maxPrice < MAX_PRICE ||
    colors.length > 0 ||
    sizes.length > 0 ||
    availability.length < 2;

  return (
    <aside className="sticky top-24 overflow-hidden rounded-[30px] border border-neutral-200 bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-neutral-100 px-6 py-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-black text-white">
              <FiSliders size={16} />
            </div>
            <div>
              <h2 className="font-black text-neutral-900">Filters</h2>
              {hasActive && (
                <p className="text-[10px] font-semibold text-orange-500 uppercase tracking-wider">
                  Active
                </p>
              )}
            </div>
          </div>
          <button
            onClick={onClear}
            disabled={!hasActive}
            className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition-all duration-200 ${
              hasActive
                ? "bg-black text-white hover:bg-red-600"
                : "border border-neutral-200 text-neutral-400 cursor-not-allowed"
            }`}
          >
            <FiRotateCcw size={11} />
            Clear
          </button>
        </div>
      </div>

      {/* Filter sections */}
      <div className="divide-y divide-neutral-100">
        <FilterSection title="Category">
          <CategoryFilter selected={categories} onChange={onCategoryChange} />
        </FilterSection>

        <FilterSection title="Price Range">
          <PriceFilter value={maxPrice} onChange={onPriceChange} />
        </FilterSection>

        <FilterSection title="Color">
          <ColorFilter selected={colors} onChange={onColorChange} />
        </FilterSection>

        <FilterSection title="Size">
          <SizeFilter selected={sizes} onChange={onSizeChange} />
        </FilterSection>

        <FilterSection title="Availability">
          <AvailabilityFilter
            selected={availability}
            onChange={onAvailabilityChange}
          />
        </FilterSection>
      </div>
    </aside>
  );
};

export default ProductFilter;
