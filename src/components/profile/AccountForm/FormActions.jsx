import Button from "../../common/Button";

const FormActions = ({
  onCancel,
}) => {
  return (
    <div className="mt-8 flex flex-wrap gap-4">

      <Button type="submit">
        Save Changes
      </Button>

      <Button
        type="button"
        variant="outline"
        onClick={onCancel}
      >
        Cancel
      </Button>

    </div>
  );
};

export default FormActions;