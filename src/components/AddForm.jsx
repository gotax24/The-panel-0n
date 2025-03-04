import { useContext, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import addDark from "../assets/add-dark.svg";
import addLight from "../assets/add-light.svg";
import { handleInputChange } from "../helpers/HandleInputChange";
import "../css/AddForm.css";
import PropTypes from "prop-types";
import PostData from "../hooks/PostData.js";

const AddForm = ({ title, setData, closeModal }) => {
  const { theme } = useContext(ThemeContext);
  const [task, setTask] = useState({
    name: "",
    description: "",
    done: "",
  });
  const { loading, error, post } = PostData("task");

  const update = (e) => {
    if (task.name === "" || task.description === "" || task.done === "") return;

    e.preventDefault();
    post(task, setData, false);
    closeModal();
  };

  return (
    <>
      <div className="header-form">
        <img src={theme === "dark" ? addLight : addDark} alt="imagen de suma" />
        <h1>Agrega a {title}</h1>
      </div>
      <div className="content-form">
        <form className="form">
          <label className="label-form">
            Nombre:
            <input
              className="input-form"
              type="text"
              required
              onChange={(e) => {
                handleInputChange("name", e.target.value, setTask);
              }}
            />
          </label>
          <label className="label-form">
            Descripcion:
            <textarea
              className="input-form description"
              required
              onChange={(e) => {
                handleInputChange("description", e.target.value, setTask);
              }}
            />
          </label>
          <div className="content-state">
            <p className="p-form">Estado de la tarea:</p>
            <label className="label-radio-form">
              <input
                className="input-radio-form"
                type="radio"
                name="task-status"
                required
                onClick={() => {
                  handleInputChange("done", true, setTask);
                }}
              />
              Hecha
            </label>
            <label className="label-radio-form">
              <input
                className="input-radio-form"
                type="radio"
                name="task-status"
                onClick={() => {
                  handleInputChange("done", false, setTask);
                }}
              />
              Pendiente
            </label>
          </div>
          <button onClick={update} className="button-form">
            {loading ? "Agregando..." : "Agregar"}
          </button>
        </form>
        {error && <p className="error-form">{error}</p>}
        {(task.name === "" || task.description === "" || task.done === "") && (
          <p className="error-form">Hay unos o un campo vacio</p>
        )}
      </div>
    </>
  );
};

AddForm.propTypes = {
  title: PropTypes.string,
  setData: PropTypes.func,
  data: PropTypes.array,
  closeModal: PropTypes.func,
};

export default AddForm;
