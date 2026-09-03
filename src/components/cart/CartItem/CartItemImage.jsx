const CartItemImage = ({ item }) => {
  return (
    <div className="h-36 w-36 overflow-hidden rounded-2xl bg-gray-100">
      <img
        src={item.image}
        alt={item.name}
        className="h-full w-full object-cover"
      />
    </div>
  );
};

export default CartItemImage;
