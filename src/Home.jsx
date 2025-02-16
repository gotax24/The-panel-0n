import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="header-home">
        <h1>Dasboard</h1>
        <h2></h2>
      </div>
      <div className="layout-home">
        <Link to="/tasks">
          <div className="card">
            <h3>Tareas</h3>
          </div>
        </Link>
        <Link to="/users">
          <div className="card">
            <p>Usuarios</p>
          </div>
        </Link>
      </div>
    </>
  );
};

export default Home;
