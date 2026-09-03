import Input from "../../common/Input";

const FormField = ({
  label,
  type = "text",
  name,
  value,
  onChange,
}) => {
  return (
    <Input
      label={label}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
    />
  );
};

export default FormField;