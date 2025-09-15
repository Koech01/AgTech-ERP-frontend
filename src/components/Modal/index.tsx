import React from 'react';

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
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  confirmClass = 'bg-red-600 hover:bg-red-500',
}) => {

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
      <div className='bg-white dark:bg-gray-900 rounded-lg shadow-lg max-w-md w-full p-6 max-sm:mx-5'>
      
        <div className='flex justify-between items-center mb-4'>
          <h3 className='text-lg font-semibold text-gray-900 dark:text-white'>{title}</h3>
          <button
            onClick={onCancel}
            className='text-gray-400 hover:text-gray-900 dark:hover:text-white'
          >
            ✕
          </button>
        </div>
 
        <p className='text-gray-600 dark:text-gray-200 mb-6'>{message}</p>
 
        <div className='flex justify-end space-x-3'>
          <button
            onClick={onCancel}
            className='inline-flex items-center py-2 px-3 text-xs font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:text-white'
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className={`inline-flex items-center py-2 px-3 text-xs font-medium text-white bg-red-700 border border-red-700 rounded-lg hover:bg-red-800 hover:border-red-800 focus:outline-none focus:ring-2 focus:ring-red-300 dark:bg-red-600 dark:border-red-600 dark:hover:bg-red-700 dark:hover:border-red-700 dark:focus:ring-red-900 ${confirmClass}`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;