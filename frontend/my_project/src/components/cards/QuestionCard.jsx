import React, { useState, useEffect, useRef } from "react";
import { LuChevronDown, LuPin, LuPinOff, LuSparkles } from "react-icons/lu";
import AIResponsePreview from "../AIResponsePreview";
import ReactMarkdown from "react-markdown";

const QuestionCard = ({
  question,
  answer,
  onLearnMore,
  isPinned,
  onTogglePin,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [height, setHeight] = useState(0);
  const contentRef = useRef(null);

  useEffect(() => {
    if (isExpanded) {
      const el = contentRef.current;
      if (el) setHeight(el.scrollHeight + 10);
    } else {
      setHeight(0);
    }
  }, [isExpanded, answer]);

  return (
    <div
      className="w-full bg-gradient-to-br from-gray-900/95 to-gray-800/90
                 border border-gray-700 rounded-2xl shadow-lg
                 hover:shadow-indigo-500/50 transition-all duration-300 overflow-hidden"
    >
      {/* Header */}
      <div
        className="flex items-start justify-between px-5 py-4 cursor-pointer select-none"
        onClick={() => setIsExpanded((s) => !s)}
      >
        <div className="flex-1 pr-3">
          <ReactMarkdown
            components={{
              p: ({ children }) => (
                <p className="text-left text-base font-semibold leading-snug text-indigo-400">
                  {children}
                </p>
              ),
            }}
          >
            {String(question || "")}
          </ReactMarkdown>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onTogglePin?.();
            }}
            className="text-gray-400 hover:text-indigo-400 transition-colors"
            aria-label="Pin question"
          >
            {isPinned ? <LuPin size={20} /> : <LuPinOff size={20} />}
          </button>

          <LuChevronDown
            className={`transform transition-transform duration-300 ${
              isExpanded ? "rotate-180 text-indigo-400" : "text-gray-400"
            }`}
            size={20}
          />
        </div>
      </div>

      {/* Expandable Answer */}
      <div
        ref={contentRef}
        style={{ height: isExpanded ? `${height}px` : "0px" }}
        className="overflow-hidden transition-all duration-300"
      >
        <div className="px-5 pt-2 pb-4 border-t border-gray-700">
          <AIResponsePreview content={answer} />
        </div>
      </div>

      {/* Footer */}
      {isExpanded && onLearnMore && (
        <div className="flex justify-end px-5 pb-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onLearnMore?.();
            }}
            className="flex items-center gap-2
                       bg-gradient-to-r from-emerald-500 to-emerald-600
                       text-white text-sm px-4 py-2 rounded-lg
                       hover:brightness-110 transition-all shadow-md"
          >
            <LuSparkles className="text-yellow-300" size={16} />
            Learn More
          </button>
        </div>
      )}
    </div>
  );
};

export default QuestionCard;
