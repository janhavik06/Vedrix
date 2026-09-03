import heroImage from "../../../assets/images/hero/hero.jpg";
import { FiShoppingBag, FiStar } from "react-icons/fi";

const HeroImage = () => {
  return (
    <div className="relative w-full max-w-[620px]">
      {" "}
      <div className="relative rounded-[30px] bg-white p-4 shadow-[0_30px_70px_rgba(0,0,0,0.12)]">
        <div className="overflow-hidden rounded-[24px]">
          <img
            src={heroImage}
            alt="Vedrix"
            className="h-[640px] w-full object-cover"
          />
        </div>

        {/* Left Card
        <div className="absolute -left-20 top-12 hidden w-55 rounded-2xl border border-white/30 bg-white/15 !px-3 !py-3 backdrop-blur-[8px] shadow-[0_8px_32px_rgba(0,0,0,0.15)] lg:block">
          <div className="flex  h-10 w-10 items-center justify-center rounded-xl bg-black text-white">
            <FiShoppingBag />
          </div>

          <p className="!mt-3 text-xs uppercase tracking-widest !text-black">
            Latest Drop
          </p>

          <h3 className="!mt-1 !text-red-900 font-bold">Summer Collection</h3>

          <p className="!mt-2 text-sm text-gray-500">
            Minimal designs crafted for everyday confidence.
          </p>
        </div>

        {/* Right Card *
        <div className="absolute -bottom-10 -right-10 hidden w-60 rounded-2xl border border-white/30 bg-white/15 !p-3 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.15)] lg:block">
          <div className="flex items-center gap-2">
            {[...Array(5)].map((_, i) => (
              <FiStar key={i} className="fill-yellow-400 text-yellow-400" />
            ))}
            <span className="font-semibold">4.9 / 5</span>
          </div>

          <p className="!mt-2 text-sm text-gray-500">
            Trusted by 500+ customers for premium quality & fit.
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default HeroImage;
