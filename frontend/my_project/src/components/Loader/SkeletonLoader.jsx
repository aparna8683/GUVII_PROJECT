import React from "react";

const SkeletonLoader = () => {
  return (
    <div role="status" className="animate-pulse space-y-4 max-w-3xl w-full">
      {/* Heading placeholder */}
      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-md w-1/2"></div>

      {/* Text lines placeholder */}
      <div className="space-y-2">
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-11/12"></div>
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-10/12"></div>
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-9/12"></div>
      </div>

      {/* Content block placeholder */}
      <div className="bg-gray-100 dark:bg-gray-700 rounded p-4 space-y-2">
        <div className="h-2.5 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
        <div className="h-2.5 bg-gray-300 dark:bg-gray-600 rounded w-2/3"></div>
        <div className="h-2.5 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
