import axios from "axios";
import { useEffect, useState } from "react";

const GetData = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (!url) return;
    setLoading(true);
    axios
      .get(`${API}${url}`)
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((e) => {
        console.error(e);
        setLoading(false);
        setError("Ocurrio un error");
      });
  }, [API, url]);

  return {data, setData, loading, error};
};

export default GetData;
