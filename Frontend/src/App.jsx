import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Intro from "./Pages/Intro"
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import WarehouseDashboard from "./Pages/WarehouseDashboard";
import DealerDashboard from "./Pages/DealerDashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (<>
    <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick pauseOnHover draggable theme="light" />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/warehouse/dashboard" element={<WarehouseDashboard />} />
        <Route path="/dealer/dashboard" element={<DealerDashboard />} />
      </Routes>
    </BrowserRouter>
  </>
  );
}

export default App;
