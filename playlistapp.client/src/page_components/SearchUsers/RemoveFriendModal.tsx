import React from "react";

interface RemoveFriendModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const RemoveFriendModal: React.FC<RemoveFriendModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[10000]">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Remove Friend?
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
          Are you sure you want to remove this friend?
        </p>
        <div className="flex justify-end space-x-2 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default RemoveFriendModal;
