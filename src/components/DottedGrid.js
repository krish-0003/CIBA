import React from "react";
import { useMediaQuery } from "@mui/material";

const DottedGrid = () => {
  const isMobile = useMediaQuery("(max-width:768px)");

  const rows = isMobile ? 7 : 20;
  const cols = isMobile ? 15 : 24;

  // Generate random duration between 2 and 4 seconds
  const getRandomDuration = () => Math.random() * 2 + 2;

  // Generate random delay between 0 and 2 seconds
  const getRandomDelay = () => Math.random() * 2;

  const GridPattern = ({ position }) => (
    <div
      style={{
        position: "fixed",
        ...position,
        zIndex: -1,
        pointerEvents: "none",
        opacity: 0.25,
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, 8px)`,
        gridTemplateRows: `repeat(${rows}, 8px)`,
        gap: "8px",
      }}
    >
      {Array.from({ length: rows * cols }).map((_, i) => {
        const duration = getRandomDuration();
        const delay = getRandomDelay();
        const scale = Math.random() * 0.7 + 0.5; // Random scale between 1.5 and 1

        return (
          <div
            key={i}
            style={{
              width: 4,
              height: 4,
              borderRadius: "50%",
              background: "#111",
              opacity: 0.5,
              transform: `scale(${scale})`,
              animation: `pulse ${duration}s ease-in-out infinite ${delay}s`,
            }}
          />
        );
      })}
    </div>
  );

  return (
    <>
      <GridPattern position={{ top: 4, right: 3 }} />
      <GridPattern position={{ bottom: 4, left: 3 }} />
      <style>
        {`
          @keyframes pulse {
            0% {
              opacity: 0;
              transform: scale(0.5);
            }
            20% {
              opacity: 0.3;
              transform: scale(1);
            }
            40% {
              opacity: 0.1;
              transform: scale(0.8);
            }
            60% {
              opacity: 0.4;
              transform: scale(1.1);
            }
            80% {
              opacity: 0.2;
              transform: scale(0.9);
            }
            100% {
              opacity: 0;
              transform: scale(0.5);
            }
          }
        `}
      </style>
    </>
  );
};

export default DottedGrid;
