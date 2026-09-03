import CategoryFilter from "./CategoryFilter";
import PriceFilter from "./PriceFilter";
import ColorFilter from "./ColorFilter";
import SizeFilter from "./SizeFilter";

const Sidebar = ({ filters, setFilters, onClearFilters }) => {
  return (
    <aside
      className="
        w-full
        lg:w-72
        bg-white
        rounded-2xl
        border
        border-gray-200
        shadow-sm
        p-6
        sticky
        top-28
        h-fit
      "
    >
      {/* Header */}

      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold">Filters</h2>

        <button
          onClick={onClearFilters}
          className="
            text-sm
            font-medium
            text-red-500
            hover:text-red-600
            transition
          "
        >
          Clear All
        </button>
      </div>

      {/* Category */}

      <CategoryFilter
        selectedCategory={filters.category}
        onChange={(category) =>
          setFilters((prev) => ({
            ...prev,
            category,
          }))
        }
      />

      {/* Price */}

      <div className="mt-7">
        <PriceFilter
          value={filters.price}
          onChange={(price) =>
            setFilters((prev) => ({
              ...prev,
              price,
            }))
          }
        />
      </div>

      {/* Color */}

      <div className="mt-7">
        <ColorFilter
          onChange={(color) =>
            setFilters((prev) => ({
              ...prev,
              color,
            }))
          }
        />
      </div>

      {/* Size */}

      <div className="mt-7">
        <SizeFilter
          onChange={(sizes) =>
            setFilters((prev) => ({
              ...prev,
              sizes,
            }))
          }
        />
      </div>
    </aside>
  );
};

export default Sidebar;
