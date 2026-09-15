import type { Metadata } from "next";
import WorkoutAppIndex from "./preview/page";

export const metadata: Metadata = {
  title: "Workout App Index | Find the Right Fitness App",
  description:
    "Independent fitness-app guidance designed to help you find the app that fits how you actually train.",
};

export default function Home() {
  return <WorkoutAppIndex />;
}
