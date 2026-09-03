import { FiCheck } from "react-icons/fi";

const colors = [
  { name: "Black",  hex: "#111111" },
  { name: "White",  hex: "#FFFFFF" },
  { name: "Blue",   hex: "#3B6FBA" },
  { name: "Olive",  hex: "#6B6B47" },
  { name: "Beige",  hex: "#D4C5A9" },
  { name: "Gray",   hex: "#9CA3AF" },
];

const ColorFilter = ({ selected = [], onChange }) => {
  const toggle = (name) => {
    const next = selected.includes(name)
      ? selected.filter((c) => c !== name)
      : [...selected, name];
    onChange(next);
  };

  return (
    <div className="space-y-2">
      {colors.map((color) => {
        const active = selected.includes(color.name);
        return (
          <button
            key={color.name}
            onClick={() => toggle(color.name)}
            title={color.name}
            className={`flex w-full items-center gap-3 border px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
              active
                ? "border-black bg-black text-white"
                : "border-neutral-200 bg-white text-neutral-700 hover:border-black hover:bg-neutral-50"
            }`}
          >
            {/* Swatch */}
            <span
              className="h-4 w-4 shrink-0 rounded-full border border-gray-300"
              style={{ backgroundColor: color.hex }}
            />
            <span className="flex-1 text-left">{color.name}</span>
            {active && <FiCheck size={13} />}
          </button>
        );
      })}
    </div>
  );
};

export default ColorFilter;
