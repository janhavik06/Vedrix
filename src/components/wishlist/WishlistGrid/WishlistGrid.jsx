import WishlistCard from "../WishlistCard";

const WishlistGrid = ({ products = [], onRemove, onAddToCart }) => {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <WishlistCard
          key={product.id}
          product={product}
          onRemove={onRemove}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
};

export default WishlistGrid;
