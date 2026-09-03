const statusColors = {
  Delivered: "bg-green-100 text-green-700",
  Shipped: "bg-blue-100 text-blue-700",
  Processing: "bg-yellow-100 text-yellow-700",
  Cancelled: "bg-red-100 text-red-700",
};

const OrderStatus = ({ status }) => {
  return (
    <span
      className={`mt-4 inline-block rounded-full px-3 py-1 text-sm font-medium ${
        statusColors[status] ||
        "bg-gray-100 text-gray-700"
      }`}
    >
      {status}
    </span>
  );
};

export default OrderStatus;