import HeroContent from "./HeroContent";
import HeroImage from "./HeroImage";

const CollectionsHero = () => {
  return (
    <section className="relative h-[90vh] overflow-hidden">
      <HeroImage />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Optional Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />

      {/* Content — pt-[72px] so text starts below the transparent navbar */}
      <div className="relative z-10 mx-auto flex h-full max-w-[1440px] items-center px-6 pt-[72px] md:px-10 lg:px-14 xl:px-20">
        <HeroContent />
      </div>
    </section>
  );
};

export default CollectionsHero;
