import { useState } from "react";

const colors = [
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
  {
    name: "Navy",
    code: "#1E3A8A",
  },
  {
    name: "Brown",
    code: "#8B5A2B",
  },
  {
    name: "Grey",
    code: "#808080",
  },
];

const ColorFilter = ({ onChange }) => {
  const [selectedColor, setSelectedColor] = useState("");

  const handleSelect = (color) => {
    const newColor = selectedColor === color ? "" : color;

    setSelectedColor(newColor);

    if (onChange) {
      onChange(newColor);
    }
  };

  return (
    <div className="border-b border-gray-200 pb-6">
      <h3 className="text-lg font-semibold mb-5">Color</h3>

      <div className="flex flex-wrap gap-3">
        {colors.map((color) => (
          <button
            key={color.name}
            onClick={() => handleSelect(color.name)}
            title={color.name}
            className={`
              h-10
              w-10
              rounded-full
              border-2
              transition-all
              duration-300
              flex
              items-center
              justify-center
              ${
                selectedColor === color.name
                  ? "border-black scale-110"
                  : "border-gray-300 hover:scale-105"
              }
            `}
          >
            <span
              className="h-7 w-7 rounded-full border"
              style={{
                backgroundColor: color.code,
              }}
            />
          </button>
        ))}
      </div>

      {selectedColor && (
        <p className="mt-5 text-sm text-gray-600">
          Selected :
          <span className="font-semibold text-black ml-1">{selectedColor}</span>
        </p>
      )}
    </div>
  );
};

export default ColorFilter;
