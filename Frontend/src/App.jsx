import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Intro from "./Pages/Intro"
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import WarehouseDashboard from "./Pages/WarehouseDashboard";
import DealerDashboard from "./Pages/DealerDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/warehouse/dashboard" element={<WarehouseDashboard />} />
        <Route path="/dealer/dashboard" element={<DealerDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
