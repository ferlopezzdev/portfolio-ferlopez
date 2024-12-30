import Link from "next/link";
import React from "react";

export const Header = () => {
  return (
    <header className="flex justify-between p-6">
      <Link
        href="/"
        className="font-semibold font-afacadFlux text-4xl text-label"
      >
        FLT
      </Link>
    </header>
  );
};
