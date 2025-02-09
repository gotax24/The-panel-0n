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
          <div className="card-task">
            <h3>Tareas</h3>
          </div>
        </Link>
      </div>
    </>
  );
};

export default Home;
