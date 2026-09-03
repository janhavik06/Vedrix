import { useState } from "react";

const availableSizes = ["S", "M", "L", "XL"];

const SizeSelector = ({ sizes = availableSizes, onChange }) => {
  const [selectedSize, setSelectedSize] = useState("");

  const handleSelect = (size) => {
    setSelectedSize(size);

    if (onChange) {
      onChange(size);
    }
  };

  return (
    <div className="mt-10">
      <h3 className="font-semibold text-lg mb-4">Select Size</h3>

      <div className="flex gap-3 flex-wrap">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => handleSelect(size)}
            className={`
              h-12
              w-12
              rounded-xl
              border
              font-semibold
              transition-all
              duration-300

              ${
                selectedSize === size
                  ? "bg-black text-white border-black"
                  : "hover:border-black"
              }
            `}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SizeSelector;
