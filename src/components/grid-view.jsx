import React, { useState, useRef } from "react";
import { Button, Card, Form, Hero, Input, Link } from "react-daisyui";

export default function GridView({
  columns,
  rows,
  elements,
  setElements,
  breakpoint = "none",
}) {
  const containerRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [selection, setSelection] = useState(null); // { startRow, startCol, endRow, endCol }

  const getCellFromEvent = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    const cellWidth = rect.width / columns;
    const cellHeight = rect.height / rows;
    const col = Math.min(
      columns,
      Math.floor((e.clientX - rect.left) / cellWidth) + 1
    );
    const row = Math.min(
      rows,
      Math.floor((e.clientY - rect.top) / cellHeight) + 1
    );
    return { row, col };
  };

  const handleMouseDown = (e) => {
    if (!containerRef.current) return;
    const { row, col } = getCellFromEvent(e);
    setSelection({ startRow: row, startCol: col, endRow: row, endCol: col });
    setDragging(true);
  };

  const handleMouseMove = (e) => {
    if (!dragging || !selection) return;
    const { row, col } = getCellFromEvent(e);
    setSelection((prev) => ({ ...prev, endRow: row, endCol: col }));
  };

  const handleMouseUp = () => {
    if (!dragging || !selection) return;
    const name = prompt("Enter name for new cell:");
    if (name) {
      const startRow = Math.min(selection.startRow, selection.endRow);
      const endRow = Math.max(selection.startRow, selection.endRow);
      const startCol = Math.min(selection.startCol, selection.endCol);
      const endCol = Math.max(selection.startCol, selection.endCol);
      setElements((prev) => [
        ...prev,
        {
          name,
          placement: {
            [breakpoint]: {
              colStart: startCol,
              colEnd: endCol + 1,
              rowStart: startRow,
              rowEnd: endRow + 1,
            },
          },
        },
      ]);
    }
    setDragging(false);
    setSelection(null);
  };

  return (
    <Card className="w-full shadow-2xl bg-base-100">
      <Card.Body>
        <div
          className="grid gap-2 relative"
          style={{
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
            gridTemplateRows: `repeat(${rows}, auto)`,
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          ref={containerRef}
        >
          {Array.from({ length: rows }, (_, rowIndex) => (
            <React.Fragment key={rowIndex}>
              {Array.from({ length: columns }, (_, colIndex) => (
                <Button
                  key={`${rowIndex}-${colIndex}`}
                  style={{ gridColumn: colIndex + 1, gridRow: rowIndex + 1 }}
                  className="w-full h-16"
                >
                  {rowIndex + 1},{colIndex + 1}
                </Button>
              ))}
            </React.Fragment>
          ))}
          {elements.map((el, idx) => {
            const place = el.placement && el.placement[breakpoint];
            if (!place) return null;
            return (
              <Button
                key={el.name + idx}
                className="bg-blue-500 text-white z-10 absolute"
                onMouseDown={(e) => e.stopPropagation()} // prevent dragging on blue element
                onClick={(e) => {
                  e.stopPropagation();
                  const newName = prompt("Enter new name:", el.name);
                  if (newName) {
                    setElements((prev) =>
                      prev.map((item, i) =>
                        i === idx ? { ...item, name: newName } : item
                      )
                    );
                  }
                }}
                onContextMenu={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (confirm("Remove this cell?")) {
                    setElements((prev) => prev.filter((_, i) => i !== idx));
                  }
                  return false;
                }}
                style={{
                  gridColumnStart: place.colStart,
                  gridColumnEnd: place.colEnd,
                  gridRowStart: place.rowStart,
                  gridRowEnd: place.rowEnd,
                  width: "100%",
                  height: "100%",
                }}
              >
                {el.name}
              </Button>
            );
          })}
          {/* Optional: during dragging, show a border highlight */}
          {dragging && selection && (
            <div
              className="border-2 border-dashed border-blue-500 z-20 absolute"
              style={{
                gridColumnStart: Math.min(selection.startCol, selection.endCol),
                gridColumnEnd:
                  Math.max(selection.startCol, selection.endCol) + 1,
                gridRowStart: Math.min(selection.startRow, selection.endRow),
                gridRowEnd: Math.max(selection.startRow, selection.endRow) + 1,
                width: "100%",
                height: "100%",
              }}
            />
          )}
        </div>
      </Card.Body>
    </Card>
  );
}
