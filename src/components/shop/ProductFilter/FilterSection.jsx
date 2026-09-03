import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

const FilterSection = ({ title, children }) => {
  const [open, setOpen] = useState(true);

  return (
    <div className="px-5 py-4">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between pb-3"
      >
        <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-700">
          {title}
        </h3>
        <FiChevronDown
          size={13}
          className={`text-gray-400 transition duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && <div>{children}</div>}
    </div>
  );
};

export default FilterSection;
