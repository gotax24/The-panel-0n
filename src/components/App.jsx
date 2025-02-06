import { Outlet } from "react-router-dom";
import Menu from "./Menu";
import Credits from "./credits";

function App() {

  if(!localStorage.getItem("tokenUser")) return navigation("/login")

  return (
    <>
      <Menu />
      <Outlet />
      <Credits />
    </>
  );
}

export default App;
