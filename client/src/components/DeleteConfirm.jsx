/* eslint-disable no-unused-vars */
import { motion, AnimatePresence } from 'framer-motion';
import { FaExclamationTriangle } from 'react-icons/fa';

export default function DeleteConfirm({ onConfirm, onCancel }) {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md text-center text-gray-800"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <div className="text-red-600 mb-4 flex justify-center">
            <FaExclamationTriangle className="text-6xl animate-bounce" />
          </div>
          <h3 className="text-2xl font-bold mb-2">Are you sure?</h3>
          <p className="text-gray-600 mb-6">This action will permanently delete this todo item.</p>
          <div className="flex justify-center gap-4">
            <button
              onClick={onCancel}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-5 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-5 rounded-lg shadow"
            >
              Delete
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
