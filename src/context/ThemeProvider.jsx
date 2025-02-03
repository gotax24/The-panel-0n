import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { ThemeContext } from "./ThemeContext";

const ThemeProvider = ({ children }) => {
  //Hacemos una consulta al sistema para saber que tema usa el usuario que nos devuelve un booleano
  const prefersDarkMode = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  //Creamos un estado para controlar el tema de la aplicacion donde vamos almacenarlo en el localstorage si no se usa el resultado de la constante arriba
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || (prefersDarkMode ? "dark" : "light")
  );

  //Usamos el useEffect para cada vez que se cambie el tema se renderize el componente
  useEffect(() => {
    //Cambiar el tema de la aplicacion y guardalo en el local storage
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);

    //Cambiar el logo de la ventana del navegador segun el tema
    const logo = document.querySelector("link[rel='icon']");
    if (logo)
      logo.href = theme === "dark" ? "/logo-dark.svg" : "/logo-light.svg";
  }, [theme]);

  //Creamos la funcion para cambiar el tema
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node,
};

export default ThemeProvider;
