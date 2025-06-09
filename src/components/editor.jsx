import { Button, Card, Form, Hero, Input, Link, Select } from "react-daisyui";
import GridView from "./grid-view";
import { useState } from "react";

export default function Editor({
  gridSizes,
  setGridSizes,
  elements,
  setElements,
}) {
  // updated initial grid sizes: only "none" exists

  const [breakpoint, setBreakpoint] = useState("none");
  // state for new breakpoint selection
  const [newBreakpoint, setNewBreakpoint] = useState("");
  const [newElementName, setNewElementName] = useState("");
  const [activeElement, setActiveElement] = useState(null);
  const [editingElementIdx, setEditingElementIdx] = useState(null);
  const [editingElementName, setEditingElementName] = useState("");

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
      <Hero.Content className="flex-col lg:flex-row-reverse w-full items-start max-w-full">
        <div className="text-center lg:text-left">
          <label className="label  mt-4">
            <span className="label-text">Active Breakpoint</span>
          </label>
          <div className="flex gap-2 justify-center">
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
          <div className="flex gap-2 justify-center mt-4">
            <label className="label">
              <span className="label-text">Cols</span>
            </label>
            <Select
              value={gridSizes[breakpoint].columns}
              size="sm"
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
              {Array.from({ length: 16 }, (_, i) => (
                <option key={`col-${i + 1}`} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </Select>
            <label className="label">
              <span className="label-text">Rows</span>
            </label>
            <Select
              value={gridSizes[breakpoint].rows}
              size="sm"
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
              {Array.from({ length: 50 }, (_, i) => (
                <option key={`row-${i + 1}`} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </Select>
          </div>

          <label className="label  mt-4">
            <span className="label-text">Add new breakpoint</span>
          </label>
          <div className="flex gap-2 justify-center">
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

          <div className="mt-4">
            <p className="font-bold">Elements List:</p>
            <ul>
              {elements.map((el, idx) => (
                <li
                  key={el.name + idx}
                  className={`mb-2 bg-amber-200 p-2 rounded flex flex-col`}
                >
                  <div className="flex items-center justify-between">
                    {editingElementIdx === idx ? (
                      <input
                        className="input input-bordered input-sm flex-1 mr-2"
                        value={editingElementName}
                        autoFocus
                        onChange={(e) => setEditingElementName(e.target.value)}
                        onBlur={() => {
                          if (editingElementName.trim()) {
                            setElements(
                              elements.map((item, i) =>
                                i === idx
                                  ? { ...item, name: editingElementName }
                                  : item
                              )
                            );
                          }
                          setEditingElementIdx(null);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            if (editingElementName.trim()) {
                              setElements(
                                elements.map((item, i) =>
                                  i === idx
                                    ? { ...item, name: editingElementName }
                                    : item
                                )
                              );
                            }
                            setEditingElementIdx(null);
                          } else if (e.key === "Escape") {
                            setEditingElementIdx(null);
                          }
                        }}
                      />
                    ) : (
                      <span
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          setEditingElementIdx(idx);
                          setEditingElementName(el.name);
                        }}
                        title="Click to rename"
                      >
                        {el.name}
                      </span>
                    )}
                    <button
                      aria-label="Remove"
                      className="text-red-600 hover:text-red-800"
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
                  </div>
                  <div className="flex gap-2 mt-2">
                    {Object.keys(gridSizes).map((bp) => {
                      let color = "error";
                      if (el.placement[bp]) color = "success";
                      if (
                        activeElement &&
                        activeElement.name === el.name &&
                        breakpoint === bp
                      )
                        color = "warning";
                      return (
                        <Button
                          key={bp}
                          size="xs"
                          color={color}
                          className={
                            color === "warning" ? "animate-pulse" : undefined
                          }
                          onClick={() => {
                            if (
                              activeElement &&
                              activeElement.name === el.name &&
                              breakpoint === bp
                            ) {
                              setActiveElement(null);
                              // Only setBreakpoint("none") if the current activeElement is being toggled off
                              // and the current breakpoint is not used by any other active element
                              // Otherwise, leave the breakpoint as is
                            } else {
                              setActiveElement(el);
                              setBreakpoint(bp);
                            }
                          }}
                        >
                          {bp}
                        </Button>
                      );
                    })}
                  </div>
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
                onKeyDown={(e) => {
                  if (e.key === "Enter" && newElementName.trim()) {
                    if (
                      elements.some((el) => el.name === newElementName.trim())
                    ) {
                      alert("Element with this name already exists.");
                      return;
                    }
                    const newEl = {
                      name: newElementName,
                      placement: {},
                    };
                    setElements([...elements, newEl]);
                    setActiveElement(newEl);
                    setNewElementName("");
                  }
                }}
              />
              <Button
                onClick={() => {
                  if (!newElementName.trim()) return;
                  if (
                    elements.some((el) => el.name === newElementName.trim())
                  ) {
                    alert("Element with this name already exists.");
                    return;
                  }
                  const newEl = {
                    name: newElementName,
                    placement: {},
                  };
                  setElements([...elements, newEl]);
                  setActiveElement(newEl);
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
          activeElement={activeElement}
        />
      </Hero.Content>
    </Hero>
  );
}
