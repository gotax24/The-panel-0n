import { useContext, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import DeleteData from "../hooks/DeleteData"
import PropTypes from "prop-types";
import deleteDark from "../assets/delete-dark.svg";
import deleteLight from "../assets/delete-light.svg";

const DeleteForm = ({ title, setData, closeModal }) => {
  const { theme } = useContext(ThemeContext);
  const [taskId, setTaskId] = useState("");
  const {loading, error, Delete} = DeleteData("task")

  const DeleteTask = (e) => {
    e.preventDefault();
    Delete(taskId, setData,false)
    closeModal();
  };

  return (
    <>
      <div className="header-form">
        <img
          src={theme === "dark" ? deleteLight : deleteDark}
          alt="Imagen de eliminar"
        />
        <h1>Eliminar {title}</h1>
      </div>
      <div>
        <label className="label-form">
          N° de la tarea:
          <input
            type="number"
            required
            className="input-form"
            onChange={(e) => {
              setTaskId(e.target.value);
            }}
          />
        </label>
        <button className="button-form delete-button" onClick={DeleteTask}>
          {loading ? "Eliminando..." : "Confirmar eliminacion"}
        </button>
        {error && <p className="error-form">{error}</p>}
      </div>
    </>
  );
};

DeleteForm.propTypes = {
  title: PropTypes.string,
  setData: PropTypes.func,
  closeModal: PropTypes.func,
};

export default DeleteForm;
