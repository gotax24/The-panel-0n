import { useContext, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { Link } from "react-router-dom";
import { handleInputChange } from "../helpers/HandleInputChange";
import PostData from "../hooks/PostData";
import GetData from "../hooks/GetData";

const CreateAnAccount = () => {
  const { theme } = useContext(ThemeContext);
  const [user, setUser] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
  });
  const { loading, error, post } = PostData("users");
  const { setData } = GetData();
  const [emailError, setEmailError] = useState();

  const SingUp = (e) => {
    e.preventDefault();
    post(user, setData, true);
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
      <div className="sing-up login-box">
        <p>Registrarse</p>
        <form>
          <div className="user-box">
            <input
              type="text"
              autoComplete="on"
              required
              onChange={(e) =>
                handleInputChange("name", e.target.value, setUser)
              }
            />
            <label>Nombre</label>
            <div className="user-box">
              <input
                type="text"
                autoComplete="on"
                required
                onChange={(e) =>
                  handleInputChange("lastName", e.target.value, setUser)
                }
              />
              <label>Apellido</label>
            </div>
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
          </div>
          <div className="user-box">
            <input
              className="input-singUp"
              type="password"
              autoComplete="on"
              required
              onChange={(e) =>
                handleInputChange("password", e.target.value, setUser)
              }
            />
            <label>Contraseña</label>
          </div>
          <a onClick={SingUp}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            {loading ? "Registrando..." : "Registrar"}
          </a>
        </form>
        <p>
          Ya tienes una cuenta?{" "}
          <Link to="/login" className="a2">
            Inicia Sesión!
          </Link>
        </p>
        {emailError ||
          (error && <span className="error">{emailError || error}</span>)}
        {(user.name === "" ||
          user.lastName === "" ||
          user.email === "" ||
          user.password === "") && (
          <p className="error">Un campo o varios campos estan vacios</p>
        )}
      </div>
    </>
  );
};

export default CreateAnAccount;
