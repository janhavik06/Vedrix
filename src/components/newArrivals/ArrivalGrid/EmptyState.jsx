import { FiPackage } from "react-icons/fi";

const EmptyState = () => {
  return (
    <div className="rounded-[28px] border border-dashed border-neutral-300 bg-white px-8 py-24 text-center">
      <FiPackage size={48} className="mx-auto text-neutral-400" />

      <h2 className="mt-6 text-3xl font-bold text-neutral-900">
        No Products Found
      </h2>

      <p className="mt-3 text-neutral-500">
        Try changing your search or filters.
      </p>

      <button className="mt-8 rounded-2xl bg-black px-8 py-4 font-semibold text-white transition hover:bg-neutral-800">
        Reset Filters
      </button>
    </div>
  );
};

export default EmptyState;
