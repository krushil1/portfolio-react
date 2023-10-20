import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import Index from "./components";
import Schedule from "./components/Schedule";
import Aviation from "./Pages/Aviation"

function App() {
  return (
    <Router className="container mx-auto">
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/aviation" element={<Aviation />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
