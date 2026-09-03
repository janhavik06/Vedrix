import TrendingCard from "./TrendingCard";

const TrendingGrid = ({ products }) => {
  if (!products.length) return null;

  return (
    <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 xl:grid-cols-4">
      {products.map((product, i) => (
        <TrendingCard key={product.id} product={product} rank={i + 1} />
      ))}
    </div>
  );
};

export default TrendingGrid;
