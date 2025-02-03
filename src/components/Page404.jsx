import { Link } from "react-router-dom";
import desert from "../assets/desert.svg";
import "../css/Page404.css"

const page404 = () => {
  return (
    <>
      <div className="container-404">
        <img
          src={desert}
          alt="imagen de desierto Desierto"
          className="img-404"
        />
        <h1 className="title-404">Creo que te perdiste aqui no hay nada</h1>
        <h2 className="sub-title-404">
          No te preocupes, ya lo vamos a solucionar
        </h2>
        <Link className="link-404" to="/">
          Regresar al inicio
        </Link>
      </div>
    </>
  );
};

export default page404;
