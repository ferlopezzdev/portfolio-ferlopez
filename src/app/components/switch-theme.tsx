"use client";
import { Moon, Sun, ChartNoAxesColumn } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { Button } from "@/components/ui/button";

export const SwitchTheme = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex gap-2">
      <div
        className="flex justify-center items-center w-10 h-auto bg-black/10 dark:bg-white/10 p-2 rounded-full mouse-hover"
        onClick={toggleTheme}
      >
        {theme == "light" ? (
          <Moon stroke="black" fill="black" className="opacity-60" size={16} />
        ) : (
          <Sun stroke="white" fill="white" className="opacity-80" size={16} />
        )}
      </div>

      <div className="flex justify-center items-center w-10 h-auto bg-black/10 dark:bg-white/10 p-2 rounded-full mouse-hover">
        <ChartNoAxesColumn
          stroke={theme == "dark" ? "white" : "black"}
          fill="white"
          className="opacity-80"
          size={16}
        />
      </div>
    </div>
  );
};
