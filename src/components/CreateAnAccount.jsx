import { useContext, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { Link } from "react-router-dom";
import { handleInputChange } from "../helpers/HandleInputChange";
import PostData from "../hooks/PostData.js";
import GetData from "../hooks/GetData.js";
import useToggleSee from "../hooks/useToggleSee.js";
import EyeToggle from "./EyeToggle.jsx";

const CreateAnAccount = () => {
  const { theme } = useContext(ThemeContext);

  const [user, setUser] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
  });

  const { loading, error, post } = PostData("users");
  const { data, setData } = GetData("users");
  const [singUpError, setSingUpError] = useState(null);
  const { see, changeSee } = useToggleSee(theme);

  const SingUp = (e) => {
    e.preventDefault();

    if (
      user.name === "" ||
      user.lastName === "" ||
      user.email === "" ||
      user.password === ""
    ) {
      return;
    }

    if (
      verifyEmail(data, user.email) &&
      verifyPassword(user.password) &&
      verifyText("name",user.name) &&
      verifyText("lastname",user.lastName)
    )
      post(user, setData, true);
  };

  const verifyEmail = (users, email) => {
    const findEmail = users.find((newUser) => newUser.email === email);

    // Expresión regular para validar solo ciertos dominios
    const emailRegex =
      /^[a-zA-Z0-9._%+-]+@(gmail\.com|outlook\.com|hotmail\.com|yahoo\.com|icloud\.com|protonmail\.com)$/;

    if (!emailRegex.test(email)) {
      setSingUpError(
        "El email debe ser de un proveedor válido (Gmail, Outlook, Yahoo, etc.)"
      );
      return false;
    }

    if (findEmail) {
      setSingUpError("El email ya existe");
      return false;
    }

    setSingUpError(null);
    return true;
  };

  const verifyText = (fieldName, text) => {    
    const errorMessages = {
      name: "El nombre solo puede contener letras",
      lastName: "El apellido solo puede contener letras"
    };

    if (!/^[a-zA-Z]+$/.test(text)) {
      setSingUpError(errorMessages[fieldName]);
      return false;
    }
    
    setSingUpError(null);
    return true;
  };

  const verifyPassword = (password) => {
    const minimumQuantity = 8;

    if (password.length < minimumQuantity) {
      setSingUpError("La contraseña debe tener minimo 8 caracteres");
      return false;
    } else if (!/[A-Z]/.test(password)) {
      setSingUpError("La contraseña debe tener al menos una mayuscula");
      return false;
    } else if (!/[a-z]/.test(password)) {
      setSingUpError("La contraseña debe tener al menos una miniscula");
      return false;

      //Para verificar si tiene al menos un numero
    } else if (!/\d/.test(password)) {
      setSingUpError("La contraseña debe tener al menos un numero");
      return false;
    } else if (!/[|#$%&*,/;+-._?]/.test(password)) {
      setSingUpError("La contraseña debe tener al menos un caracter especial");
      return false;
    }

    setSingUpError(null);
    return true;
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
              onChange={(e) => {
                handleInputChange("name", e.target.value, setUser);
                verifyText("name", e.target.value);
              }}
            />
            <label>Nombre</label>
            <div className="user-box">
              <input
                type="text"
                autoComplete="on"
                required
                onChange={(e) => {
                  handleInputChange("lastName", e.target.value, setUser);
                  verifyText("lastName", e.target.value);
                }}
              />
              <label>Apellido</label>
            </div>
            <div className="user-box">
              <input
                type="email"
                autoComplete="on"
                required
                onChange={(e) => {
                  handleInputChange(
                    "email",
                    e.target.value,
                    setUser,
                    setSingUpError
                  );

                  verifyEmail(data, e.target.value);
                }}
              />
              <label>Correo</label>
            </div>
          </div>
          <div className="user-box password-box">
            <input
              className="input-singUp"
              type={see ? "password" : "text"}
              autoComplete="on"
              required
              onChange={(e) => {
                handleInputChange("password", e.target.value, setUser);
                verifyPassword(e.target.value);
              }}
            />
            <label>Contraseña</label>
            <button type="button" className="toggle-password">
              <EyeToggle theme={theme} changeSee={changeSee} see={see} />
            </button>
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
        {singUpError ||
          (error && <span className="error-form">{singUpError || error}</span>)}
        {(user.name === "" ||
          user.lastName === "" ||
          user.email === "" ||
          user.password === "") && (
          <p className="error-form">Un campo o varios campos estan vacios</p>
        )}
      </div>
    </>
  );
};

export default CreateAnAccount;
