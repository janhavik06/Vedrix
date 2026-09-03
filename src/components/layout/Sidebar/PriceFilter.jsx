import { useState } from "react";

const PriceFilter = ({ min = 499, max = 3999, value = 2000, onChange }) => {
  const [price, setPrice] = useState(value);

  const handleChange = (e) => {
    const newPrice = Number(e.target.value);
    setPrice(newPrice);

    if (onChange) {
      onChange(newPrice);
    }
  };

  return (
    <div className="border-b border-gray-200 pb-6">
      <h3 className="text-lg font-semibold mb-5">Price</h3>

      <input
        type="range"
        min={min}
        max={max}
        value={price}
        onChange={handleChange}
        className="
          w-full
          accent-black
          cursor-pointer
        "
      />

      <div className="flex justify-between mt-4 text-sm text-gray-600">
        <span>₹{min}</span>

        <span className="font-semibold text-black">₹{price}</span>

        <span>₹{max}</span>
      </div>
    </div>
  );
};

export default PriceFilter;
