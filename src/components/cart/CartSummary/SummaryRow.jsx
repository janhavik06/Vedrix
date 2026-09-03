const SummaryRow = ({
  label,
  value,
  labelClassName = "",
  valueClassName = "",
}) => {
  return (
    <div className="mb-4 flex items-center justify-between">
      <span className={`text-gray-600 ${labelClassName}`}>{label}</span>

      <span className={valueClassName}>{value}</span>
    </div>
  );
};

export default SummaryRow;
