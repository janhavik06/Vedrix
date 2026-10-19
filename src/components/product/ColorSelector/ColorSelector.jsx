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

/**
 * Works on its own (keeps its own selection) or controlled from outside with
 * `value` (the color name). `disabled` lists the color names that are sold out.
 */
const ColorSelector = ({ colors = defaultColors, value, onChange, disabled = [] }) => {
  const [internal, setInternal] = useState("");
  const selected = value !== undefined ? value : internal;

  const handleSelect = (color) => {
    if (disabled.includes(color.name)) return;
    setInternal(color.name);

    if (onChange) {
      onChange(color.name);
    }
  };

  return (
    <div className="mt-10">
      <h3 className="font-semibold text-lg mb-4">
        Select Color
        {selected && (
          <span className="ml-3 text-sm font-normal text-gray-500">{selected}</span>
        )}
      </h3>

      <div className="flex gap-4 flex-wrap">
        {colors.map((color) => {
          const soldOut = disabled.includes(color.name);

          return (
            <button
              key={color.name}
              type="button"
              onClick={() => handleSelect(color)}
              disabled={soldOut}
              title={soldOut ? `${color.name} (sold out)` : color.name}
              className={`
                relative
                h-12
                w-12
                rounded-full
                border-2
                transition

                ${
                  selected === color.name
                    ? "border-black scale-110"
                    : "border-gray-300"
                }
                ${soldOut ? "cursor-not-allowed opacity-40" : ""}
              `}
            >
              <span
                className="mx-auto block h-8 w-8 rounded-full border border-gray-200"
                style={{
                  backgroundColor: color.code,
                }}
              />
              {soldOut && (
                <span className="pointer-events-none absolute left-1/2 top-1/2 h-0.5 w-9 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-gray-500" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ColorSelector;