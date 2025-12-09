import React from "react";
import { LuX } from "react-icons/lu";

const Drawer = ({ isOpen, onClose, title, children }) => {
  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-30 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <div
        className={`fixed top-0 right-0 z-40 h-full w-full max-w-md p-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 shadow-xl transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        tabIndex="-1"
        aria-labelledby="drawer-right-label"
      >
        {/* Header */}
        <div className="flex justify-between items-center pb-4 border-b border-gray-200 dark:border-gray-700">
          <h5 id="drawer-right-label" className="text-xl font-semibold">
            {title}
          </h5>

          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white rounded-lg p-1.5 inline-flex items-center"
            aria-label="Close"
          >
            <LuX size={20} />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="mt-4">{children}</div>
      </div>
    </>
  );
};

export default Drawer;
