import { useState } from "react";
import "./App.css";
import DashboardPage from "./pages/DashboardPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FormBuilderPage from "./pages/FormBuilderPage";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import FormPreviewPage from "./pages/FormPreviewPage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <Router>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/form-builder/:userId" element={<FormBuilderPage />} />
            <Route path="/preview/:userId" element={<FormPreviewPage />} />
          </Routes>
        </Router>
      </DndProvider>
    </>
  );
}

export default App;
