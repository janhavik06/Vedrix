const sizes = {
  sm: "h-5 w-5 border-2",
  md: "h-8 w-8 border-[3px]",
  lg: "h-12 w-12 border-4",
};

const Loader = ({ size = "md", fullScreen = false, text = "" }) => {
  const spinner = (
    <div className="flex flex-col items-center gap-4">
      <div
        className={`
          animate-spin
          rounded-full
          border-gray-300
          border-t-black
          ${sizes[size]}
        `}
      />

      {text && <p className="text-sm text-gray-500">{text}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div
        className="
          fixed
          inset-0
          z-50
          flex
          items-center
          justify-center
          bg-white/80
          backdrop-blur-sm
        "
      >
        {spinner}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-10">{spinner}</div>
  );
};

export default Loader;
