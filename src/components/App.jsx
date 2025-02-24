import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Menu from "./Menu";
import Credits from "./Credits";

function App() {
  const navigation = useNavigate();
  const userToken = localStorage.getItem("IdUser");

  useEffect(() => {
    if (!userToken) {
      navigation("/login");
    }
  }, [userToken, navigation]);

  return (
    <>
      <Menu />
      <Outlet />
      <Credits />
    </>
  );
}

export default App;
