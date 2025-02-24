import { useContext, useEffect, useState } from "react";
import { handleInputChange } from "../helpers/HandleInputChange";
import PropTypes from "prop-types";
import { ThemeContext } from "../context/ThemeContext";
import editDark from "../assets/edit-dark.svg";
import ediLight from "../assets/edit-light.svg";
import PutData from "../hooks/PutData.js";
import GetData from "../hooks/GetData.js";

const EditForm = ({ title, setData, closeModal }) => {
  const { theme } = useContext(ThemeContext);
  const [task, setTask] = useState({
    name: "",
    description: "",
    done: "",
  });
  const [id, setId] = useState("");
  const { loading, error, UpdateData } = PutData("task");

  const {
    data,
    loading: loadingTask,
    error: errorTask,
  } = GetData(`task/${id}`);

  useEffect(() => {
    if (data) {
      setTask({
        id: data.id,
        name: data.name,
        description: data.description,
        done: data.done,
      });
    }
  }, [data]);

  const confirmEdition = (e) => {
    e.preventDefault();
    UpdateData(task, task.id, setData);
    closeModal();
  };

  return (
    <>
      <div className="header-form">
        <img
          src={theme === "dark" ? ediLight : editDark}
          alt="símbolo de editar"
        />
        <h1>Editar {title}</h1>
      </div>
      <div className="content-form">
        <form className="form">
          <label className="label-form">
            {" "}
            N° de la tarea:
            <input
              type="number"
              required
              className="input-form"
              onChange={(e) => {
                setId(e.target.value);
              }}
            />
          </label>
          <label>
            Nombre:
            <input
              type="text"
              className="input-form"
              required
              value={task?.name ?? ""}
              onChange={(e) =>
                handleInputChange("name", e.target.value, setTask)
              }
            />
          </label>
          <label>
            Descripción:
            <textarea
              type="text"
              className="input-form description"
              required
              value={task?.description ?? ""}
              onChange={(e) =>
                handleInputChange("description", e.target.value, setTask)
              }
            />
          </label>
          <div className="content-state">
            <p className="p-form">Estado de la tarea</p>
            <label className="label-radio-form">
              <input
                type="radio"
                checked={task && task.done === true}
                onChange={() => handleInputChange("done", true, setTask)}
                className="input-radio-form"
                required
              />
              Hecho
            </label>
            <label className="label-radio-form">
              <input
                type="radio"
                checked={task && task.done === false}
                onChange={() => handleInputChange("done", false, setTask)}
                className="input-radio-form"
              />
              Pendiente
            </label>
          </div>
          <button className="button-form" onClick={confirmEdition}>
            {loadingTask || loading ? "Cambiando" : "Confirmar Cambio"}
          </button>
        </form>
        {errorTask ||
          (error && <p className="error-form">{errorTask || error} </p>)}
      </div>
    </>
  );
};

EditForm.propTypes = {
  title: PropTypes.string,
  setData: PropTypes.func,
  closeModal: PropTypes.func,
};

export default EditForm;
