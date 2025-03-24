import React from "react";
import { motion } from "framer-motion";

interface User {
  name: string;
  gender?: string;
  nationality?: string;
  email: string;
  phone: string;
  address?: string;
  message?: string;
  createdAt: string | Date;
}

interface ModalProps {
  user: User | null;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ user, onClose }) => {
  if (!user) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="bg-white p-6 md:p-8 rounded-2xl shadow-2xl w-[90%] max-w-lg relative"
      >
        <button
          onClick={onClose}
          className="absolute cursor-pointer top-4 right-4 text-gray-500 hover:text-gray-700 transition"
        >
          ❌
        </button>

        <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">
          {user.name}
        </h2>

        <div className="space-y-3 text-gray-700">
          {user.gender && <p><strong>Gender:</strong> {user.gender}</p>}
          {user.nationality && <p><strong>Nationality:</strong> {user.nationality}</p>}
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          {user.address && <p><strong>Address:</strong> {user.address}</p>}
          {user.message && <p><strong>Message:</strong> {user.message}</p>}
          <p className="text-sm text-gray-500">
            <strong>Submitted At:</strong> {new Date(user.createdAt).toLocaleString()}
          </p>
        </div>

        <div className="flex justify-center mt-6">
          <button
            onClick={onClose}
            className="px-6 cursor-pointer py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition shadow-md"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Modal;
