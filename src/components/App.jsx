import { Outlet, useNavigate } from "react-router-dom";
import Menu from "./Menu";
import Credits from "./credits";

function App() {
  const navigation = useNavigate();

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
