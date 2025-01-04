import React from "react";
import { HealthMetricCard } from "./components/HealthMetricCard";
import { WeeklyCalendar } from "./components/WeeklyCalendar";
import styles from "./HealthDashboard.module.css";

export const HealthDashboard = () => {
  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/8a69d131693c4d41bb68f3dd6ba48cfa/c336e425f3bb430ee8be0c53b7f8eb8014dea524b195c74f8fe21daaadbb2c4a?apiKey=8a69d131693c4d41bb68f3dd6ba48cfa&"
          alt=""
          className={styles.menuIcon}
        />
        <h1 className={styles.title}>Health Data</h1>
        <span className={styles.todayLabel}>Today</span>
      </header>

      <WeeklyCalendar />

      <div className={styles.divider} />

      <div className={styles.metricsGrid}>
        <div className={styles.metricsColumn}>
          <HealthMetricCard
            title="Food"
            value="2,000"
            subtitle="Calories"
            backgroundColor="#FF6C87"
            iconBackgroundColor="#E73D5C"
          >
            <div className={styles.caloriesBars}>
              {[...Array(4)].map((_, i) => (
                <div key={i} className={styles.calorieBar} />
              ))}
            </div>
          </HealthMetricCard>

          <HealthMetricCard
            title="Diet"
            value="10"
            subtitle="Diet Misses"
            backgroundColor="#05D0A0"
            iconBackgroundColor="#00AC83"
          />
        </div>

        <div className={styles.metricsColumn}>
          <HealthMetricCard
            title="Activity"
            value="30"
            subtitle="Minutes"
            backgroundColor="#5C6DFF"
            iconBackgroundColor="#2536D0"
          >
            <img
              src="https://cdn.builder.io/api/v1/image/assets/8a69d131693c4d41bb68f3dd6ba48cfa/7b1066904512cf9a0cab51606ee35511a5230fdd2acd82b3408849bfbbef6b15?apiKey=8a69d131693c4d41bb68f3dd6ba48cfa&"
              alt="Activity chart"
              className={styles.activityChart}
            />
          </HealthMetricCard>

          <HealthMetricCard
            title="Weight"
            value="190"
            subtitle="Pounds"
            backgroundColor="#FFB36D"
            iconBackgroundColor="#E28D3D"
          >
            <div className={styles.weightChart}>
              <img
                src="https://cdn.builder.io/api/v1/image/assets/8a69d131693c4d41bb68f3dd6ba48cfa/37ac9c87f74a4d7ebbe96c33afaa79674e49a00a97c6bd315e7af4ad41fb4aac?apiKey=8a69d131693c4d41bb68f3dd6ba48cfa&"
                alt="Weight trend"
                className={styles.weightTrend}
              />
            </div>
          </HealthMetricCard>
        </div>
      </div>

      <nav className={styles.navigation}>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/8a69d131693c4d41bb68f3dd6ba48cfa/34b54f5c19777bf0df34a310fcca9e6b45c73fda6cdd7058f21e32e19071ef8a?apiKey=8a69d131693c4d41bb68f3dd6ba48cfa&"
          alt=""
          className={styles.navIcon}
        />
        <img
          src="https://cdn.builder.io/api/v1/image/assets/8a69d131693c4d41bb68f3dd6ba48cfa/19d07309c329e70e76ef5d94c15a45175871bdf9dda7e78968032734c46bb00f?apiKey=8a69d131693c4d41bb68f3dd6ba48cfa&"
          alt=""
          className={styles.navIcon}
        />
        <div className={styles.navButton} />
        <img
          src="https://cdn.builder.io/api/v1/image/assets/8a69d131693c4d41bb68f3dd6ba48cfa/07b6ea1102b1189db9bf4ea64792f100e6ae6c3034cdab66080696728c3ec5d4?apiKey=8a69d131693c4d41bb68f3dd6ba48cfa&"
          alt=""
          className={styles.navIcon}
        />
        <img
          src="https://cdn.builder.io/api/v1/image/assets/8a69d131693c4d41bb68f3dd6ba48cfa/c83ba884cadfa72f034b07d77e43df27012b89a54e7dfd1162a4f6738859a322?apiKey=8a69d131693c4d41bb68f3dd6ba48cfa&"
          alt=""
          className={styles.navIcon}
        />
      </nav>
    </div>
  );
};
