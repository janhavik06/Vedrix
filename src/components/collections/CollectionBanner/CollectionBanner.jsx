const CollectionBanner = () => {
  return (
    <section className="mt-20 overflow-hidden rounded-[36px] bg-black">
      <div className="relative mx-auto flex max-w-[1440px] flex-col items-center justify-center px-8 py-20 text-center lg:px-20">
        {/* Background Blur */}
        <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

        <div className="relative z-10 max-w-3xl">
          <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-white">
            Limited Edition
          </span>

          <h2 className="mt-6 text-4xl font-black leading-tight text-white md:text-5xl">
            Elevate Your Style With
            <br />
            Premium Collections
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-neutral-300">
            Discover carefully curated pieces crafted for modern lifestyles.
            Timeless essentials, premium fabrics, and effortless style—all in
            one collection.
          </p>

          <button className="mt-10 rounded-full bg-white px-10 py-4 text-sm font-semibold tracking-wide text-black transition duration-300 hover:scale-105 hover:bg-neutral-100">
            Explore Collection
          </button>
        </div>
      </div>
    </section>
  );
};

export default CollectionBanner;
