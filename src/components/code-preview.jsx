import { useState } from "react";

export default function CodePreview({ elements, gridSizes }) {
  const [jsx, setJsx] = useState(true);
  const gridClasses = Object.entries(gridSizes)
    .map(([key, value]) => {
      if (key === "none") {
        return `grid-cols-${value.columns} grid-rows-${value.rows}`;
      }
      return `${key}:grid-cols-${value.columns} ${key}:grid-rows-${value.rows}`;
    })
    .join(" ");

  const elementClasses = elements.map(({ placement }) => {
    return (
      Object.keys(placement)
        //sort them to be in the order of "none", "sm", "md", "lg", "xl"
        .sort((a, b) => {
          const order = ["none", "sm", "md", "lg", "xl"];
          return order.indexOf(a) - order.indexOf(b);
        })
        .map((key) => {
          if (key === "none") {
            return `col-start-${placement[key].colStart} col-end-${placement[key].colEnd} row-start-${placement[key].rowStart} row-end-${placement[key].rowEnd}`;
          }
          return `${key}:col-start-${placement[key].colStart} ${key}:col-end-${placement[key].colEnd} ${key}:row-start-${placement[key].rowStart} ${key}:row-end-${placement[key].rowEnd}`;
        })
        .join(" ")
    );
  });

  return (
    <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
      <h2 className="text-xl font-bold mb-4">Code Preview</h2>

      <div className="mb-4 flex items-center">
        <label className="mr-2">HTML</label>
        <input
          type="checkbox"
          checked={jsx}
          onChange={() => setJsx(!jsx)}
          className="toggle toggle-secondary"
        />
        <label className="ml-2">JSX</label>
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
