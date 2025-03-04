export const handleInputChange = (fields, value, setState, setState2) => {
  const emailRegex =
    /^[a-zA-Z0-9._%+-]+@(gmail\.com|outlook\.com|hotmail\.com|yahoo\.com|icloud\.com|protonmail\.com)$/;

  if (fields === "email" && !emailRegex.test(value))
    return setState2( "El email esta incompleto, debe ser de un proveedor válido (Gmail, Outlook, Yahoo, etc.)");

  setState((prevUser) => ({
    ...prevUser,
    [fields]: value,
  }));

  if (setState2) {
    setState2(null);
  }
};
