import { Eye, EyeOff } from "lucide-react";

import PropTypes from "prop-types";

const EyeToggle = ({ theme, changeSee, see }) => {


  return see ? (
    <Eye
      className="eye"
      onClick={changeSee}
      color={theme === "light" ? "#2e073f" : "#f5efff"}
    />
  ) : (
    <EyeOff
      className="eye"
      onClick={changeSee}
      color={theme === "light" ? "#2e073f" : "#f5efff"}
    />
  );
};

EyeToggle.propTypes = {
  theme: PropTypes.string.isRequired,
  changeSee: PropTypes.func.isRequired,
  see: PropTypes.bool.isRequired
};

export default EyeToggle;
