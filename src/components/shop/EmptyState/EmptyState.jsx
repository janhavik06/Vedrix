import { FiSearch } from "react-icons/fi";
import EmptyStateIllustration from "./EmptyStateIllustration";

const EmptyState = ({
  title = "No Products Found",
  description = "Try changing your filters or search keyword.",
  buttonText = "Clear Filters",
  onButtonClick,
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
      <EmptyStateIllustration />

      <div className="mt-8">
        <FiSearch className="mx-auto text-4xl text-gray-400" />

        <h2 className="mt-4 text-3xl font-bold text-gray-900">{title}</h2>

        <p className="mt-3 max-w-md text-gray-500">{description}</p>

        {onButtonClick && (
          <button
            onClick={onButtonClick}
            className="mt-8 rounded-xl bg-black px-6 py-3 text-white transition hover:bg-orange-500"
          >
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );
};

export default EmptyState;
