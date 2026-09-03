import { FiInstagram, FiArrowRight } from "react-icons/fi";

const FollowBanner = () => {
  return (
    <div className="mt-14 overflow-hidden rounded-3xl bg-gradient-to-r from-black via-gray-900 to-black text-white">
      <div className="relative px-8 py-14 text-center">
        {/* Decorative rings */}
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full border border-white/5" />
        <div className="pointer-events-none absolute -bottom-12 -left-12 h-40 w-40 rounded-full border border-orange-500/10" />

        <div className="mx-auto flex max-w-lg flex-col items-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600 text-white shadow-xl">
            <FiInstagram size={28} />
          </div>

          <h2 className="mt-6 text-4xl font-black">Follow @VedrixWear</h2>

          <p className="mt-4 text-gray-400 leading-7">
            Tag{" "}
            <span className="font-bold text-orange-400">#WearVedrix</span> to
            get featured in our community gallery. Join 50K+ style setters.
          </p>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="group mt-8 inline-flex items-center gap-3 rounded-xl bg-white px-8 py-3.5 font-bold text-black transition-all duration-300 hover:bg-orange-500 hover:text-white"
          >
            <FiInstagram size={18} />
            View on Instagram
            <FiArrowRight size={16} className="transition group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default FollowBanner;
