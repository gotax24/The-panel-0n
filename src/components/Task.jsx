import { useState, useEffect } from "react";
import axios from "axios";
import Loading from "./Loading";
import IsDone from "../helpers/IsDone";
import Modal from "./Modal";
import AddForm from "./AddForm";
import EditForm from "./EditForm";
import DeleteForm from "./DeleteForm";

const Task = () => {
  const API = import.meta.env.VITE_API_URL;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const openAddModal = () => setIsAddOpen(true);
  const closeAddModal = () => setIsAddOpen(false);

  const openEditModal = () => setIsEditOpen(true);
  const closeEditModal = () => setIsEditOpen(false);

  const openDeleteModal = () => setIsDeleteOpen(true);
  const closeDeleteModal = () => setIsDeleteOpen(false);

  useEffect(() => {
    setLoading(true);

    axios
      .get(API + "task")
      .then((response) => {
        const tasks = response.data;
        setData(tasks);
        setLoading(false);
        setError(null);
      })
      .catch((e) => {
        console.error(e);
        setError("Ocurrio un error");
        setLoading(false);
      });
  }, [API]);

  console.log(data);

  if (loading) return <Loading />;
  if (error) return <p>{error}</p>;

  return (
    <>
      <div className="header">
        <h1 className="title-task">Administrador de tareas</h1>
      </div>
      <button className="button-task" onClick={openAddModal}>
        Crear tarea
      </button>
      <button className="button-task" onClick={openEditModal}>
        Editar tarea
      </button>
      <button className="button-task" onClick={openDeleteModal}>
        Eliminar tarea
      </button>

      <Modal isOpen={isAddOpen} closeModal={closeAddModal}>
        <AddForm
          title="Tareas"
          setData={setData}
          data={data}
          closeModal={closeAddModal}
        />
      </Modal>

      <Modal isOpen={isEditOpen} closeModal={closeEditModal}>
        <EditForm
          title={"Tareas"}
          setData={setData}
          closeModal={closeEditModal}
        />
      </Modal>

      <Modal isOpen={isDeleteOpen} closeModal={closeDeleteModal}>
        <DeleteForm
          title={"Tareas"}
          setData={setData}
          closeModal={closeDeleteModal}
        />
      </Modal>

      <ol>
        {data &&
          data.map((task) => {
            return (
              <li key={task.id}>
                Nombre: {task.name}
                <br /> Descripcion: {task.description}
                <br /> Hecho: {IsDone(task.done)}
              </li>
            );
          })}
      </ol>
    </>
  );
};

export default Task;
