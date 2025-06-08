import { Button, Card, Form, Hero, Input, Link, Select } from "react-daisyui";
import GridView from "./grid-view";
import { useState } from "react";

export default function Editor() {
  // updated initial grid sizes: only "none" exists
  const [gridSizes, setGridSizes] = useState({
    none: { columns: 1, rows: 1 },
  });
  const [breakpoint, setBreakpoint] = useState("none");
  // state for new breakpoint selection
  const [newBreakpoint, setNewBreakpoint] = useState("");
  const [elements, setElements] = useState([]);
  const [newElementName, setNewElementName] = useState(""); // state for new element name

  console.log("elements", elements);
  // compute available breakpoints not already added
  const availableOptions = ["sm", "md", "lg", "xl", "2xl"].filter(
    (bp) => !(bp in gridSizes)
  );

  // function to add new grid size
  const addGridSize = () => {
    const bp = newBreakpoint;
    if (bp && !gridSizes[bp]) {
      setGridSizes((prev) => ({
        ...prev,
        [bp]: { columns: 1, rows: 1 },
      }));
      setBreakpoint(bp);
      setNewBreakpoint("");
    }
  };

  // function to remove current breakpoint if not "none"
  const removeGridSize = () => {
    if (breakpoint !== "none") {
      setGridSizes((prev) => {
        const { [breakpoint]: removed, ...rest } = prev;
        return rest;
      });
      setBreakpoint("none");
    }
  };

  return (
    <Hero>
      <Hero.Content className="flex-col lg:flex-row-reverse w-full items-start">
        <div className="text-center lg:text-left">
          <p className="text-2xl font-bold">Choose a breakpoint!</p>
          <div className="flex gap-2 justify-center mt-4">
            {/* dynamic breakpoint options */}
            <Select
              value={breakpoint}
              onChange={(event) => setBreakpoint(event.target.value)}
            >
              {Object.keys(gridSizes).map((bp) => (
                <option key={bp} value={bp}>
                  {bp}
                </option>
              ))}
            </Select>
            <Button
              onClick={removeGridSize}
              disabled={breakpoint === "none"}
              size="sm"
              className="h-10!"
            >
              Remove Breakpoint
            </Button>
          </div>
          {/* Select and button to add a new grid size */}
          <div className="flex gap-2 justify-center mt-4">
            <Select
              value={newBreakpoint}
              onChange={(e) => setNewBreakpoint(e.target.value)}
            >
              <option value="">Select breakpoint</option>
              {availableOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </Select>
            <Button onClick={addGridSize} disabled={!newBreakpoint}>
              Add Breakpoint
            </Button>
          </div>
          {/* Existing select elements for columns and rows */}
          <div className="flex gap-2 justify-center mt-4">
            <Select
              value={gridSizes[breakpoint].columns}
              onChange={(event) =>
                setGridSizes((prev) => ({
                  ...prev,
                  [breakpoint]: {
                    ...prev[breakpoint],
                    columns: Number(event.target.value),
                  },
                }))
              }
            >
              {Array.from({ length: 20 }, (_, i) => (
                <option key={`col-${i + 1}`} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </Select>
            <Select
              value={gridSizes[breakpoint].rows}
              onChange={(event) =>
                setGridSizes((prev) => ({
                  ...prev,
                  [breakpoint]: {
                    ...prev[breakpoint],
                    rows: Number(event.target.value),
                  },
                }))
              }
            >
              {Array.from({ length: 20 }, (_, i) => (
                <option key={`row-${i + 1}`} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </Select>
          </div>
          <div className="mt-4">
            <p className="font-bold">Elements List:</p>
            <ul>
              {elements.map((el, idx) => (
                <li
                  key={el.name + idx}
                  className="mb-2 bg-amber-200 p-2 rounded flex items-center justify-between"
                >
                  <span>
                    {el.name} - placements:{" "}
                    {Object.keys(el.placement).join(", ")}
                  </span>
                  <button
                    aria-label="Remove"
                    className="ml-2 text-red-600 hover:text-red-800"
                    onClick={() =>
                      setElements(elements.filter((_, i) => i !== idx))
                    }
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
            {/* Input and button to add new element */}
            <div className="flex gap-2 mt-2">
              <Input
                placeholder="Element name"
                value={newElementName}
                onChange={(e) => setNewElementName(e.target.value)}
                className="flex-1"
              />
              <Button
                onClick={() => {
                  if (!newElementName.trim()) return;
                  setElements([
                    ...elements,
                    {
                      name: newElementName,
                      placement: {
                        none: {
                          colStart: 1,
                          colEnd: 2,
                          rowStart: 1,
                          rowEnd: 2,
                        },
                      },
                    },
                  ]);
                  setNewElementName("");
                }}
                disabled={!newElementName.trim()}
              >
                Add
              </Button>
            </div>
          </div>
        </div>
        <GridView
          elements={elements}
          setElements={setElements}
          columns={gridSizes[breakpoint].columns}
          rows={gridSizes[breakpoint].rows}
          breakpoint={breakpoint}
        />
      </Hero.Content>
    </Hero>
  );
}
