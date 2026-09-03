const SizeFilter = ({ value, options, onChange }) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
        Size
      </label>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="min-w-[150px] rounded-xl border border-neutral-300 bg-white px-4 py-3 outline-none transition hover:border-black"
      >
        <option value="">All Sizes</option>

        {options.map((size) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SizeFilter;
