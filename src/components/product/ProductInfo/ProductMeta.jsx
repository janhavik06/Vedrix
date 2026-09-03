import { FiStar } from "react-icons/fi";

const ProductMeta = ({ product }) => {
  return (
    <>
      <span
        className="
          uppercase
          tracking-[4px]
          text-sm
          text-orange-500
        "
      >
        {product.category}
      </span>

      <h1 className="text-5xl font-black mt-3">{product.name}</h1>

      <div className="flex items-center gap-3 mt-5">
        <FiStar className="fill-yellow-500 text-yellow-500" />

        <span>{product.rating}</span>

        <span className="text-gray-500">({product.reviews} Reviews)</span>
      </div>

      <h2 className="text-4xl font-bold mt-8">₹{product.price}</h2>
    </>
  );
};

export default ProductMeta;
