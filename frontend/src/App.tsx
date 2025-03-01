import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Pantry from "./pages/Pantry";
import Layout from "./pages/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Recipes from "./pages/Recipes";
import Receipts from "./pages/Receipts";
import Help from "./pages/Help";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Layout />}>
        <Route path="/pantry" element={<Pantry />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/receipts" element={<Receipts />} />
        <Route path="/help" element={<Help />} />
      </Route>
    </Routes>
  );
}

export default App;
