export const handleInputChange = (fields, value, setState, setState2) => {
    if (fields === "email" && !value.includes("@")) return setState2("Ingresar un correo valido");

    setState((prevUser) => ({
      ...prevUser,
      [fields]: value,
    }));

    if (setState2) {
      setState2(null);
    }
  };