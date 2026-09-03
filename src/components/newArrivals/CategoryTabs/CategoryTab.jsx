const CategoryTab = ({ category, active, onClick, count }) => {
  return (
    <button
      onClick={onClick}
      className={`relative inline-flex items-center gap-2 rounded-full border px-6 py-2.5 text-sm font-semibold tracking-wide transition-all duration-300
        ${
          active
            ? "border-black bg-black text-white shadow-lg shadow-black/20"
            : "border-neutral-200 bg-white text-neutral-700 hover:border-black hover:-translate-y-0.5 hover:shadow-md"
        }`}
    >
      {category}
      {count !== undefined && (
        <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
          active ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"
        }`}>
          {count}
        </span>
      )}
    </button>
  );
};

export default CategoryTab;
