import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Records from "./Components/Records";
import Deposit from "./Components/Deposit";
import Withdraw from "./Components/Withdraw";

export default function App() {
  return (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/records" element={<Records />} />
            <Route path="/deposit" element={<Deposit />} />
            <Route path="/withdraw" element={<Withdraw />} />
          </Routes>
        </BrowserRouter>
  );
}