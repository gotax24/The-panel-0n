import { useState } from "react";
import GetData from "../hooks/GetData";
import Loading from "./Loading";
import Modal from "./Modal";
import EditUser from "./EditUser";
import DeleteUser from "./DeleteUser";

const Users = () => {
  const { data, loading, error, setData } = GetData("users");

  const [isEditInfoOpen, setIsEditInfoOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

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

      {user.length > 0 ? (
        <div className="container-info">
          <h2 className="welcome">
            Bienvenido/a {user[0].name} {user[0].lastName}
          </h2>
          <h3>Que quieres hacer?</h3>
        </div>
      ) : (
        <p>{error + " al buscar al usuario"}</p>
      )}

      <div className="button-container">
        <button className="button-task" onClick={openEditInfo}>
          Editar usuario
        </button>
        <button className="button-task" onClick={openDelete}>
          Eliminar la cuenta
        </button>
      </div>

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
