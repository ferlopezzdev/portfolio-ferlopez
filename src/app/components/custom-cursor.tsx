"use client";
import React, { useEffect, useState, useRef } from "react";

const CustomMouse: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [dotPos, setDotPos] = useState({ x: 0, y: 0 });
  const [isHoveringLink, setIsHoveringLink] = useState(false);
  const [outlineSize, setOutlineSize] = useState({ width: 30, height: 30 });
  const [outlinePos, setOutlinePos] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const outlineRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      setMousePos({ x: clientX, y: clientY });
    };

    const handleDotMove = () => {
      setDotPos((prev) => {
        const smoothX = prev.x + (mousePos.x - prev.x) * 0.1;
        const smoothY = prev.y + (mousePos.y - prev.y) * 0.1;
        return { x: smoothX, y: smoothY };
      });
    };

    const interval = setInterval(handleDotMove, 5);

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      clearInterval(interval);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mousePos]);

  // Detectar cuando el mouse entra y sale de cualquier enlace <a>
  useEffect(() => {
    const handleMouseEnterLink = (e: MouseEvent) => {
      const link = e.target as HTMLElement;
      const rect = link.getBoundingClientRect();

      setOutlinePos({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      });
      setOutlineSize({
        width: rect.width,
        height: rect.height,
      });
      setIsHoveringLink(true);
    };

    const handleMouseLeaveLink = () => {
      setIsHoveringLink(false);
      setOutlineSize({ width: 30, height: 30 });
    };

    const links = document.querySelectorAll("a");

    links.forEach((link) => {
      link.addEventListener("mouseenter", handleMouseEnterLink);
      link.addEventListener("mouseleave", handleMouseLeaveLink);
    });

    return () => {
      links.forEach((link) => {
        link.removeEventListener("mouseenter", handleMouseEnterLink);
        link.removeEventListener("mouseleave", handleMouseLeaveLink);
      });
    };
  }, []);

  return (
    <>
      {/* Outline */}
      <div
        ref={outlineRef}
        className={`absolute pointer-events-none rounded-full border-2 border-gray-900 transition-all duration-300 ease-out ${
          isHoveringLink ? "bg-gray-900/20" : "bg-transparent"
        }`}
        style={{
          left: isHoveringLink
            ? `${outlinePos.x - outlineSize.width / 2}px`
            : `${mousePos.x - outlineSize.width / 2}px`,
          top: isHoveringLink
            ? `${outlinePos.y - outlineSize.height / 2}px`
            : `${mousePos.y - outlineSize.height / 2}px`,
          width: `${outlineSize.width}px`,
          height: `${outlineSize.height}px`,
        }}
      />

      {/* Point */}
      <div
        className={`absolute pointer-events-none rounded-full bg-gray-900 transition-all duration-200 ease-out`}
        style={{
          left: `${dotPos.x - 5}px`,
          top: `${dotPos.y - 5}px`,
          width: isHoveringLink ? "15px" : "10px", // Aumenta el tamaño
          height: isHoveringLink ? "15px" : "10px", // Aumenta el tamaño
          opacity: isHoveringLink ? 0.7 : 1, // Cambia la opacidad
        }}
      />
    </>
  );
};

export default CustomMouse;
