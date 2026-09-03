import ForgotPasswordHeader from "./ForgotPasswordHeader";
import ForgotPasswordActions from "./ForgotPasswordActions";
import Input from "../../common/Input";

const ForgotPasswordForm = ({
  email,
  onChange,
  onSubmit,
  loading = false,
}) => {
  return (
    <form
      onSubmit={onSubmit}
      className="space-y-6 rounded-3xl bg-white p-8 shadow-lg"
    >
      <ForgotPasswordHeader />

      <Input
        label="Email Address"
        type="email"
        name="email"
        placeholder="Enter your email"
        value={email}
        onChange={onChange}
      />

      <ForgotPasswordActions loading={loading} />
    </form>
  );
};

export default ForgotPasswordForm;