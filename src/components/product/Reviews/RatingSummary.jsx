import { FiStar } from "react-icons/fi";

const RatingSummary = () => {
  return (
    <div className="bg-white rounded-3xl shadow-sm border p-8">
      <h2 className="text-2xl font-bold">Customer Rating</h2>

      <div className="flex items-center gap-4 mt-6">
        <span className="text-6xl font-black">4.8</span>

        <div>
          <div className="flex text-yellow-500">
            {[...Array(5)].map((_, index) => (
              <FiStar key={index} className="fill-yellow-500" />
            ))}
          </div>

          <p className="text-gray-500 mt-2">Based on 236 Reviews</p>
        </div>
      </div>
    </div>
  );
};

export default RatingSummary;
