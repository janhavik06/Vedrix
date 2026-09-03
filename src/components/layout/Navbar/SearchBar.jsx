import { useState } from "react";
import { FiSearch, FiX } from "react-icons/fi";

const SearchBar = () => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  return (
    <>
      {/* Search Icon */}
      <button
        onClick={() => setOpen(true)}
        className="text-2xl hover:text-orange-500 transition"
      >
        <FiSearch />
      </button>

      {/* Overlay */}
      {open && (
        <div className="fixed inset-0 z-[999] bg-black/50 backdrop-blur-sm flex justify-center items-start pt-24">
          <div className="bg-white rounded-2xl shadow-2xl w-[92%] max-w-2xl p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-xl font-semibold">Search Products</h2>

              <button
                onClick={() => setOpen(false)}
                className="text-2xl hover:text-red-500 transition"
              >
                <FiX />
              </button>
            </div>

            {/* Search Box */}
            <div className="relative">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

              <input
                type="text"
                placeholder="Search Hoodies, T-Shirts..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="
                  w-full
                  border
                  rounded-xl
                  py-3
                  pl-12
                  pr-4
                  outline-none
                  focus:border-black
                  transition
                "
              />
            </div>

            {/* Recent Searches */}
            <div className="mt-8">
              <h3 className="font-semibold mb-3">Popular Searches</h3>

              <div className="flex flex-wrap gap-3">
                {[
                  "Oversized Hoodie",
                  "Black Hoodie",
                  "Graphic Tee",
                  "Minimal Tee",
                  "Winter Collection",
                ].map((item) => (
                  <button
                    key={item}
                    className="
                      px-4
                      py-2
                      rounded-full
                      bg-gray-100
                      hover:bg-black
                      hover:text-white
                      transition
                    "
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchBar;
