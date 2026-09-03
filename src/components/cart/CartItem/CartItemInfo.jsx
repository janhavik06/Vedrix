import Rating from "../../common/Rating";

const CartItemInfo = ({ item }) => {
  return (
    <>
      <p className="text-sm uppercase tracking-wide text-gray-500">
        {item.category}
      </p>

      <h3 className="mt-2 text-xl font-semibold">{item.name}</h3>

      <div className="mt-3 flex flex-wrap gap-6 text-sm text-gray-600">
        <span>
          <strong>Size:</strong> {item.size}
        </span>

        <span>
          <strong>Color:</strong> {item.color}
        </span>
      </div>

      <div className="mt-4">
        <Rating rating={item.rating} showValue />
      </div>

      <p className="mt-5 text-2xl font-bold">₹{item.price}</p>
    </>
  );
};

export default CartItemInfo;
