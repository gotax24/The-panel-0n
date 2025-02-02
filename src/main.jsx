import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./components/App.jsx";
import Page404 from "./components/Page404.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={"Inicio"} />
        <Route path="list" element={"lista de tarea"} />
        <Route path="statistics" element={"Estadisticas"} />
        <Route path="calendar" element={"calendario"} />
      </Route>
      <Route path="/login" element={"login"} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  </BrowserRouter>
);
