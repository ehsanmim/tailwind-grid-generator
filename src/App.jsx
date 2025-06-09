import { useState, useEffect } from "react";
import Editor from "./components/editor";
import Navbar from "./components/navbar";
import CodePreview from "./components/code-preview";

function App() {
  const [gridSizes, setGridSizes] = useState({
    none: { columns: 1, rows: 1 },
  });
  const [elements, setElements] = useState([]);

  // Load state from URL on mount
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const grid = params.get("grid");
      const els = params.get("elements");
      if (grid) {
        setGridSizes(JSON.parse(decodeURIComponent(grid)));
      }
      if (els) {
        setElements(JSON.parse(decodeURIComponent(els)));
      }
    } catch {
      // ignore malformed URL
    }
  }, []);

  // Push state to URL when gridSizes or elements change
  useEffect(() => {
    // Only update URL if state is not the initial state
    const isInitialGrid =
      Object.keys(gridSizes).length === 1 &&
      gridSizes.none &&
      gridSizes.none.columns === 1 &&
      gridSizes.none.rows === 1;
    const isInitialElements = elements.length === 0;
    if (isInitialGrid && isInitialElements) return;
    const params = new URLSearchParams(window.location.search);
    params.set("grid", encodeURIComponent(JSON.stringify(gridSizes)));
    params.set("elements", encodeURIComponent(JSON.stringify(elements)));
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState(null, "", newUrl);
  }, [gridSizes, elements]);

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <Editor
        gridSizes={gridSizes}
        setGridSizes={setGridSizes}
        elements={elements}
        setElements={setElements}
      />
      <CodePreview elements={elements} gridSizes={gridSizes} />
    </div>
  );
}

export default App;
