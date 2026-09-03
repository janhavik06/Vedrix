import HeroContent from "./HeroContent";
import heroImage from "../../../assets/images/new-arrivals/arrival-hero.jpg";

const ArrivalHero = () => {
  return (
    /* Hero starts at y=0 — image sits directly behind the transparent navbar */
    <section className="relative overflow-hidden" style={{ minHeight: "calc(100vh - 0px)" }}>
      {/* Background */}
      <img
        src={heroImage}
        alt="New Arrivals"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      {/* Dark gradient — strong left, fade right, strong bottom */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/55 to-black/15" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/10" />

      {/* Content
          pt-[72px] = navbar height
          Additional padding distributes content nicely in the viewport
      */}
      <div className="relative z-10 flex h-full min-h-[inherit] flex-col justify-center
                      mx-auto max-w-[1440px] px-6 pt-[72px] pb-0
                      lg:px-10 xl:px-14">
        <HeroContent />
      </div>
    </section>
  );
};

export default ArrivalHero;
