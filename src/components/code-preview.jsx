import {
  ClipboardDocumentIcon,
  ClipboardIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

export default function CodePreview({ elements, gridSizes }) {
  const [jsx, setJsx] = useState(true);
  const [copied, setCopied] = useState(false);
  const gridClasses = Object.entries(gridSizes)
    .map(([key, value]) => {
      if (key === "none") {
        return `grid-cols-${value.columns} grid-rows-${value.rows}`;
      }
      return `${key}:grid-cols-${value.columns} ${key}:grid-rows-${value.rows}`;
    })
    .join(" ");

  const elementClasses = elements.map(({ placement }) => {
    const breakpoints = Object.keys(gridSizes);
    return breakpoints
      .map((key) => {
        if (!placement[key]) {
          // If no placement for this key, add hidden for that breakpoint
          return key === "none" ? "hidden" : `${key}:hidden`;
        }
        if (key === "none") {
          return `col-start-${placement[key].colStart} col-end-${placement[key].colEnd} row-start-${placement[key].rowStart} row-end-${placement[key].rowEnd}`;
        }
        return `${key}:col-start-${placement[key].colStart} ${key}:col-end-${placement[key].colEnd} ${key}:row-start-${placement[key].rowStart} ${key}:row-end-${placement[key].rowEnd}`;
      })
      .join(" ");
  });

  // Generate the code string for copying
  const getCodeString = () => {
    const gridLine = `<div ${
      jsx ? "className" : "class"
    }="grid ${gridClasses}">`;
    const elementLines = elements.map(
      (element, index) =>
        `  <div ${jsx ? "className" : "class"}="${elementClasses[index]}">${
          element.name
        }</div>`
    );
    return [gridLine, ...elementLines, "</div>"].join("\n");
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(getCodeString());
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Optionally handle error
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
      <div className="mb-4 flex items-center gap-2">
        <h2 className="text-xl font-bold">Code Preview</h2>
        <label>HTML</label>
        <input
          type="checkbox"
          checked={jsx}
          onChange={() => setJsx(!jsx)}
          className="toggle toggle-secondary"
        />
        <label>JSX</label>
        <span
          onClick={handleCopy}
          title={copied ? "Copied!" : "Copy to clipboard"}
        >
          {copied ? (
            <div className="flex items-center text-green-500">
              <ClipboardDocumentIcon className="h-6 w-6 cursor-pointer" />
              <span className="ml-2">Copied!</span>
            </div>
          ) : (
            <ClipboardIcon className="h-6 w-6 text-gray-500 cursor-pointer" />
          )}
        </span>
      </div>

      <div className="mockup-code w-full">
        <pre>
          <code>{`<div ${
            jsx ? "className" : "class"
          }="grid ${gridClasses}">`}</code>
        </pre>

        {elements.map((element, index) => (
          <pre key={index}>
            <code>{`  <div ${jsx ? "className" : "class"}="${
              elementClasses[index]
            }">${element.name}</div>`}</code>
          </pre>
        ))}

        <pre>
          <code>{`</div>`}</code>
        </pre>
      </div>
    </div>
  );
}
