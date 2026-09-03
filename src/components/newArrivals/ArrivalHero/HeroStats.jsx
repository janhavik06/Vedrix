const HeroStats = () => {
  return (
    <div className="mt-14 flex items-center gap-8">
      <div>
        <h3 className="text-4xl font-bold text-neutral-900">250+</h3>

        <p className="mt-1 text-sm text-neutral-500">New Products</p>
      </div>

      <div className="h-10 w-px bg-neutral-300" />

      <div>
        <h3 className="text-4xl font-bold text-neutral-900">4.9★</h3>

        <p className="mt-1 text-sm text-neutral-500">Customer Rating</p>
      </div>

      <div className="h-10 w-px bg-neutral-300" />

      <div>
        <h3 className="text-4xl font-bold text-neutral-900">24H</h3>

        <p className="mt-1 text-sm text-neutral-500">New Drops</p>
      </div>
    </div>
  );
};

export default HeroStats;
