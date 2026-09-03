import { FiStar } from "react-icons/fi";

const Rating = ({
  rating = 0,
  totalStars = 5,
  showValue = true,
  reviewCount,
  size = 18,
}) => {
  return (
    <div className="flex items-center gap-2">
      <div className="flex">
        {[...Array(totalStars)].map((_, index) => {
          const filled = index < Math.round(rating);

          return (
            <FiStar
              key={index}
              size={size}
              className={
                filled ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
              }
            />
          );
        })}
      </div>

      {showValue && (
        <span className="text-sm font-medium text-gray-700">
          {rating.toFixed(1)}
        </span>
      )}

      {reviewCount !== undefined && (
        <span className="text-sm text-gray-500">({reviewCount} Reviews)</span>
      )}
    </div>
  );
};

export default Rating;
