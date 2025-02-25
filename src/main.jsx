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
import { Auth0Provider } from "@auth0/auth0-react";

const domain = import.meta.env.VITE_AUTH0_DOMAIN;
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
const callbackUrl = "http://localhost:5173/"


createRoot(document.getElementById("root")).render(
  <Auth0Provider domain={domain} clientId={clientId} callbackUrl={callbackUrl}>
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
  </Auth0Provider>
);
