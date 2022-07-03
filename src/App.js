import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Login from "./Components/Login";
import Register from "./Components/Register";

export default function App() {
  return (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </BrowserRouter>
  );
}