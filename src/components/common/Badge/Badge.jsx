const variants = {
  primary: "bg-black text-white",
  secondary: "bg-gray-100 text-gray-800",
  success: "bg-green-100 text-green-700",
  danger: "bg-red-100 text-red-700",
  warning: "bg-yellow-100 text-yellow-700",
  sale: "bg-orange-500 text-white",
};

const Badge = ({ children, variant = "primary", className = "" }) => {
  return (
    <span
      className={`
        inline-flex
        items-center
        rounded-full
        px-3
        py-1
        text-xs
        font-semibold
        uppercase
        tracking-wide
        ${variants[variant]}
        ${className}
      `}
    >
      {children}
    </span>
  );
};

export default Badge;
