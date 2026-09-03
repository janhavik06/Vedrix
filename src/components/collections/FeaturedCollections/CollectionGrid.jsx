import CollectionCard from "./CollectionCard";

const CollectionGrid = ({ collections }) => {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      {collections.map((collection) => (
        <CollectionCard key={collection.id} collection={collection} />
      ))}
    </div>
  );
};

export default CollectionGrid;
