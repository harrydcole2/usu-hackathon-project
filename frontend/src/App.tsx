import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Pantry from "./pages/Pantry";
import Layout from "./pages/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Help from "./pages/Help";
import { Button } from "./components/ui/button";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Layout />}>
        <Route path="/pantry" element={<Pantry />} />
        <Route
          path="/recipes"
          element={
            <div>
              Recipes Page (Coming Soon)<Button>hello</Button>
            </div>
          }
        />
        <Route path="/help" element={<Help/>} />
      </Route>
    </Routes>
  );
}

export default App;
