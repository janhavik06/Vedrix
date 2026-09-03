import heroImage from "../../../assets/images/collections/hero-collection.jpg";

const HeroImage = () => {
  return (
    <img
      src={heroImage}
      alt="Vedrix Collections"
      className="absolute inset-0 h-full w-full object-cover"
    />
  );
};

export default HeroImage;
