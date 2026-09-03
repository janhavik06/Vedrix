import { useState } from "react";

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

const SizeFilter = ({ onChange }) => {
  const [selectedSizes, setSelectedSizes] = useState([]);

  const handleSelect = (size) => {
    let updatedSizes;

    if (selectedSizes.includes(size)) {
      updatedSizes = selectedSizes.filter((item) => item !== size);
    } else {
      updatedSizes = [...selectedSizes, size];
    }

    setSelectedSizes(updatedSizes);

    if (onChange) {
      onChange(updatedSizes);
    }
  };

  return (
    <div className="border-b border-gray-200 pb-6">
      <h3 className="text-lg font-semibold mb-5">Size</h3>

      <div className="flex flex-wrap gap-3">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => handleSelect(size)}
            className={`
              w-12
              h-12
              rounded-xl
              border
              text-sm
              font-semibold
              transition-all
              duration-300

              ${
                selectedSizes.includes(size)
                  ? "bg-black text-white border-black shadow-md scale-105"
                  : "bg-white text-gray-700 border-gray-300 hover:border-black hover:scale-105"
              }
            `}
          >
            {size}
          </button>
        ))}
      </div>

      {selectedSizes.length > 0 && (
        <p className="mt-5 text-sm text-gray-600">
          Selected :
          <span className="font-semibold text-black ml-1">
            {selectedSizes.join(", ")}
          </span>
        </p>
      )}
    </div>
  );
};

export default SizeFilter;
