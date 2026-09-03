import { forwardRef } from "react";

const Input = forwardRef(
  (
    {
      label,
      error,
      leftIcon,
      rightIcon,
      className = "",
      type = "text",
      ...props
    },
    ref,
  ) => {
    return (
      <div className="w-full">
        {label && (
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            {label}
          </label>
        )}

        <div
          className={`
            flex
            items-center
            rounded-xl
            border
            bg-white
            px-4
            transition
            ${
              error
                ? "border-red-500"
                : "border-gray-300 focus-within:border-black"
            }
          `}
        >
          {leftIcon && <span className="mr-3 text-gray-500">{leftIcon}</span>}

          <input
            ref={ref}
            type={type}
            className={`
              w-full
              bg-transparent
              py-3
              outline-none
              placeholder:text-gray-400
              ${className}
            `}
            {...props}
          />

          {rightIcon && <span className="ml-3 text-gray-500">{rightIcon}</span>}
        </div>

        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
