const ProductActions = () => {
  return (
    <div className="flex gap-4 mt-8">
      <button
        className="
          flex-1
          bg-black
          text-white
          py-4
          rounded-xl
          hover:bg-orange-500
          transition
        "
      >
        Add To Cart
      </button>

      <button
        className="
          flex-1
          border
          border-black
          rounded-xl
          hover:bg-black
          hover:text-white
          transition
        "
      >
        Buy Now
      </button>
    </div>
  );
};

export default ProductActions;
