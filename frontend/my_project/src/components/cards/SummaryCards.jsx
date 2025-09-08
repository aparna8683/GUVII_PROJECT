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
      className="group bg-white rounded-2xl overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl border border-gray-200"
      onClick={onSelect}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between p-5"
        style={{
          background:
            colors.bgcolor || "linear-gradient(135deg, #6366F1, #EC4899)",
        }}
      >
        <div className="flex items-center gap-4">
          {/* Initials Circle */}
          <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-lg">
            <span className="text-xl md:text-2xl font-extrabold text-black">
              {getInitials(role)}
            </span>
          </div>

          {/* Title and Topics */}
          <div>
            <h2 className="text-2xl font-bold text-black">{role}</h2>
            <p className="text-sm md:text-base text-black font-semibold mt-1">
              {topicsToFocus}
            </p>
          </div>
        </div>

        {/* Delete Button */}
        <button
          className="opacity-0 group-hover:opacity-100 flex items-center gap-1 text-sm text-black hover:text-red-600 font-medium transition"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          <LucideTrash2 size={18} />
          Delete
        </button>
      </div>

      {/* Description */}
      {description && (
        <div className="p-5 bg-white">
          <p className="text-black text-base font-medium leading-relaxed">
            {description}
          </p>
        </div>
      )}

      {/* Props as circular badges */}
      <div className="flex items-center justify-center gap-4 p-4 bg-gray-50 border-t border-gray-200">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center shadow-md">
            <span className="text-black font-bold text-sm">
              {experience} {experience === 1 ? "yr" : "yrs"}
            </span>
          </div>
          <span className="text-xs font-semibold text-black mt-1">
            Experience
          </span>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-pink-100 flex items-center justify-center shadow-md">
            <span className="text-black font-bold text-sm">
              {questions} Q&A
            </span>
          </div>
          <span className="text-xs font-semibold text-black mt-1">
            Questions
          </span>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center shadow-md">
            <span className="text-black font-bold text-sm">{lastUpdated}</span>
          </div>
          <span className="text-xs font-semibold text-black mt-1">
            Last Updated
          </span>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;
