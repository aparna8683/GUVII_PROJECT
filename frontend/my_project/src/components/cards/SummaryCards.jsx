import { LucideTrash2 } from "lucide-react";
import React from "react";
import { getInitials } from "../../utils/helper";

const SummaryCard = ({
  colors,
  role,
  topicsToFocus,
  experience,
  questions,
  description,
  lastUpdated,
  onSelect,
  onDelete,
}) => {
  return (
    <div
      className="bg-white rounded-2xl overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
      onClick={onSelect}
    >
      {/* Header */}
      <div
        className="flex items-center gap-4 p-5"
        style={{
          background:
            colors.bgcolor || "linear-gradient(135deg, #FF9324, #E99A4B)",
        }}
      >
        {/* Initials Circle */}
        <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-lg">
          <span className="text-lg md:text-xl font-bold text-black">
            {getInitials(role)}
          </span>
        </div>

        {/* Title and Topics */}
        <div className="flex-grow">
          <h2 className="text-xl md:text-2xl font-bold text-white">{role}</h2>
          <p className="text-sm md:text-base text-white/80 mt-1">
            {topicsToFocus}
          </p>
        </div>

        {/* Delete Button */}
        <button
          className="hidden group-hover:flex items-center gap-1 text-sm text-red-500 hover:text-red-700 transition"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          <LucideTrash2 size={16} />
          Delete
        </button>
      </div>

      {/* Stats Section */}
      <div className="flex justify-between p-5 bg-gray-50 border-t border-gray-200">
        <div className="flex flex-col">
          <span className="text-xs text-gray-500 uppercase">Experience</span>
          <span className="text-sm font-semibold text-gray-800">
            {experience} {experience === 1 ? "year" : "years"}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-gray-500 uppercase">Questions</span>
          <span className="text-sm font-semibold text-gray-800">
            {questions} Q&A
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-gray-500 uppercase">Last Updated</span>
          <span className="text-sm font-semibold text-gray-800">
            {lastUpdated}
          </span>
        </div>
      </div>

      {/* Description */}
      <div className="p-5 bg-gray-50 border-t border-gray-200">
        <p className="text-gray-700 text-sm md:text-base">{description}</p>
      </div>
    </div>
  );
};

export default SummaryCard;
