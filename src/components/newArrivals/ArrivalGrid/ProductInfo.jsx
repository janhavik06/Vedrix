const ProductInfo = ({ product }) => {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-neutral-400">
        {product.category}
      </p>

      <h3 className="mt-2 text-lg font-semibold"> {product.name}</h3>

      <div className="mt-4 flex items-center gap-3">
        <span className="text-xl font-bold text-black">₹{product.price}</span>

        {product.oldPrice && (
          <span className="text-neutral-400 line-through">
            ₹{product.oldPrice}
          </span>
        )}
      </div>
    </div>
  );
};

export default ProductInfo;
