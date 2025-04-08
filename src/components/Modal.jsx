import { motion } from "framer-motion";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-transparent  z-50">
      {/* Modal Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        className="bg-white backdrop-blur-lg p-6 rounded-2xl shadow-lg w-[85%] md:w-[90%] max-w-md border border-white/20"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute cursor-pointer top-1 right-3 font-semibold text-lg"
        >
          ✕
        </button>

        {/* Modal Content */}
        <div className="text-black">{children}</div>
      </motion.div>
    </div>
  );
};

export default Modal;
