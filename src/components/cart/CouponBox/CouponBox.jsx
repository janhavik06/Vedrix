import CouponInput from "./CouponInput";
import ApplyButton from "./ApplyButton";

const CouponBox = ({ coupon, onCouponChange, onApply }) => {
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
      <h2 className="mb-5 text-xl font-semibold">Apply Coupon</h2>

      <div className="flex flex-col gap-4 sm:flex-row">
        <CouponInput value={coupon} onChange={onCouponChange} />

        <ApplyButton onClick={onApply} />
      </div>
    </div>
  );
};

export default CouponBox;
