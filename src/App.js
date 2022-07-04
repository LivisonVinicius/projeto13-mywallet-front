import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Records from "./Components/Records";

export default function App() {
  return (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/records" element={<Records />} />
          </Routes>
        </BrowserRouter>
  );
}