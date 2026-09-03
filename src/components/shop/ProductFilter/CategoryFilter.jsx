const categories = ["Hoodies", "T-Shirts", "Shirts", "Joggers", "Accessories"];

const CategoryFilter = ({ selected = [], onChange }) => {
  const toggle = (cat) => {
    const next = selected.includes(cat)
      ? selected.filter((c) => c !== cat)
      : [...selected, cat];
    onChange(next);
  };

  return (
    <div className="space-y-2">
      {categories.map((cat) => {
        const active = selected.includes(cat);
        return (
          <button
            key={cat}
            onClick={() => toggle(cat)}
            className={`flex w-full items-center justify-between border px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
              active
                ? "border-black bg-black text-white"
                : "border-neutral-200 bg-white text-neutral-700 hover:border-black hover:bg-neutral-50"
            }`}
          >
            <span>{cat}</span>
            {active && (
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-white/20 text-[10px] font-black">
                ✓
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default CategoryFilter;
