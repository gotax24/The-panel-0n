import axios from "axios";
import { useContext, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import additionDark from "../assets/addition-dark.svg";
import additionLight from "../assets/addition-light.svg";
import Loading from "./Loading";
import { handleInputChange } from "../helpers/HandleInputChange";
import "../css/AddForm.css";
import PropTypes from "prop-types";

const AddForm = ({ title, setData, data, closeModal }) => {
  const { theme } = useContext(ThemeContext);
  const API = import.meta.env.VITE_API_URL;

  const [task, setTask] = useState({
    name: "",
    description: "",
    done: "",
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const update = (e) => {
    e.preventDefault();
    setLoading(true);

    if (task.name === "" || task.description === "" || task.done === "") {
      setError("Un campo o varios campos estan vacios");
      setLoading(false);
      return;
    }

    axios
      .post(API + "task", task)
      .then((response) => {
        const newTask = response.data;

        setData([...data, newTask]);
        setLoading(false);
        closeModal();
      })
      .catch((e) => {
        console.error(e);
        setError("Ocurrio un problema en agregar la tarea");
        setLoading(false);
      });
  };

  if (loading) return <Loading />;

  return (
    <>
      <div className="header-add-form">
        <img
          src={theme === "dark" ? additionDark : additionLight}
          alt="imagen de suma"
        />
        <h1>Agrega a {title}</h1>
      </div>
      <div className="content-fomr">
        <form className="form-add">
          <label className="label-form">
            Nombre:
            <input
              className="input-form"
              type="text"
              required
              onChange={(e) => {
                handleInputChange("name", e.target.value);
              }}
            />
          </label>
          <label className="label-form">
            Descripcion:
            <input
              className="description-add"
              required
              onChange={(e) => {
                handleInputChange("description", e.target.value, setTask);
              }}
            />
          </label>
          <div className="state-form">
            <p className="p-form">Estado de la tarea:</p>
            <label className="label-radio-form">
              <input
                className="radio-form"
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
                className="radio-form"
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
