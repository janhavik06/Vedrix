import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const Pagination = ({ currentPage = 1, totalPages = 1, onPageChange }) => {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <nav
      className="mt-12 flex items-center justify-center gap-2"
      aria-label="Pagination"
    >
      <button
        onClick={() => onPageChange?.(currentPage - 1)}
        disabled={currentPage === 1}
        className="
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-xl
          border
          transition
          hover:bg-black
          hover:text-white
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
      >
        <FiChevronLeft />
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange?.(page)}
          className={`
            h-10
            w-10
            rounded-xl
            font-medium
            transition

            ${
              currentPage === page
                ? "bg-black text-white"
                : "border hover:bg-gray-100"
            }
          `}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange?.(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-xl
          border
          transition
          hover:bg-black
          hover:text-white
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
      >
        <FiChevronRight />
      </button>
    </nav>
  );
};

export default Pagination;
