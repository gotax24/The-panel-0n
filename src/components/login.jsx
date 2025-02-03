import { useContext, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";

const Login = () => {
  const theme = useContext(ThemeContext);
  const [user, SetUser] = useState({
    email: "",
    password: "",
  });

  return (
    <>
      <div className="container-welcome">
        <img
        className="logo-login"
          src={theme === "dark" ? "./logo-dark.svg" : "./logo-light.svg"}
          alt="Logo de la pagina"
        />
        <h1 className="title-login">Bienvenido a The panel-0n</h1>
      </div>
   <div className="container-form">

   </div>
    </>
  );
};

export default Login;
