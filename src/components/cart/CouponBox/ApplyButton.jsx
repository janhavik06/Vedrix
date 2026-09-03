import Button from "../../common/Button";

const ApplyButton = ({ onClick }) => {
  return (
    <Button onClick={onClick} className="whitespace-nowrap">
      Apply
    </Button>
  );
};

export default ApplyButton;
