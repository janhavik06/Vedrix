import ProductCard from "../ProductCard";
import EmptyState from "../EmptyState";

const ProductGrid = ({ products = [], loading = false }) => {
  if (loading) {
    return (
      <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="
              h-[420px]
              animate-pulse
              rounded-3xl
              bg-gray-200
            "
          />
        ))}
      </div>
    );
  }

  if (!products.length) {
    return (
      <EmptyState
        title="No Products Found"
        description="Try changing your filters or search keyword."
      />
    );
  }

  return (
    <div
      className="
        grid
        gap-8
        sm:grid-cols-2
        lg:grid-cols-2
        xl:grid-cols-3
      "
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
