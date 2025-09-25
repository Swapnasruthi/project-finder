import React from 'react';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-brand-secondary rounded-lg shadow-xl w-full max-w-md p-6 sm:p-8 transform transition-all" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        <p className="mt-4 text-brand-text-secondary">{message}</p>
        <div className="mt-6 flex justify-end gap-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-700 text-white text-sm font-semibold rounded-lg hover:bg-slate-600 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-500 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
