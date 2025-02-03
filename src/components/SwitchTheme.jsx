import PropTypes from "prop-types";
import moonSun from "../assets/moonSun.svg";
import "../css/SwitchTheme.css";

const SwitchTheme = ({ toggleTheme }) => {
  return (
    <label className="theme-switch">
      <input
        type="checkbox"
        className="theme-switch__checkbox"
        onClick={toggleTheme}
      />
      <div className="theme-switch__container">
        <div className="theme-switch__clouds" />
        <div className="theme-switch__stars-container">
          <img src={moonSun} alt="Imagen del sol y de la luna" />
        </div>
        <div className="theme-switch__circle-container">
          <div className="theme-switch__sun-moon-container">
            <div className="theme-switch__moon">
              <div className="theme-switch__spot" />
              <div className="theme-switch__spot" />
              <div className="theme-switch__spot" />
            </div>
          </div>
        </div>
      </div>
    </label>
  );
};

SwitchTheme.propTypes = {
  toggleTheme: PropTypes.func,
};

export default SwitchTheme;
