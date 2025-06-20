import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Results from "./Results.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter basename="/exams-simulator">
      <Routes>
        <Route index element={<App />} />
        <Route path="results" element={<Results />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
