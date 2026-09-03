import { Link } from "react-router-dom";
import { FiHeart, FiShoppingBag, FiStar } from "react-icons/fi";

const RelatedProductCard = ({ product }) => {
  return (
    <div className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500">
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-80 object-cover group-hover:scale-110 transition duration-700"
        />

        <button
          className="
            absolute
            top-4
            right-4
            h-10
            w-10
            rounded-full
            bg-white
            shadow
            flex
            items-center
            justify-center
            hover:bg-black
            hover:text-white
            transition
          "
        >
          <FiHeart />
        </button>
      </div>

      <div className="p-6">
        <p className="text-sm text-gray-500">{product.category}</p>

        <h3 className="font-semibold text-xl mt-2">{product.name}</h3>

        <div className="flex items-center gap-2 mt-3">
          <FiStar className="fill-yellow-500 text-yellow-500" />

          <span>{product.rating}</span>
        </div>

        <div className="flex justify-between items-center mt-6">
          <span className="text-2xl font-bold">₹{product.price}</span>

          <Link
            to={`/product/${product.id}`}
            className="
              h-11
              w-11
              rounded-full
              bg-black
              text-white
              flex
              items-center
              justify-center
              hover:bg-orange-500
              transition
            "
          >
            <FiShoppingBag />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RelatedProductCard;
