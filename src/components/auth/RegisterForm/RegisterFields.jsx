import Input from "../../common/Input";
import PasswordInput from "../PasswordInput";

const RegisterFields = ({
  formData,
  onChange,
}) => {
  return (
    <div className="space-y-5">
      <Input
        label="Full Name"
        name="name"
        placeholder="Enter your full name"
        value={formData.name}
        onChange={onChange}
      />

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
        placeholder="Create a password"
        value={formData.password}
        onChange={onChange}
      />

      <PasswordInput
        label="Confirm Password"
        name="confirmPassword"
        placeholder="Confirm your password"
        value={formData.confirmPassword}
        onChange={onChange}
      />
    </div>
  );
};

export default RegisterFields;