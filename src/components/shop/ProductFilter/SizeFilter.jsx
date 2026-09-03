const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

const SizeFilter = ({ selected = [], onChange }) => {
  const toggle = (size) => {
    const next = selected.includes(size)
      ? selected.filter((s) => s !== size)
      : [...selected, size];
    onChange(next);
  };

  return (
    <div className="grid grid-cols-3 gap-2">
      {sizes.map((size) => {
        const active = selected.includes(size);
        return (
          <button
            key={size}
            onClick={() => toggle(size)}
            className={`border py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
              active
                ? "border-black bg-black text-white"
                : "border-neutral-200 bg-white text-neutral-600 hover:border-black hover:bg-neutral-50"
            }`}
          >
            {size}
          </button>
        );
      })}
    </div>
  );
};

export default SizeFilter;
