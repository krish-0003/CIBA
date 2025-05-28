import React, { useEffect, useState } from "react";

const MouseGradient = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
        background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, 
          rgba(64, 156, 255, 0.15) 0%,
          rgba(88, 86, 214, 0.12) 20%,
          rgba(138, 43, 226, 0.08) 40%,
          rgba(64, 156, 255, 0.05) 60%,
          transparent 80%)`,
        backgroundSize: "400px 400px",
        backgroundRepeat: "no-repeat",
        filter: "blur(12px)",
      }}
    />
  );
};

export default MouseGradient;
