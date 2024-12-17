import React from "react";
import Snowfall from "react-snowfall";

const GlobalSnowfall = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none", // Allow clicks to pass through the snowfall
        zIndex: 9999, // Ensure it's always above all content
      }}
    >
      <Snowfall color="white" snowflakeCount={150} />
    </div>
  );
};

export default GlobalSnowfall;
