import SeasonCard from "./SeasonCard";

const SeasonGrid = ({ collections }) => {
  return (
    <div className="grid gap-8 md:grid-cols-3">
      {collections.map((collection) => (
        <SeasonCard key={collection.id} collection={collection} />
      ))}
    </div>
  );
};

export default SeasonGrid;
