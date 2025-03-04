import { useContext, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import PutData from "../hooks/PutData.js";
import { handleInputChange } from "../helpers/HandleInputChange";
import PropTypes from "prop-types";
import logoDark from "../assets/user-edit-dark.svg";
import logoLight from "../assets/user-edit-light.svg";

const EditUser = ({ user, id, closeModal, setData }) => {
  const { theme } = useContext(ThemeContext);
  const { loading, error, UpdateData } = PutData("users");

  const [dataEdit, setDataEdit] = useState({
    name: user[0].name,
    lastName: user[0].lastName,
    email: user[0].email,
    password: user[0].password,
  });
  const [emailError, setEmailError] = useState(null);

  const handleUpdate = (e) => {
    if (
      dataEdit.name === "" ||
      dataEdit.lastName === "" ||
      dataEdit.email === "" ||
      dataEdit.password === ""
    )
      return;

    e.preventDefault();
    UpdateData(dataEdit, id, setData);
    closeModal();
  };

  return (
    <>
      <div className="header-form">
        <img
          src={theme === "dark" ? logoLight : logoDark}
          alt="imagen de editar usuario"
        />
        <h1>Edicion de usuario</h1>
      </div>
      <div className="content-form">
        <form className="form">
          <label className="label-form">
            Nombre:
            <input
              type="text"
              className="input-form"
              required
              value={dataEdit.name}
              onChange={(e) => {
                handleInputChange("name", e.target.value, setDataEdit);
              }}
            />
          </label>
          <label className="label-form">
            Apellido:
            <input
              type="text"
              className="input-form"
              value={dataEdit.lastName}
              required
              onChange={(e) => {
                handleInputChange("lastName", e.target.value, setDataEdit);
              }}
            />
          </label>
          <label className="label-form">
            Email:
            <input
              type="Email"
              className="input-form"
              required
              value={dataEdit.email}
              onChange={(e) => {
                handleInputChange(
                  "email",
                  e.target.value,
                  setDataEdit,
                  setEmailError
                );
              }}
            />
          </label>
          <label className="label-form">
            Contraseña:
            <input
              type="password"
              className="input-form"
              required
              value={dataEdit.password}
              onChange={(e) => {
                handleInputChange("password", e.target.value, setDataEdit);
              }}
            />
          </label>
          <button className="button-form" onClick={handleUpdate}>
            {loading ? "Cambiando la informacion..." : "Confirmar cambio"}
          </button>
        </form>
        {(dataEdit.name === "" ||
          dataEdit.lastName === "" ||
          dataEdit.email === "" ||
          dataEdit.password === "") &&( <p>Hay uno o varios campos vacios</p>)}
        {emailError ||
          (error && <p className="error-form">{emailError || error}</p>)}
      </div>
    </>
  );
};

EditUser.propTypes = {
  user: PropTypes.array.isRequired,
  id: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
  setData: PropTypes.func.isRequired,
};

export default EditUser;
