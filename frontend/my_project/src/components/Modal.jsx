import React from "react";

const Modal = ({ children, isOpen, onClose, hideHeader }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center
                 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
      aria-hidden={!isOpen}
    >
      <div className="bg-gray-900 text-gray-100 rounded-xl shadow-xl w-11/12 max-w-lg relative overflow-hidden">
        {/* Header with close button */}
        {!hideHeader && (
          <div className="flex justify-between items-center border-b border-gray-700 p-4">
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        )}

        {/* Modal Content */}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
