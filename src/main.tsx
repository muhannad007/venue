import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import Admin from "./Admin.tsx";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/Admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
