import React, { useEffect, useState, useRef } from "react";
import { LuChevronDown, LuPin, LuPinOff, LuSparkles } from "react-icons/lu";

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
      const contentHeight = contentRef.current.scrollHeight;
      setHeight(contentHeight + 10);
    } else {
      setHeight(0);
    }
  }, [isExpanded]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      {/* The rest of the component's JSX would be here */}
      <div className="card-header" onClick={toggleExpand}>
        <h3>{question}</h3>
        <LuChevronDown className={isExpanded ? "rotated" : ""} />
      </div>
      <div
        className="card-content"
        style={{ height: isExpanded ? `${height}px` : "0px" }}
        ref={contentRef}
      >
        <AIResponsePreview content={answer}/>
      </div>
    </div>
  );
};

export default QuestionCard;
