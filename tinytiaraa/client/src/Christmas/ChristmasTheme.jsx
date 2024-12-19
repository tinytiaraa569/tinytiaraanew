import React, { useState, useEffect } from "react";
import Snowfall from "react-snowfall";

const GlobalSnowfall = () => {
  const [snowflakeCount, setSnowflakeCount] = useState(
    window.innerWidth < 768 ? 70 : 150
  );

  useEffect(() => {
    const handleResize = () => {
      setSnowflakeCount(window.innerWidth < 768 ? 80 : 150);
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
      <Snowfall color="white" snowflakeCount={snowflakeCount} />
    </div>
  );
};

export default GlobalSnowfall;
