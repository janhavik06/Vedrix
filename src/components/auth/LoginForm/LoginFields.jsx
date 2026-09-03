import Input from "../../common/Input";
import PasswordInput from "../PasswordInput";

const LoginFields = ({
  formData,
  onChange,
}) => {
  return (
    <div className="space-y-5">
      <Input
        label="Email"
        type="email"
        name="email"
        placeholder="Enter your email"
        value={formData.email}
        onChange={onChange}
      />

      <PasswordInput
        label="Password"
        name="password"
        placeholder="Enter your password"
        value={formData.password}
        onChange={onChange}
      />
    </div>
  );
};

export default LoginFields;