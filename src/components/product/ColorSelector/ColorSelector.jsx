import { useState } from "react";

const defaultColors = [
  {
    name: "Black",
    code: "#000000",
  },
  {
    name: "White",
    code: "#FFFFFF",
  },
  {
    name: "Olive",
    code: "#556B2F",
  },
];

const ColorSelector = ({ colors = defaultColors, onChange }) => {
  const [selectedColor, setSelectedColor] = useState("");

  const handleSelect = (color) => {
    setSelectedColor(color.name);

    if (onChange) {
      onChange(color.name);
    }
  };

  return (
    <div className="mt-10">
      <h3 className="font-semibold text-lg mb-4">Select Color</h3>

      <div className="flex gap-4">
        {colors.map((color) => (
          <button
            key={color.name}
            onClick={() => handleSelect(color)}
            className={`
              h-12
              w-12
              rounded-full
              border-2
              transition

              ${
                selectedColor === color.name
                  ? "border-black scale-110"
                  : "border-gray-300"
              }
            `}
          >
            <span
              className="block h-8 w-8 rounded-full mx-auto"
              style={{
                backgroundColor: color.code,
              }}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ColorSelector;
