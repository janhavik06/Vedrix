import { Link } from "react-router-dom";
import Button from "../../common/Button";

const LoginActions = ({ loading }) => {
  return (
    <div className="space-y-4">
      <div className="text-right">
        <Link
          to="/forgot-password"
          className="text-sm font-medium text-gray-500 underline-offset-2 transition hover:text-black hover:underline"
        >
          Forgot Password?
        </Link>
      </div>

      <Button type="submit" fullWidth loading={loading}>
        Sign In
      </Button>
    </div>
  );
};

export default LoginActions;