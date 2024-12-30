"use client";
import { Header } from "./components/header";
import { ThemeProvider } from "./context/ThemeContext";
import CustomMouse from "./components/custom-cursor";

export default function Home() {
  return (
    <ThemeProvider>
      <div className="md:px-32">
        <CustomMouse />

        <Header />
      </div>
    </ThemeProvider>
  );
}
