import Button from "../../common/Button";

const ForgotPasswordActions = ({
  loading,
}) => {
  return (
    <Button
      type="submit"
      fullWidth
      loading={loading}
    >
      Send Reset Link
    </Button>
  );
};

export default ForgotPasswordActions;