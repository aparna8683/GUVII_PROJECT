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
                    border border-gray-700 rounded-xl shadow-md 
                    hover:shadow-lg transition-all"
    >
      {/* Header */}
      <div
        className="flex items-start justify-between px-4 py-3 cursor-pointer select-none"
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
            className="text-gray-400 hover:text-indigo-400"
            aria-label="Pin question"
          >
            {isPinned ? <LuPin /> : <LuPinOff />}
          </button>

          <LuChevronDown
            className={`transform transition-transform duration-200 ${
              isExpanded ? "rotate-180" : ""
            }`}
            size={18}
          />
        </div>
      </div>

      {/* Expandable Answer */}
      <div
        ref={contentRef}
        style={{ height: isExpanded ? `${height}px` : "0px" }}
        className="overflow-hidden transition-all duration-300"
      >
        <div className="px-4 pb-4 pt-2">
          <AIResponsePreview content={answer} />
        </div>
      </div>

      {/* Footer */}
      {isExpanded && onLearnMore && (
        <div className="flex justify-end px-4 pb-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onLearnMore?.();
            }}
            className="flex items-center gap-2 
                       bg-emerald-600/80 text-white text-sm 
                       px-3 py-1.5 rounded-md 
                       hover:bg-emerald-600 transition-all"
          >
            <LuSparkles className="text-amber-300" />
            Learn More
          </button>
        </div>
      )}
    </div>
  );
};

export default QuestionCard;
