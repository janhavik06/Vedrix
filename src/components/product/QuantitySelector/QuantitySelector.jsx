import { useState } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";

/**
 * Works on its own or controlled from outside with `value`.
 * `max` stops the quantity going above the stock that is left.
 */
const QuantitySelector = ({ value, onChange, max }) => {
  const [internal, setInternal] = useState(1);
  const quantity = value !== undefined ? value : internal;
  const atMax = max !== undefined && quantity >= max;

  const update = (next) => {
    setInternal(next);

    if (onChange) {
      onChange(next);
    }
  };

  const decrease = () => {
    if (quantity === 1) return;
    update(quantity - 1);
  };

  const increase = () => {
    if (atMax) return;
    update(quantity + 1);
  };

  return (
    <div className="mt-10">
      <h3 className="font-semibold text-lg mb-4">Quantity</h3>

      <div
        className="
          flex
          items-center
          w-fit
          rounded-xl
          border
          overflow-hidden
        "
      >
        <button
          type="button"
          onClick={decrease}
          disabled={quantity === 1}
          className="
            p-4
            hover:bg-gray-100
            transition
            disabled:opacity-30
          "
        >
          <FiMinus />
        </button>

        <span className="w-14 text-center font-semibold">{quantity}</span>

        <button
          type="button"
          onClick={increase}
          disabled={atMax}
          className="
            p-4
            hover:bg-gray-100
            transition
            disabled:opacity-30
          "
        >
          <FiPlus />
        </button>
      </div>
    </div>
  );
};

export default QuantitySelector;