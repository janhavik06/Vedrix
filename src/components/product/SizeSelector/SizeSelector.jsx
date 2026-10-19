import { useState } from "react";

const availableSizes = ["S", "M", "L", "XL"];

/**
 * Works on its own (keeps its own selection) or controlled from outside with
 * `value`. `disabled` lists the sizes that are sold out.
 */
const SizeSelector = ({ sizes = availableSizes, value, onChange, disabled = [] }) => {
  const [internal, setInternal] = useState("");
  const selected = value !== undefined ? value : internal;

  const handleSelect = (size) => {
    if (disabled.includes(size)) return;
    setInternal(size);

    if (onChange) {
      onChange(size);
    }
  };

  return (
    <div className="mt-10">
      <h3 className="font-semibold text-lg mb-4">Select Size</h3>

      <div className="flex gap-3 flex-wrap">
        {sizes.map((size) => {
          const soldOut = disabled.includes(size);

          return (
            <button
              key={size}
              type="button"
              onClick={() => handleSelect(size)}
              disabled={soldOut}
              title={soldOut ? "Sold out" : undefined}
              className={`
                h-12
                min-w-12
                rounded-xl
                border
                px-3
                font-semibold
                transition-all
                duration-300

                ${
                  selected === size
                    ? "bg-black text-white border-black"
                    : soldOut
                    ? "cursor-not-allowed border-gray-200 text-gray-300 line-through"
                    : "hover:border-black"
                }
              `}
            >
              {size}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SizeSelector;