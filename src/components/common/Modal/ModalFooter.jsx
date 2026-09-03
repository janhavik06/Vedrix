const ModalFooter = ({ children }) => {
  return (
    <div
      className="
        flex
        justify-end
        gap-3
        border-t
        px-8
        py-5
      "
    >
      {children}
    </div>
  );
};

export default ModalFooter;
