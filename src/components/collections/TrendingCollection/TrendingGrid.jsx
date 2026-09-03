import TrendingCard from "./TrendingCard";

const TrendingGrid = ({ collections }) => {
  return (
    <div className="grid gap-8 md:grid-cols-3">
      {collections.map((collection) => (
        <TrendingCard key={collection.id} collection={collection} />
      ))}
    </div>
  );
};

export default TrendingGrid;
