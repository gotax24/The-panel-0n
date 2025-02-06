export const handleInputChange = (fields, value, setState, setState2) => {
    if (fields === "email" && !value.includes("@")) return setState2("Ingresar un correo valido");

    setState((prevUser) => ({
      ...prevUser,
      [fields]: value,
    }));

    return setState2(null)
  };