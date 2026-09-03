const CollectionStats = ({ totalProducts }) => {
  return (
    <div className="grid grid-cols-3 gap-10">
      <div>
        <h3 className="text-3xl font-bold text-neutral-900">
          {totalProducts}+
        </h3>

        <p className="mt-2 text-sm uppercase tracking-wider text-neutral-500">
          Products
        </p>
      </div>

      <div>
        <h3 className="text-3xl font-bold text-neutral-900">2026</h3>

        <p className="mt-2 text-sm uppercase tracking-wider text-neutral-500">
          Collection
        </p>
      </div>

      <div>
        <h3 className="text-3xl font-bold text-neutral-900">Premium</h3>

        <p className="mt-2 text-sm uppercase tracking-wider text-neutral-500">
          Quality
        </p>
      </div>
    </div>
  );
};

export default CollectionStats;
