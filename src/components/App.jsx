import { Outlet } from "react-router-dom";
import Menu from "./Menu";
import Credits from "./credits";

function App() {
  return (
    <>
      <Menu />
      <Outlet />
      <Credits />
    </>
  );
}

export default App;
