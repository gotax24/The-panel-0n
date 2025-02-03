import { NavLink } from "react-router-dom";
import "../css/Menu.css";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import Switch from "./SwitchTheme";

const Menu = () => {
  const logOut = () => {
    navigation("/login");
  };

  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <>
      <header className="header-menu">
        <div className="container-logo">
          <img
            className="logo-menu"
            src={theme === "dark" ? "/logo-light.svg" : "/logo-dark.svg"}
            alt="Logo de la pagina"
          />
          <h1 className="tittle-menu">The panel-0n</h1>
        </div>
        <div className="container-nav">
          <nav className="nav-menu">
            <ul className="list-nav">
              <li className="list-nav-link">
                <NavLink to="/">Inicio</NavLink>
              </li>

              <li className="list-nav-link">
                <NavLink to="/list">Lista de tarea</NavLink>
              </li>

              <li className="list-nav-link">
                <NavLink to="/statistics">Estadisticas</NavLink>
              </li>

              <li className="list-nav-link">
                <NavLink to="/user">Usuario</NavLink>
              </li>

              <li className="list-nav-link">
                <a href="#" onClick={logOut}>
                  Cerrar sesion
                </a>
              </li>

              <Switch theme={theme} toggleTheme={toggleTheme}/>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Menu;
