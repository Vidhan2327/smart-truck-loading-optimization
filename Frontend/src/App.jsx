import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Intro from "./Pages/Intro";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import WarehouseDashboard from "./Pages/WarehouseDashboard";
import DealerDashboard from "./Pages/DealerDashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./Components/ProtectedRoute";

function App() {
  return (<>
    <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick pauseOnHover draggable theme="light" />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* PROTECTED ROUTES */}
        <Route
          path="/warehouse/dashboard"
          element={
            <ProtectedRoute>
              <WarehouseDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dealer/dashboard"
          element={
            <ProtectedRoute>
              <DealerDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  </>
  );
}

export default App;
