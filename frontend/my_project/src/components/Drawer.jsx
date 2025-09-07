import React from "react";
import { LuX } from "react-icons/lu";

const Drawer = ({ isOpen, onClose, title, children }) => {
  return (
    <div
      className={`fixed top-[64px] right-0 z-40 h-[calc(100vh-64px)] p-4 overflow-y-auto transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
      tabIndex="-1"
      aria-labelledby="drawer-right-label"
    >
      {/* Header */}
      <div className="flex justify-between items-center pb-4 border-b border-gray-200">
        <h5
          id="drawer-right-label"
          className="text-xl font-semibold text-gray-900"
        >
          {title}
        </h5>
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
          aria-label="Close"
        >
          <LuX size={16} />
        </button>
      </div>
      {/* Drawer Content */}
      <div className="mt-4">{children}</div>
    </div>
  );
};

export default Drawer;
