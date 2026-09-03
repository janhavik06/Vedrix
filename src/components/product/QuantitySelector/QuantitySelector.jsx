import { useState } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";

const QuantitySelector = ({ onChange }) => {
  const [quantity, setQuantity] = useState(1);

  const decrease = () => {
    if (quantity === 1) return;

    const value = quantity - 1;

    setQuantity(value);

    if (onChange) {
      onChange(value);
    }
  };

  const increase = () => {
    const value = quantity + 1;

    setQuantity(value);

    if (onChange) {
      onChange(value);
    }
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
          onClick={decrease}
          className="
            p-4
            hover:bg-gray-100
            transition
          "
        >
          <FiMinus />
        </button>

        <span className="w-14 text-center font-semibold">{quantity}</span>

        <button
          onClick={increase}
          className="
            p-4
            hover:bg-gray-100
            transition
          "
        >
          <FiPlus />
        </button>
      </div>
    </div>
  );
};

export default QuantitySelector;
