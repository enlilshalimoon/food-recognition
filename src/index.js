import React from "react";
import ReactDOM from "react-dom";
import HealthDashboard from "./components/HealthDashboard";

const App = () => {
  return (
    <div>
      <h1>Health Dashboard</h1>
      <HealthDashboard />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
