import { useState } from "react";

const useToggleSee = () => {
  const [see, setSee] = useState(true);
  const changeSee = () => setSee((prevState) => !prevState);

  return { see, changeSee };
};

export default useToggleSee;
