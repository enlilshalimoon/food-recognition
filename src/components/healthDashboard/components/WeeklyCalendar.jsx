import React from "react";
import styles from "./WeeklyCalendar.module.css";

export const WeeklyCalendar = () => {
  const days = ["SUN", "MON", "TUES", "WED", "THURS", "FRI", "SAT"];
  const dates = [8, 9, 10, 11, 12, 13, 14];

  return (
    <>
      <div className={styles.weekDays}>{days.join(" ")}</div>
      <div className={styles.dates}>{dates.join(" ")}</div>
    </>
  );
};
