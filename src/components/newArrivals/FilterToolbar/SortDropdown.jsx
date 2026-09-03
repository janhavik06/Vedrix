const SortDropdown = ({ value, options, onChange }) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
        Sort By
      </label>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="min-w-[220px] rounded-xl border border-neutral-300 bg-white px-4 py-3 outline-none transition hover:border-black"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SortDropdown;
