import { Link } from "react-router-dom";
import TaskChart from "./components/TaskChart";
import GetData from "./hooks/GetData";
import "./Home.css"

const Home = () => {
  const { data } = GetData("task");
  const { data: dataUser } = GetData("users")

  const idUser = localStorage.getItem("IdUser");
  const user = dataUser.filter((search) => search.id === idUser);
  
  const name = user[0]

  return (
    <>
      <div className="header-home">
        <h1>Gestor de tareas</h1>
      </div>

      <div className="welcome-message">
        <h2>
          ¡Bienvenido/a {user.length > 0 && name.name} al Gestor de Tareas!
        </h2>
        <p>Organiza tu trabajo y sé más productivo/a 🚀</p>
      </div>

      <div className="layout-home">
        <Link to="/tasks">
          <div className="card-home">
            <h3 className="title-card">Tareas</h3>
            <p>Total de tareas: {data.length}</p>
            <TaskChart data={data} />
          </div>
        </Link>
        <Link to="/users">
          <div className="card-home">
            <h3 className="title-card">Usuarios</h3>
          </div>
        </Link>
      </div>
    </>
  );
};

export default Home;
