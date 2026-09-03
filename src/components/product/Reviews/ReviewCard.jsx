import { FiStar } from "react-icons/fi";

const ReviewCard = ({ review }) => {
  return (
    <div className="bg-white border rounded-3xl p-7 shadow-sm">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-semibold">{review.name}</h3>

          <p className="text-sm text-gray-500">{review.date}</p>
        </div>

        <div className="flex text-yellow-500">
          {[...Array(review.rating)].map((_, index) => (
            <FiStar key={index} className="fill-yellow-500" />
          ))}
        </div>
      </div>

      <p className="mt-5 text-gray-600 leading-7">{review.review}</p>
    </div>
  );
};

export default ReviewCard;
