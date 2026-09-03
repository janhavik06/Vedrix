import bannerImage from "../../../assets/images/banner/banner-model.jpg";

const BannerImage = () => {
  return (
    <div className="relative flex justify-center">
      <div
        className="
          absolute
          w-[420px]
          h-[420px]
          rounded-full
          bg-orange-500/20
          blur-3xl
        "
      />

      <img
        src={bannerImage}
        alt="Vedrix Collection"
        className="
          relative
          z-10
          max-h-[650px]
          object-contain
        "
      />
    </div>
  );
};

export default BannerImage;
