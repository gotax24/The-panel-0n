import { useContext, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/Login.css";
import { handleInputChange } from "../helpers/HandleInputChange";

const Login = () => {
  const { theme } = useContext(ThemeContext);
  const navigation = useNavigate();

  const API = import.meta.env.VITE_API_URL

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const signIn = (e) => {
    e.preventDefault();
    if (user.email === "" || user.password === "") {
      return setError("Complete los campos para avanzar"), setLoading(false);
    }

    setLoading(true);
    setError(null);

    axios
      .get(API+"users")
      .then((response) => {
        const users = response.data;
        const findUser = users.find(
          (u) => u.email === user.email && u.password === user.password
        );

        if (findUser) {
          setLoading(true);
          localStorage.setItem("IdUser", findUser.id);
          navigation("/");
        } else {
          setLoading(false);
          setError("No se encontro ningun usuario");
        }
      })
      .catch((e) => {
        setLoading(false);
        console.error(e);
        setError(e.response.data.error);
      });
  };

  return (
    <>
      <div className="container-welcome">
        <img
          className="logo"
          src={theme === "dark" ? "/logo-light.svg" : "/logo-dark.svg"}
          alt="Logo de la pagina"
        />
        <h1 className="title">The panel-0n</h1>
      </div>
      <div className="login-box">
        <p>Iniciar sesion</p>
        <form>
          <div className="user-box">
            <input
              type="email"
              autoComplete="on"
              required
              onChange={(e) => handleInputChange("email", e.target.value, setUser, setError)}
            />
            <label>Correo</label>
          </div>
          <div className="user-box">
            <input
              className="input-login"
              type="password"
              autoComplete="on"
              required
              onChange={(e) => handleInputChange("password", e.target.value, setUser, setError)}
            />
            <label>Contraseña</label>
          </div>
          <a onClick={signIn} href="#">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            {loading ? "Entrando..." : "Entrar"}
          </a>
        </form>
        <p>
          No tienes una cuenta?{" "}
          <Link to="/CreateAnAccount" className="a2">
            Registrate!
          </Link>
        </p>
        {error && <span className="error">{error}</span>}
      </div>
    </>
  );
};

export default Login;
