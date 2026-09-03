import Input from "../../common/Input";

const CouponInput = ({ value, onChange }) => {
  return (
    <Input placeholder="Enter coupon code" value={value} onChange={onChange} />
  );
};

export default CouponInput;
