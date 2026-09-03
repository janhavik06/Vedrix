import { FiX } from "react-icons/fi";

const Modal = ({ isOpen, onClose, children, maxWidth = "max-w-lg" }) => {
  if (!isOpen) return null;

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/50
        p-4
      "
      onClick={onClose}
    >
      <div
        className={`
          relative
          w-full
          ${maxWidth}
          rounded-3xl
          bg-white
          shadow-2xl
          animate-in
          fade-in
          zoom-in-95
        `}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="
            absolute
            right-5
            top-5
            rounded-full
            p-2
            transition
            hover:bg-gray-100
          "
        >
          <FiX size={20} />
        </button>

        {children}
      </div>
    </div>
  );
};

export default Modal;
