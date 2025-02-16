import axios from "axios";
import { useState } from "react";

const PutData = (url, setData) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const API = import.meta.env.VITE_API_URL;

  const UpdateData = (dataEdit, id) => {
    setLoading(true);
    setError(null);
    axios
      .put(`${API}${url}/${id}`, dataEdit)
      .then((response) => {
        const updateData = response.data;

        setData((prevData) =>
          prevData
            ? prevData.map((info) =>
                info.id === updateData.id ? updateData : info
              )
            : [updateData]
        );
        setLoading(false);
        return updateData;
      })
      .catch((e) => {
        console.error(e);
        setError("Ocurrio un problema al actualizar el servidor");
        setLoading(false);
      });
  };
  return {loading, error, UpdateData};
};

export default PutData;
