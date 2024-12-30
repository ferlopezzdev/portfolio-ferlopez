import { SwitchTheme } from "./switch-theme";
import { ChartBar } from "lucide-react";

import Link from "next/link";

export const Header = () => {
  return (
    <header className="flex justify-between md:p-6 p-4">
      <Link
        href="/"
        className="font-semibold font-afacadFlux text-4xl text-label"
      >
        (<span className="mouse-hover"> FLT </span>)
      </Link>

      <SwitchTheme />

      <div className="font-afacadFlux text-2xl flex items-center gap-2 select-none mouse-hover">
        <span className="md:block hidden">Menu</span>
        <div className="bg-black/10 dark:bg-white/10 rounded-full p-2">
          <ChartBar stroke="gray" />
        </div>
      </div>
    </header>
  );
};
