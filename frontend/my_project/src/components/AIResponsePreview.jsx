import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import { LuCopy, LuCheck, LuCode } from "react-icons/lu";

function CodeBlock({ code, language }) {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    try {
      navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error("copy failed", e);
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded-xl my-4 relative shadow-md">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center text-gray-300">
          <LuCode size={16} className="mr-2" />
          <span className="text-sm">{language || "Code"}</span>
        </div>
        <button
          onClick={copyCode}
          className="flex items-center text-sm font-medium text-white px-3 py-1 rounded-lg 
                     bg-gradient-to-r from-indigo-500 to-purple-500 
                     hover:from-indigo-600 hover:to-purple-600 
                     transition-all duration-300 shadow-md"
        >
          {copied ? <LuCheck size={16} /> : <LuCopy size={16} />}
          {copied && <span className="ml-2 text-xs">Copied!</span>}
        </button>
      </div>

      <SyntaxHighlighter
        language={language}
        style={oneLight}
        customStyle={{
          fontSize: "13px",
          margin: 0,
          padding: "1rem",
          background: "transparent",
          borderRadius: "0.75rem",
          overflowX: "auto",
          color: "#f8f8f2",
        }}
      >
        {String(code).replace(/\n$/, "")}
      </SyntaxHighlighter>
    </div>
  );
}

const AIResponsePreview = ({ content }) => {
  if (!content) return null;

  // Normalize to string
  let safeContent = "";
  if (typeof content === "string") {
    safeContent = content;
  } else if (Array.isArray(content)) {
    safeContent = content.join("\n\n");
  } else if (typeof content === "object" && content !== null) {
    safeContent =
      content.explanation || content.text || JSON.stringify(content, null, 2);
  } else {
    safeContent = String(content);
  }

  // Replace some raw HTML
  safeContent = safeContent
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>\s*<p>/gi, "\n\n")
    .replace(/&nbsp;/gi, " ");

  return (
    <div
      className="ai-response-preview p-6 
                    bg-gradient-to-br from-gray-800/95 to-gray-900/95 
                    text-gray-100 rounded-xl shadow-lg leading-relaxed"
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          p: ({ children }) => (
            <p className="mb-3 text-gray-100 whitespace-pre-line">{children}</p>
          ),
          h1: ({ children }) => (
            <h1 className="text-2xl font-bold mt-6 mb-4 text-indigo-400">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-xl font-semibold mt-5 mb-3 text-indigo-300">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-lg font-medium mt-4 mb-2 text-indigo-200">
              {children}
            </h3>
          ),
          ul: ({ children }) => (
            <ul className="list-disc ml-5 space-y-1 text-gray-200">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal ml-5 space-y-1 text-gray-200">
              {children}
            </ol>
          ),
          li: ({ children }) => <li className="leading-relaxed">{children}</li>,
          blockquote: ({ children }) => (
            <blockquote className="p-4 my-4 bg-gray-700/70 border-l-4 border-indigo-500 italic rounded-lg shadow-inner">
              {children}
            </blockquote>
          ),
          code: ({ inline, className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || "");
            const isInline = !className;
            return !isInline && match ? (
              <CodeBlock
                code={String(children).replace(/\n$/, "")}
                language={match[1]}
              />
            ) : (
              <code
                className="px-1 py-0.5 bg-gray-700/70 rounded-md text-sm text-amber-300"
                {...props}
              >
                {children}
              </code>
            );
          },
          img: ({ src, alt }) => (
            <img
              src={src}
              alt={alt}
              className="max-w-full h-auto rounded-xl my-4 shadow-lg"
            />
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto my-4 rounded-lg shadow-inner">
              <table className="w-full table-auto border-collapse">
                {children}
              </table>
            </div>
          ),
          th: ({ children }) => (
            <th className="px-3 py-2 text-left text-xs font-semibold text-indigo-300 bg-gray-700/50">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-200">
              {children}
            </td>
          ),
          tr: ({ children }) => (
            <tr className="hover:bg-gray-700/50">{children}</tr>
          ),
          hr: () => <hr className="my-4 border-gray-600" />,
        }}
      >
        {safeContent}
      </ReactMarkdown>
    </div>
  );
};

export default AIResponsePreview;
