import CartItemImage from "./CartItemImage";
import CartItemInfo from "./CartItemInfo";
import CartItemActions from "./CartItemActions";

const CartItem = ({ item, onIncrease, onDecrease, onRemove }) => {
  return (
    <div
      className="
        flex
        flex-col
        gap-6
        rounded-3xl
        border
        bg-white
        p-6
        shadow-sm
        md:flex-row
        md:items-center
      "
    >
      <CartItemImage item={item} />

      <div className="flex-1">
        <CartItemInfo item={item} />
      </div>

      <CartItemActions
        item={item}
        onIncrease={onIncrease}
        onDecrease={onDecrease}
        onRemove={onRemove}
      />
    </div>
  );
};

export default CartItem;
