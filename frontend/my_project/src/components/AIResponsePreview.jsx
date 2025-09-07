import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import { LuCopy, LuCheck, LuCode } from "react-icons/lu";

function CodeBlock({ code, language }) {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 p-4 rounded-2xl my-4 relative shadow-lg hover:scale-[1.02] transform transition-all duration-300">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center text-gray-300">
          <LuCode size={16} className="mr-2" />
          <span className="text-sm">{language || "Code"}</span>
        </div>
        <button
          onClick={copyCode}
          className="flex items-center text-sm font-medium text-white px-3 py-1 rounded-lg bg-gradient-to-r from-amber-500 to-orange-400 hover:from-amber-600 hover:to-orange-500 transition-all duration-300 shadow-md"
          aria-label="Copy code"
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

  return (
    <div className="ai-response-preview p-6 bg-gradient-to-br from-gray-900/95 to-gray-800/90 text-white rounded-2xl shadow-xl backdrop-blur-lg">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          p: ({ children }) => (
            <p className="mb-4 leading-6 text-gray-200">{children}</p>
          ),
          h1: ({ children }) => (
            <h1 className="text-3xl font-extrabold mt-6 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-orange-400">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-2xl font-bold mt-5 mb-3 text-amber-400">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-xl font-semibold mt-4 mb-2 text-amber-300">
              {children}
            </h3>
          ),
          a: ({ children, href }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 underline transition"
            >
              {children}
            </a>
          ),
          blockquote: ({ children }) => (
            <blockquote className="p-4 my-4 bg-gray-700/70 border-l-4 border-amber-500 italic rounded-lg shadow-inner">
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
                className="px-1 py-0.5 bg-gray-700/70 rounded-md text-sm text-amber-200"
                {...props}
              >
                {children}
              </code>
            );
          },
          table: ({ children }) => (
            <div className="overflow-x-auto my-4 rounded-lg shadow-inner">
              <table className="w-full table-auto border-collapse">
                {children}
              </table>
            </div>
          ),
          th: ({ children }) => (
            <th className="px-3 py-2 text-left text-xs font-semibold text-amber-300 bg-gray-700/50">
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
          img: ({ src, alt }) => (
            <img
              src={src}
              alt={alt}
              className="max-w-full h-auto rounded-xl my-4 shadow-lg transition-transform hover:scale-105"
            />
          ),
          ul: ({ children }) => (
            <ul className="list-disc ml-6 mb-4">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal ml-6 mb-4">{children}</ol>
          ),
          li: ({ children }) => (
            <li className="mb-2 text-gray-200">{children}</li>
          ),
          hr: () => <hr className="my-4 border-gray-600" />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default AIResponsePreview;
