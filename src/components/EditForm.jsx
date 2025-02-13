import { useContext, useState } from "react";
import { handleInputChange } from "../helpers/HandleInputChange";
import axios from "axios";
import PropTypes from "prop-types";
import { ThemeContext } from "../context/ThemeContext";

const EditForm = ({ title, setData, closeModal }) => {
  const { theme } = useContext(ThemeContext);
  const [task, setTask] = useState({
    id: "",
    name: "",
    description: "",
    done: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const API = import.meta.env.VITE_API_URL;

  const bringInformation = (id) => {
    setLoading(true);
    axios
      .get(`${API}task/${id}`)
      .then((response) => {
        const info = response.data;
        console.log(info);
        setTask(info);
        setLoading(false);
      })
      .catch((e) => {
        console.error(e);
        setError("Ocurrió un error al traer la información");
        setLoading(false);
      });
  };

  const confirmEdition = (e) => {
    e.preventDefault();
    setLoading(true);

    if (!task.id || !task.name || !task.description || task.done === "") {
      setError("Un campo o varios campos están vacíos");
      setLoading(false);
      return;
    }

    axios
      .put(`${API}task/${task.id}`, task)
      .then((response) => {
        const editTask = response.data;
        setData((prevData) =>
          prevData.map((data) => (data.id === editTask.id ? editTask : data))
        );

        setLoading(false);
        closeModal();
      })
      .catch((e) => {
        console.error(e);
        setError("Ocurrió un problema");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <div className="header-form">
        <img src="" alt="símbolo de editar" />
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
                bringInformation(e.target.value);
                handleInputChange("id", e.target.value, setTask);
              }}
            />
          </label>
          <label>
            Nombre:
            <input
              type="text"
              className="input-form"
              required
              value={task.name}
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
              value={task.description}
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
                checked={task.done === true}
                onChange={() => handleInputChange("done", true, setTask)}
                className="input-radio-form"
                required
              />
              Hecho
            </label>
            <label className="label-radio-form">
              <input
                type="radio"
                checked={task.done === false}
                onChange={() => handleInputChange("done", false, setTask)}
                className="input-radio-form"
              />
              Pendiente
            </label>
          </div>
          <button className="button-form" onClick={confirmEdition}>
            {loading ? "Cambiando" : "Confirmar Cambio"}
          </button>
        </form>
        {error && <p className="error-form">{error}</p>}
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
