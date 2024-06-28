import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Components/navbar/Navbar";
import Home from "./Pages/home/Home";
import Show from "./Pages/show/Show";
import Edit from "./Pages/edit/Edit";
import Create from "./Pages/create/Create";

export default function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/logs" replace />} />
        <Route path="/logs" element={<Home />} />
        <Route path="/logs/new" element={<Create />} />
        <Route path="/logs/:index" element={<Show />} />
        <Route path="/logs/:index/edit" element={<Edit />} />
      </Routes>
    </div>
  );
}
