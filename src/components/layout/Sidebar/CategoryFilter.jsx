import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const categories = ["All", "Hoodies", "T-Shirts", "Oversized"];

const CategoryFilter = ({ selectedCategory = "All", onChange }) => {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="border-b border-gray-200 pb-6">
      {/* Heading */}

      <button
        onClick={() => setExpanded(!expanded)}
        className="
          w-full
          flex
          justify-between
          items-center
        "
      >
        <h3 className="text-lg font-semibold">Category</h3>

        {expanded ? <FiChevronUp /> : <FiChevronDown />}
      </button>

      {/* Options */}

      {expanded && (
        <div className="mt-5 flex flex-col gap-4">
          {categories.map((category) => (
            <label
              key={category}
              className="
                flex
                items-center
                gap-3
                cursor-pointer
                group
              "
            >
              <input
                type="radio"
                name="category"
                checked={selectedCategory === category}
                onChange={() => onChange && onChange(category)}
                className="
                  h-4
                  w-4
                  accent-black
                "
              />

              <span
                className="
                  text-gray-700
                  group-hover:text-black
                  transition
                "
              >
                {category}
              </span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryFilter;
