const SectionHeader = () => {
  return (
    <div className="mb-16 text-center">
      <span className="inline-flex rounded-full border border-neutral-300 bg-white px-5 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-neutral-700">
        Featured Collections
      </span>

      <h2 className="mt-6 text-5xl font-black text-neutral-900">
        Curated For Every Style
      </h2>

      <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-neutral-500">
        Explore handpicked collections designed for every mood, season, and
        occasion.
      </p>
    </div>
  );
};

export default SectionHeader;
