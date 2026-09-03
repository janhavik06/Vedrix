import RatingSummary from "./RatingSummary";
import ReviewCard from "./ReviewCard";
import reviews from "./ReviewsData";

const Reviews = () => {
  return (
    <section className="mt-24">
      <h2 className="text-4xl font-bold mb-10">Customer Reviews</h2>

      <RatingSummary />

      <div className="grid lg:grid-cols-2 gap-8 mt-10">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </section>
  );
};

export default Reviews;
