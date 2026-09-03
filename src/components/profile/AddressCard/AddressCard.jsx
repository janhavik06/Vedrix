import AddressActions from "./AddressActions";

const AddressCard = ({
  address,
  onEdit,
  onDelete,
  onSetDefault,
}) => {
  return (
    <div className="rounded-3xl border bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">
            {address.fullName}
          </h3>

          {address.isDefault && (
            <span className="mt-1 inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
              Default
            </span>
          )}
        </div>
      </div>

      <div className="space-y-2 text-gray-600">
        <p>{address.street}</p>
        <p>
          {address.city}, {address.state}
        </p>
        <p>
          {address.country} - {address.pincode}
        </p>
        <p>Phone: {address.phone}</p>
      </div>

      <AddressActions
        address={address}
        onEdit={onEdit}
        onDelete={onDelete}
        onSetDefault={onSetDefault}
      />
    </div>
  );
};

export default AddressCard;