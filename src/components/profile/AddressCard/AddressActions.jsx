import Button from "../../common/Button";

const AddressActions = ({
  address,
  onEdit,
  onDelete,
  onSetDefault,
}) => {
  return (
    <div className="mt-6 flex flex-wrap gap-3">

      <Button
        variant="outline"
        onClick={() => onEdit(address.id)}
      >
        Edit
      </Button>

      <Button
        variant="danger"
        onClick={() => onDelete(address.id)}
      >
        Delete
      </Button>

      {!address.isDefault && (
        <Button
          variant="secondary"
          onClick={() => onSetDefault(address.id)}
        >
          Set as Default
        </Button>
      )}

    </div>
  );
};

export default AddressActions;