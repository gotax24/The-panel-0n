import { NavLink } from "react-router-dom";

const Menu = () => {
  const logOut = () => {
    navigation("/login");
  };
  return (
    <>
      <header className="header-menu">
        <div className="container-logo">
          <img className="logo-menu" src="./logo.svg" alt="Logo de la pagina" />
          <h1 className="tittle-menu">Dashboard - Ernesto Bracho</h1>
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
                <NavLink to="/calendar">Calendario</NavLink>
              </li>
              <li className="list-nav-link">
                <a href="#" onClick={logOut}>
                  Cerrar sesion
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Menu;
