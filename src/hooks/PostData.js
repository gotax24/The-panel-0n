import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PostData = (url) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const API = import.meta.env.VITE_API_URL;
  const navigation = useNavigate();

  const post = (newData, setData, signUp) => {
    setLoading(true);

    axios
      .post(`${API}${url}`, newData)
      .then((response) => {
        const data = response.data;

        setData((prevData) => [...prevData, data]);
        setError(null);
        setLoading(false);

        if (signUp) {
          navigation("/");
          localStorage.setItem("IdUser", data.id);
        }
      })
      .catch((e) => {
        console.error(e);
        setError("Ocurrio un error en la peticion del servidor");
        setLoading(false);
      });
  };

  return { loading, error, post };
};

export default PostData;
