import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";

const CartItemActions = ({ item, onIncrease, onDecrease, onRemove }) => {
  return (
    <div className="flex flex-col items-end gap-5">
      <div className="flex items-center overflow-hidden rounded-xl border">
        <button
          onClick={() => onDecrease(item.id)}
          className="p-3 transition hover:bg-gray-100"
        >
          <FiMinus />
        </button>

        <span className="w-10 text-center font-semibold">{item.quantity}</span>

        <button
          onClick={() => onIncrease(item.id)}
          className="p-3 transition hover:bg-gray-100"
        >
          <FiPlus />
        </button>
      </div>

      <button
        onClick={() => onRemove(item.id)}
        className="
          flex
          items-center
          gap-2
          text-red-500
          transition
          hover:text-red-700
        "
      >
        <FiTrash2 />
        Remove
      </button>
    </div>
  );
};

export default CartItemActions;
