import React from "react";

interface ModalProps {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
  confirmClass?: string;
}

const Modal: React.FC<ModalProps> = ({
  title,
  message,
  onConfirm,
  onCancel,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  confirmClass = "bg-red-600 hover:bg-red-500",
}) => {

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg max-w-md w-full p-6">
      
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            ✕
          </button>
        </div>
 
        <p className="text-gray-600 dark:text-gray-200 mb-6">{message}</p>
 
        <div className="flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white rounded hover:bg-gray-300 dark:hover:bg-gray-500"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className={`px-4 py-2 text-white rounded ${confirmClass}`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;