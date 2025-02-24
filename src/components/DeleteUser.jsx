import { useContext } from "react";
import DeleteData from "../hooks/DeleteData.js";
import { ThemeContext } from "../context/ThemeContext";
import PropTypes from "prop-types";
import logoDark from "../assets/user-delete-dark.svg";
import logoLight from "../assets/user-delete-light.svg";

const DeleteUser = ({ id, setData, closeModal }) => {
  const { theme } = useContext(ThemeContext);
  const { loading, error, Delete } = DeleteData("users");

  const handleDelete = (e) => {
    e.preventDefault();
    Delete(id, setData, true);
    closeModal();
  };

  return (
    <>
      <div className="header-form">
        <img
          src={theme === "dark" ? logoLight : logoDark}
          alt="imagen de eliminar usuario"
        />
        <h1>Eliminar usaurio</h1>
      </div>
      <div>
        <h2>Desea eliminar el usuario? </h2>
        <button className="button-form" onClick={handleDelete}>
          {loading ? "Borrando..." : "Confirmar eliminacion"}
        </button>
        {error && <p>{error}</p>}
      </div>
    </>
  );
};

DeleteUser.propTypes = {
  id: PropTypes.string.isRequired,
  setData: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default DeleteUser;
