import SummaryRow from "./SummaryRow";
import Button from "../../common/Button";

const CartSummary = ({
  subtotal = 0,
  shipping = 0,
  discount = 0,
  total = 0,
  onCheckout,
}) => {
  return (
    <div
      className="
        rounded-3xl
        border
        bg-white
        p-6
        shadow-sm
      "
    >
      <h2 className="mb-6 text-2xl font-bold">Order Summary</h2>

      <SummaryRow label="Subtotal" value={`₹${subtotal}`} />

      <SummaryRow
        label="Shipping"
        value={shipping === 0 ? "Free" : `₹${shipping}`}
      />

      <SummaryRow
        label="Discount"
        value={`- ₹${discount}`}
        valueClassName="text-green-600"
      />

      <hr className="my-6" />

      <SummaryRow
        label="Total"
        value={`₹${total}`}
        labelClassName="text-lg font-bold"
        valueClassName="text-lg font-bold"
      />

      <Button fullWidth className="mt-8" onClick={onCheckout}>
        Proceed to Checkout
      </Button>
    </div>
  );
};

export default CartSummary;
