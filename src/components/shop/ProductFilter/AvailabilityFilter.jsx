import { FiCheck } from "react-icons/fi";

const options = [
  { label: "In Stock",     value: "in-stock"    },
  { label: "Out of Stock", value: "out-of-stock" },
];

const AvailabilityFilter = ({ selected = ["in-stock"], onChange }) => {
  const toggle = (value) => {
    const next = selected.includes(value)
      ? selected.filter((v) => v !== value)
      : [...selected, value];
    onChange(next);
  };

  return (
    <div className="space-y-2">
      {options.map((opt) => {
        const active = selected.includes(opt.value);
        return (
          <button
            key={opt.value}
            onClick={() => toggle(opt.value)}
            className={`flex w-full items-center justify-between border px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
              active
                ? "border-black bg-black text-white"
                : "border-neutral-200 bg-white text-neutral-700 hover:border-black hover:bg-neutral-50"
            }`}
          >
            <span>{opt.label}</span>
            {active && <FiCheck size={13} />}
          </button>
        );
      })}
    </div>
  );
};

export default AvailabilityFilter;
