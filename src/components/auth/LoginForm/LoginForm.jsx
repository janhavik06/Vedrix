import LoginHeader from "./LoginHeader";
import LoginFields from "./LoginFields";
import LoginActions from "./LoginActions";

const LoginForm = ({
  formData,
  onChange,
  onSubmit,
  loading = false,
}) => {
  return (
    <form
      onSubmit={onSubmit}
      className="space-y-6 rounded-3xl bg-white p-8 shadow-lg"
    >
      <LoginHeader />

      <LoginFields
        formData={formData}
        onChange={onChange}
      />

      <LoginActions
        loading={loading}
      />
    </form>
  );
};

export default LoginForm;