import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Pantry from "./pages/Pantry";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/pantry" element={<Pantry />} />
    </Routes>
  );
}

export default App;
