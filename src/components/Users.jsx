import { useContext, useState } from "react";
import GetData from "../hooks/GetData.js";
import Loading from "./Loading";
import Modal from "./Modal";
import EditUser from "./EditUser";
import DeleteUser from "./DeleteUser";
import { Mail, KeyRound, UserRound } from "lucide-react";
import { ThemeContext } from "../context/ThemeContext";
import { writte } from "../helpers/Writer.js";
import "../css/Users.css";
import useToggleSee from "../hooks/useToggleSee.js";
import EyeToggle from "./EyeToggle.jsx";

const Users = () => {
  const { data, loading, error, setData } = GetData("users");
  const { theme } = useContext(ThemeContext);

  const [isEditInfoOpen, setIsEditInfoOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const { see, changeSee } = useToggleSee();

  const openEditInfo = () => setIsEditInfoOpen(true);
  const openDelete = () => setIsDeleteOpen(true);

  const closeEditInfoModal = () => setIsEditInfoOpen(false);
  const closeDeleteModal = () => setIsDeleteOpen(false);

  if (loading) return <Loading />;

  const idUser = localStorage.getItem("IdUser");
  const user = data.filter((search) => search.id === idUser);

  return (
    <>
      <div className="header">
        <h1 className="title">Administrador de usuario</h1>
      </div>

      {user.length > 0 && (
        <>
          <div className="container-main">
            <div className="container-header">
              <img
                src={user[0].picture}
                alt="Foto de perfil del usuario"
                className="profile-picture"
              />
              <h2 className="welcome-text">
                Bienvenido/a {user[0].name} {user[0].lastName}
              </h2>
            </div>

            <div className="button-container">
              <button className="button-task" onClick={openEditInfo}>
                Editar usuario
              </button>
              <button className="button-task" onClick={openDelete}>
                Eliminar la cuenta
              </button>
            </div>

            <div className="container-info">
              <p className="p-info">
                <span className="icon">
                  <UserRound
                    color={theme === "light" ? "#2e073f" : "#f5efff"}
                  />
                </span>
                <span>Nombre: {user[0].name}</span>
              </p>
              <p className="p-info">
                <span className="icon">
                  <UserRound
                    color={theme === "light" ? "#2e073f" : "#f5efff"}
                  />
                </span>
                <span>Apellido: {user[0].lastName}</span>
              </p>
              <p className="p-info">
                <span className="icon">
                  <Mail color={theme === "light" ? "#2e073f" : "#f5efff"} />
                </span>
                <span>Email: {user[0].email}</span>
              </p>

              <p className="p-info">
                <span className="icon">
                  <KeyRound color={theme === "light" ? "#2e073f" : "#f5efff"} />
                </span>
                <span>
                  Contraseña:{" "}
                  {see ? user[0].password : writte(user[0].password.length)}
                </span>
                <span>
                  <EyeToggle theme={theme} see={see} changeSee={changeSee} />
                </span>
              </p>
            </div>
          </div>
        </>
      )}

      <Modal isOpen={isEditInfoOpen} closeModal={closeEditInfoModal}>
        <EditUser
          user={user}
          closeModal={closeEditInfoModal}
          id={idUser}
          setData={setData}
        />
      </Modal>
      <Modal isOpen={isDeleteOpen} closeModal={closeDeleteModal}>
        <DeleteUser
          id={idUser}
          closeModal={closeDeleteModal}
          setData={setData}
        />
      </Modal>

      {error && <p className="error">{error}</p>}
    </>
  );
};

export default Users;
