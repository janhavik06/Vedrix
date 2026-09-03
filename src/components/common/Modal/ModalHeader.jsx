const ModalHeader = ({ title, subtitle }) => {
  return (
    <div className="border-b px-8 py-6">
      <h2 className="text-2xl font-bold">{title}</h2>

      {subtitle && <p className="mt-2 text-gray-500">{subtitle}</p>}
    </div>
  );
};

export default ModalHeader;
