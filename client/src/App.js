import React from "react";
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboar from "./pages/Dashboard";
import Prediction from "./pages/prediction";
import History from "./pages/History";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboar />} />
        <Route path="/prediction" element={<Prediction />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </Router>
  );
}

export default App;

