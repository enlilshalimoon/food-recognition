import React from "react";
import ReactDOM from "react-dom";
import { HealthDashboard } from "./components/healthDashboard/HealthDashboard.jsx";

const App = () => {
  return (
    <div>
      <h1>Health Dashboard</h1>
      <HealthDashboard />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
