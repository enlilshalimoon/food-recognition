import React from "react";
import styles from "./HealthMetricCard.module.css";

export const HealthMetricCard = ({
  title,
  value,
  subtitle,
  icon,
  backgroundColor,
  iconBackgroundColor,
  children,
}) => {
  return (
    <div className={styles.metricCard} style={{ backgroundColor }}>
      <div className={styles.cardHeader}>
        <span className={styles.cardTitle}>{title}</span>
        <div
          className={styles.iconWrapper}
          style={{ backgroundColor: iconBackgroundColor }}
        >
          {icon}
        </div>
      </div>
      <div className={styles.metricValue}>{value}</div>
      {subtitle && <div className={styles.metricSubtitle}>{subtitle}</div>}
      {children}
    </div>
  );
};
