import NewsletterForm from "./NewsletterForm";

const Newsletter = () => {
  return (
    <section className="py-20 px-6 bg-white">
      <div
        className="
          max-w-7xl
          mx-auto
          rounded-[40px]
          bg-gradient-to-r
          from-black
          via-[#1c1c1c]
          to-black
          overflow-hidden
        "
      >
        <div className="grid lg:grid-cols-2 gap-10 items-center p-10 lg:p-20">
          {/* Left */}

          <div>
            <span className="uppercase tracking-[5px] text-orange-400 text-sm">
              Join The Community
            </span>

            <h2 className="text-white text-5xl font-black mt-6 leading-tight">
              Stay Ahead
              <br />
              Of Every Drop.
            </h2>

            <p className="text-gray-300 mt-6 text-lg leading-8 max-w-lg">
              Subscribe to receive exclusive offers, early access to new
              collections, product launches and style inspiration.
            </p>
          </div>

          {/* Right */}

          <NewsletterForm />
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
