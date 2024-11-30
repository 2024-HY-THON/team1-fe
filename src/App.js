import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Music from "./pages/Music";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/music" element={<Music />} />
        </Routes>
        <NavBar />
      </div>
    </Router>
  );
}

export default App;