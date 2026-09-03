const ColorFilter = ({ value, options, onChange }) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
        Color
      </label>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="min-w-[170px] rounded-xl border border-neutral-300 bg-white px-4 py-3 outline-none transition hover:border-black"
      >
        <option value="">All Colors</option>

        {options.map((color) => (
          <option key={color} value={color}>
            {color}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ColorFilter;
