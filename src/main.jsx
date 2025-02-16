import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./components/App.jsx";
import Home from "./Home.jsx";
import Login from "./components/login.jsx";
import Page404 from "./components/Page404.jsx";
import CreateAnAccount from "./components/CreateAnAccount.jsx";
import Task from "./components/Task.jsx";
import ThemeProvider from "./context/ThemeProvider.jsx";
import "./index.css";
import Users from "./components/Users.jsx";

createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="tasks" element={<Task />} />
          <Route path="statistics" element={"Estadisticas"} />
          <Route path="users" element={<Users />} />
        </Route>
        <Route path="/CreateAnAccount" element={<CreateAnAccount />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  </ThemeProvider>
);
