import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const DeleteData = (url) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const API = import.meta.env.VITE_API_URL;
  const navigation = useNavigate();

  const Delete = (id, setData,logOut) => {
    setLoading(true);

    axios
      .delete(`${API}${url}/${id}`)
      .then(() => {
        setData((prevUser) => prevUser.filter((user) => user.id !== id));
        setLoading(false);
        if (logOut) {
          localStorage.removeItem("IdUser");
          navigation("/login");
        }
      })
      .catch((e) => {
        console.error(e);
        setError("Ocurrio un error al eliminar el usuario");
        setLoading(false);
      });
  };

  return { loading, error, Delete };
};

export default DeleteData;
