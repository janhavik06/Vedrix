import { FiChevronDown } from "react-icons/fi";

const ScrollIndicator = () => {
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
      <div className="flex flex-col items-center gap-2 text-neutral-500">
        <span className="text-xs font-semibold uppercase tracking-[0.3em]">
          Scroll
        </span>

        <FiChevronDown size={22} className="animate-bounce" />
      </div>
    </div>
  );
};

export default ScrollIndicator;
