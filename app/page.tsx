import type { Metadata } from "next";
import styles from "./coming-soon.module.css";

export const metadata: Metadata = {
  title: "Workout App Index | Coming Soon",
  description:
    "Independent fitness-app guidance designed to help you find the app that fits how you actually train.",
};

export default function ComingSoon() {
  return (
    <main className={styles.page}>
      <div className={styles.atmosphere} aria-hidden="true" />
      <section className={styles.content} aria-labelledby="coming-soon-title">
        <div className={styles.rule} aria-hidden="true" />
        <p className={styles.status}>Coming soon</p>
        <h1 id="coming-soon-title">
          The definitive guide to fitness apps.
          <span>Your best fit, found.</span>
        </h1>
        <p className={styles.intro}>
          Independent, exacting guidance for choosing the app that fits how you
          actually train.
        </p>
      </section>
      <footer className={styles.footer}>
        <p>© {new Date().getFullYear()} Turf King LLC</p>
      </footer>
    </main>
  );
}
