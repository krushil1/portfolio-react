import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Portfolio from "./components/Portfolio";
import AviationPage from "./Pages/Aviation/AviationPage";
import React from "react";
import Chat from "./Pages/Chat/Chat.tsx";
import Resume from "./Pages/ResumePage/Resume.tsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/aviation" element={<AviationPage />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
