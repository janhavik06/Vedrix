import OrderStatus from "./OrderStatus";
import OrderActions from "./OrderActions";

const OrderCard = ({
  order,
  onViewDetails,
  onTrackOrder,
}) => {
  return (
    <div className="rounded-3xl border bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-6 md:flex-row md:items-center">
        <img
          src={order.image}
          alt={order.productName}
          className="h-28 w-28 rounded-2xl object-cover"
        />

        <div className="flex-1">
          <h3 className="text-xl font-semibold">
            {order.productName}
          </h3>

          <p className="mt-2 text-gray-500">
            Order ID: #{order.orderId}
          </p>

          <p className="mt-1 text-gray-500">
            Ordered on: {order.orderDate}
          </p>

          <p className="mt-3 text-lg font-bold">
            ₹{order.total}
          </p>

          <OrderStatus status={order.status} />
        </div>

        <OrderActions
          order={order}
          onViewDetails={onViewDetails}
          onTrackOrder={onTrackOrder}
        />
      </div>
    </div>
  );
};

export default OrderCard;