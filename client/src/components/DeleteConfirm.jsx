import { FaExclamationTriangle } from 'react-icons/fa';

export default function DeleteConfirm({ onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white text-black p-8 rounded-xl shadow-2xl max-w-md w-full animate-fadeInUp">
        <div className="flex flex-col items-center text-center">
          <FaExclamationTriangle size={48} className="text-red-600 mb-4" />
          <h3 className="text-2xl font-bold text-red-700 mb-2">Are you sure?</h3>
          <p className="text-gray-700 mb-6">This action <strong>cannot</strong> be undone.</p>
        </div>
        <div className="flex justify-end gap-4">
          <button
            onClick={onCancel}
            className="px-5 py-2 rounded-md bg-gray-200 hover:bg-gray-300 transition font-medium"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-5 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition font-medium"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
