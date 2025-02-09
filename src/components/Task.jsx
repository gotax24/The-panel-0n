import { useState, useEffect } from "react";
import axios from "axios";
import Loading from "./Loading";
import IsDone from "../helpers/IsDone";

const Task = () => {
  const API = import.meta.env.VITE_API_URL;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
  
  if (loading) return <Loading />;
  if (error) return <p>{error}</p>

  return (
    <>
      <div className="header">
        <h1 className="title-task">Administrador de tareas</h1>
      </div>
      <button className="button-task">Crear tarea</button>
      <button className="button-task">Editar tarea</button>
      <button className="button-task">Eliminar tarea</button>

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
