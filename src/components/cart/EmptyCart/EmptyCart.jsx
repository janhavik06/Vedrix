import { FiShoppingCart } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import EmptyState from "../../shop/EmptyState";

const EmptyCart = () => {
  const navigate = useNavigate();

  return (
    <EmptyState
      icon={<FiShoppingCart size={60} />}
      title="Your Cart is Empty"
      description="Looks like you haven't added any products to your cart yet."
      buttonText="Continue Shopping"
      onButtonClick={() => navigate("/shop")}
    />
  );
};

export default EmptyCart;
