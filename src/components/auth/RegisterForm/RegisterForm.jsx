import RegisterHeader from "./RegisterHeader";
import RegisterFields from "./RegisterFields";
import RegisterActions from "./RegisterActions";
import SocialLogin from "../SocialLogin";

const RegisterForm = ({
  formData,
  onChange,
  onSubmit,
  onGoogleLogin,
  onGithubLogin,
  loading = false,
}) => {
  return (
    <form
      onSubmit={onSubmit}
      className="space-y-6 rounded-3xl bg-white p-8 shadow-lg"
    >
      <RegisterHeader />

      <RegisterFields
        formData={formData}
        onChange={onChange}
      />

      <RegisterActions loading={loading} />

      <SocialLogin
        onGoogleLogin={onGoogleLogin}
        onGithubLogin={onGithubLogin}
      />
    </form>
  );
};

export default RegisterForm;