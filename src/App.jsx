import { useState } from "react";
import Editor from "./components/editor";
import Navbar from "./components/navbar";
import CodePreview from "./components/code-preview";

function App() {
  const [gridSizes, setGridSizes] = useState({
    none: { columns: 1, rows: 1 },
  });
  const [elements, setElements] = useState([]);

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
