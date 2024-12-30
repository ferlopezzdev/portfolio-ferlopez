"use client";
import React, { useEffect, useState, useRef } from "react";
import { useTheme } from "../context/ThemeContext";

const CustomMouse: React.FC = () => {
  const { theme } = useTheme();

  const [isMobile, setIsMobile] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [dotPos, setDotPos] = useState({ x: 0, y: 0 });
  const [isHoveringLink, setIsHoveringLink] = useState(false);
  const [outlineSize, setOutlineSize] = useState({ width: 30, height: 30 });
  const [hoverOutlineSize, setHoverOutlineSize] = useState({
    width: 0,
    height: 0,
  });
  const [outlinePos, setOutlinePos] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [isClicked, setIsClicked] = useState(false);

  const outlineRef = useRef<HTMLDivElement | null>(null);

  // Detectar si es un dispositivo móvil
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768); // Cambia el tamaño según tus necesidades
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);

  useEffect(() => {
    if (isMobile) return;

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
  }, [mousePos, isMobile]);

  useEffect(() => {
    if (isMobile) return;

    const handleMouseEnterElement = (e: Event) => {
      const element = e.target as HTMLElement;
      const rect = element.getBoundingClientRect();

      setOutlinePos({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      });

      setOutlineSize({
        width: rect.width,
        height: rect.height,
      });

      setHoverOutlineSize({
        width: rect.width + 10,
        height: rect.height + 10,
      });

      setIsHoveringLink(true);
    };

    const handleMouseLeaveElement = () => {
      setIsHoveringLink(false);
      setOutlineSize({ width: 30, height: 30 });
    };

    const elements = document.querySelectorAll(".mouse-hover");

    elements.forEach((element) => {
      element.addEventListener("mouseenter", handleMouseEnterElement);
      element.addEventListener("mouseleave", handleMouseLeaveElement);
    });

    return () => {
      elements.forEach((element) => {
        element.removeEventListener("mouseenter", handleMouseEnterElement);
        element.removeEventListener("mouseleave", handleMouseLeaveElement);
      });
    };
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) return;

    const handleClick = () => {
      const elements = document.querySelectorAll(".pointer-outline");

      elements.forEach((element) => {
        element.classList.add("animate-ping");

        setTimeout(() => {
          element.classList.remove("animate-ping");
        }, 300);
      });
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [isMobile]);

  if (isMobile) return null; // Ocultar el componente en dispositivos móviles

  return (
    <>
      {/* Outline */}
      <div
        ref={outlineRef}
        className={`absolute pointer-events-none rounded-full border-2 transition-all duration-300 ease-out ${
          isHoveringLink
            ? "border-primary shadow-primary shadow-lg ring-primary outline-primary"
            : "bg-transparent border-label"
        }`}
        style={{
          left: isHoveringLink
            ? `${outlinePos.x - hoverOutlineSize.width / 2}px`
            : `${mousePos.x - outlineSize.width / 2}px`,
          top: isHoveringLink
            ? `${outlinePos.y - hoverOutlineSize.height / 2}px`
            : `${mousePos.y - outlineSize.height / 2}px`,
          width: isHoveringLink
            ? `${hoverOutlineSize.width}px`
            : `${outlineSize.width}px`,
          height: isHoveringLink
            ? `${hoverOutlineSize.height}px`
            : `${outlineSize.height}px`,
          zIndex: 50,
        }}
      />

      {/* Outline Effect */}
      <div
        ref={outlineRef}
        className={`absolute pointer-outline pointer-events-none rounded-full border-2 transition-all duration-300 ease-out ${
          isHoveringLink
            ? "border-primary ring-primary outline-primary"
            : "bg-transparent border-transparent"
        }`}
        style={{
          left: isHoveringLink
            ? `${outlinePos.x - hoverOutlineSize.width / 2}px`
            : `${mousePos.x - outlineSize.width / 2}px`,
          top: isHoveringLink
            ? `${outlinePos.y - hoverOutlineSize.height / 2}px`
            : `${mousePos.y - outlineSize.height / 2}px`,
          width: isHoveringLink
            ? `${hoverOutlineSize.width}px`
            : `${outlineSize.width}px`,
          height: isHoveringLink
            ? `${hoverOutlineSize.height}px`
            : `${outlineSize.height}px`,
          zIndex: 50,
        }}
      />

      {/* Point */}
      <div
        className={`absolute pointer-events-none  rounded-full bg-label transition-all duration-200 ease-out ${
          isHoveringLink &&
          "bg-primary border-2 border-primary shadow-2xl shadow-primary"
        }`}
        style={{
          left: `${dotPos.x - 5}px`,
          top: `${dotPos.y - 5}px`,
          width: isHoveringLink ? "15px" : "10px",
          height: isHoveringLink ? "15px" : "10px",

          zIndex: 50,
          mixBlendMode: isHoveringLink ? "difference" : "normal",
        }}
      />
    </>
  );
};

export default CustomMouse;
