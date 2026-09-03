import Button from "../../common/Button";

const OrderActions = ({
  order,
  onViewDetails,
  onTrackOrder,
}) => {
  return (
    <div className="flex flex-col gap-3">

      <Button
        variant="outline"
        onClick={() => onViewDetails(order.id)}
      >
        View Details
      </Button>

      {order.status !== "Delivered" &&
        order.status !== "Cancelled" && (
          <Button
            onClick={() => onTrackOrder(order.id)}
          >
            Track Order
          </Button>
        )}

    </div>
  );
};

export default OrderActions;