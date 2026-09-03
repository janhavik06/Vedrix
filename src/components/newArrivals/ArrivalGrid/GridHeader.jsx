const GridHeader = ({ totalProducts, sort, onSortChange }) => {
  return (
    <div className="flex flex-col items-start justify-between gap-5 border-b border-neutral-200 pb-6 md:flex-row md:items-center">
      <div>
        <h2 className="text-2xl font-bold text-neutral-900">
          Latest Collection
        </h2>

        <p className="mt-1 text-neutral-500">
          Showing {totalProducts} products
        </p>
      </div>

      {/* <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-neutral-500">Sort By</span>

        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value)}
          className="rounded-xl border border-neutral-300 bg-white px-5 py-3 outline-none transition hover:border-black"
        >
          <option>Newest</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
          <option>Best Selling</option>
        </select>
      </div> */}
    </div>
  );
};

export default GridHeader;
