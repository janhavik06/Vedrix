const LoadingSkeleton = () => {
  return (
    <div className="animate-pulse overflow-hidden rounded-[28px] border border-neutral-200 bg-white">
      <div className="aspect-[4/5] bg-neutral-200" />

      <div className="space-y-4 p-6">
        <div className="h-3 w-24 rounded bg-neutral-200" />

        <div className="h-6 w-3/4 rounded bg-neutral-200" />

        <div className="h-5 w-28 rounded bg-neutral-200" />

        <div className="mt-4 h-12 rounded-2xl bg-neutral-200" />
      </div>
    </div>
  );
};

export default LoadingSkeleton;
