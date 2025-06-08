import Editor from "./components/editor";
import Navbar from "./components/navbar";

function App() {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <Editor />
    </div>
  );
}

export default App;
