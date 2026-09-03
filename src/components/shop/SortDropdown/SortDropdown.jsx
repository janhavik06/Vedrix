import { useEffect, useRef, useState } from "react";
import { FiCheck, FiChevronDown } from "react-icons/fi";
import sortOptions from "./SortOptions";

const SortDropdown = ({ value = "featured", onChange }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const selected =
    sortOptions.find((item) => item.value === value) || sortOptions[0];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative w-72 shrink-0">
      {" "}
      <button
        onClick={() => setOpen(!open)}
        className="
    flex
    w-full
    items-center
    justify-between
    rounded-2xl
    border
    border-neutral-200
    bg-white
    px-5
    py-3
    shadow-sm
    transition-all
    duration-200
    hover:border-black
    hover:shadow-md
"
      >
        <div>
          <p className="text-xs uppercase tracking-[0.15em] text-neutral-400">
            Sort By
          </p>

          <p className="mt-1 text-sm font-semibold text-neutral-800">
            {selected.label}
          </p>
        </div>

        <FiChevronDown
          size={18}
          className={`transition duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div
          className="
    absolute
    right-0
    z-50
    mt-3
    w-full
    overflow-hidden
    rounded-3xl
    border
    border-neutral-200
    bg-white
    shadow-2xl
"
        >
          {sortOptions.map((option) => {
            const active = option.value === value;

            return (
              <button
                key={option.value}
                onClick={() => {
                  onChange?.(option.value);
                  setOpen(false);
                }}
                className={`
                  flex
                  w-full
                  items-center
                  justify-between
                  px-6
                  py-4
                  text-left
                  transition-all
                  duration-200
                  ${active ? "bg-black text-white" : "hover:bg-neutral-100"}
                `}
              >
                <span className="font-medium">{option.label}</span>

                {active && <FiCheck size={18} />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SortDropdown;
