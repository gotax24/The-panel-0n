import { useContext, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/Login.css";

const Login = () => {
  const { theme } = useContext(ThemeContext);
  const navigation = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const signIn = (e) => {
    e.preventDefault();
    if (user.email === "" || user.password === "") {
      setError("Complete los campos para avanzar");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    axios
      .get("https://679ab45c747b09cdcccf88a3.mockapi.io/api/users")
      .then((response) => {
        const users = response.data;
        const findUser = users.find(
          (u) => u.email === user.email && u.password === user.password
        );

        if (findUser) {
          setLoading(true);
          localStorage.setItem("tokeDashboard", findUser.token);
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

  const handleInputChange = (field, value) => {
    setUser((prevUser) => ({
      ...prevUser,
      [field]: value,
    }));
  };

  return (
    <>
      <div className="container-welcome">
        <img
          className="logo-login"
          src={theme === "dark" ? "/logo-light.svg" : "/logo-dark.svg"}
          alt="Logo de la pagina"
        />
        <h1 className="title-login">The panel-0n</h1>
      </div>
      <div className="login-box">
        <p>Iniciar sesion</p>
        <form>
          <div className="user-box">
            <input
              type="email"
              autoComplete="on"
              required
              onChange={(e) => handleInputChange("email", e.target.value)}
            />
            <label>Correo</label>
          </div>
          <div className="user-box">
            <input
              className="input-login"
              type="password"
              autoComplete="on"
              required
              onChange={(e) => handleInputChange("password", e.target.value)}
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
          <a href="" className="a2">
            Registrate!
          </a>
        </p>
        {error && (
          <span className="error-login">Ocurrio un error: {error}</span>
        )}
      </div>
    </>
  );
};

export default Login;

/**<!-- From Uiverse.io by glisovic01 --> 
<div className="login-box">
  <p>Login</p>
  <form>
    <div className="user-box">
       <input
                type="email"
                autoComplete="on"
                required
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
      <label>Correo</label>
    </div>
    <div className="user-box">
       <input
                className="input-login"
                type="password"
                autoComplete="on"
                required
                onChange={(e) => handleInputChange("password", e.target.value)}
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
  <p>No tienes una cuenta? <a href="" className="a2">Registrate!</a></p>
</div> */
