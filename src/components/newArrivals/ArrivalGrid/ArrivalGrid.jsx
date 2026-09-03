import GridHeader from "./GridHeader";
import ArrivalCard from "./ArrivalCard";
import EmptyState from "./EmptyState";

const ArrivalGrid = ({ products = [], sort, onSortChange }) => {
  if (!products.length) {
    return <EmptyState />;
  }

  return (
    <section className="space-y-8">
      <GridHeader
        totalProducts={products.length}
        sort={sort}
        onSortChange={onSortChange}
      />

      <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <ArrivalCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default ArrivalGrid;
