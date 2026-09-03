import CollectionStats from "./CollectionStats";

const CollectionHeader = ({ totalProducts = 0 }) => {
  return (
    <section className="mx-auto max-w-7xl py-16">
      <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
        {/* Left Content */}
        <div className="max-w-2xl">
          <span className="inline-flex rounded-full border border-neutral-200 bg-neutral-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-red-600">
            Latest Collection
          </span>

          <h2 className="mt-6 text-5xl font-black leading-tight tracking-[-0.04em] text-neutral-900 lg:text-6xl">
            New Arrivals
          </h2>

          <p className="mt-6 text-lg leading-8 text-neutral-600">
            Discover the newest additions to the Vedrix collection. Designed
            with premium fabrics, modern fits and timeless streetwear aesthetics
            for everyday confidence.
          </p>
        </div>

        {/* Right Stats */}
        <CollectionStats totalProducts={totalProducts} />
      </div>

      {/* Divider */}
      <div className="mt-14 h-px w-full bg-neutral-200" />
    </section>
  );
};

export default CollectionHeader;
