const FeatureCard = ({ feature }) => {
  const Icon = feature.icon;

  return (
    <div
      className="
        group
        bg-white
        rounded-3xl
        p-8
        border
        border-gray-200
        hover:border-black
        hover:-translate-y-2
        hover:shadow-2xl
        transition-all
        duration-300
      "
    >
      <div
        className="
          h-16
          w-16
          rounded-2xl
          bg-black
          text-white
          flex
          items-center
          justify-center
          text-3xl
          group-hover:bg-orange-500
          transition
        "
      >
        <Icon />
      </div>

      <h3 className="text-2xl font-bold mt-6">{feature.title}</h3>

      <p className="text-gray-500 leading-7 mt-4">{feature.description}</p>
    </div>
  );
};

export default FeatureCard;
