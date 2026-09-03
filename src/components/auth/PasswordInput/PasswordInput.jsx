import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Input from "../../common/Input";

const PasswordInput = ({
  label = "Password",
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Input
      {...props}
      label={label}
      type={showPassword ? "text" : "password"}
      rightIcon={
        <button
          type="button"
          onClick={() =>
            setShowPassword((prev) => !prev)
          }
          className="text-gray-500 hover:text-black"
        >
          {showPassword ? (
            <FiEyeOff size={18} />
          ) : (
            <FiEye size={18} />
          )}
        </button>
      }
    />
  );
};

export default PasswordInput;