import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import PropTypes from "prop-types";
import { IsDoneCounter, IsPendingCounter } from "../helpers/Counter.js";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext.jsx";

ChartJS.register(ArcElement, Tooltip, Legend);

const TaskChart = ({ data }) => {
  const done = IsDoneCounter(data).length;
  const pending = IsPendingCounter(data).length;

  const { theme } = useContext(ThemeContext);

  const backgroundColor1 = theme === "dark" ? "#ebd3f8" : "#2e073f";
  const backgroundColor2 = theme === "dark" ? "#ad49e1" : "#ad49e1";

  const donutData = {
    labels: ["Hechas", "Pendientes"],
    datasets: [
      {
        label: "Tareas",
        data: [done, pending],
        backgroundColor: [backgroundColor1, backgroundColor2],
        hoverOffset: 12,
      },
    ],
  };

  return (
    <div style={{ width: "300px", height: "300px", labels: "var(--tex-color)" }}>
      <Doughnut data={donutData} />
    </div>
  );
};

TaskChart.propTypes = {
  data: PropTypes.array.isRequired,
};

export default TaskChart;
