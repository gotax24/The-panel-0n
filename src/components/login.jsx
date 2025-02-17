import { useContext, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { Link, useNavigate } from "react-router-dom";
import "../css/Login.css";
import { handleInputChange } from "../helpers/HandleInputChange";
import GetData from "../hooks/GetData";

const Login = () => {
  const { theme } = useContext(ThemeContext);
  const navigation = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [emailError, setEmailError] = useState(null);
  const { data, loading, error } = GetData("users");

  const signIn = (e) => {
    e.preventDefault();
    const findUser = data.find(
      (u) => u.email === user.email && u.password === user.password
    );

    if (findUser) {
      localStorage.setItem("IdUser", findUser.id);
      navigation("/");
    }
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
              onChange={(e) =>
                handleInputChange(
                  "email",
                  e.target.value,
                  setUser,
                  setEmailError
                )
              }
            />
            <label>Correo</label>
          </div>
          <div className="user-box">
            <input
              className="input-login"
              type="password"
              autoComplete="on"
              required
              onChange={(e) =>
                handleInputChange("password", e.target.value, setUser)
              }
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
        {emailError ||
          (error && <span className="error">{emailError || error}</span>)}
        {(user.email === "" || user.password === "") && (
          <p>Complete los campos para avanzar</p>
        )}
      </div>
    </>
  );
};

export default Login;
