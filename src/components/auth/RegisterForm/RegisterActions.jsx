import Button from "../../common/Button";

const RegisterActions = ({ loading }) => {
  return (
    <div className="space-y-4">
      <Button type="submit" fullWidth loading={loading}>
        Create Account
      </Button>
    </div>
  );
};

export default RegisterActions;