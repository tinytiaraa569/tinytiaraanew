import React, { useState } from "react";

const InteractiveSanta = () => {
  const [wave, setWave] = useState(false);

  return (
    <div className="text-center my-6 cursor-pointer">
      <img
        src="https://i.imgur.com/L3wDGeQ.png" // Santa Claus image
        alt="Santa Claus"
        className={`mx-auto w-48 transition-transform duration-300 ${
          wave ? "rotate-12" : "rotate-0"
        }`}
        onMouseEnter={() => setWave(true)}
        onMouseLeave={() => setWave(false)}
      />
      <p className="text-lg font-semibold mt-4">Ho Ho Ho! Merry Christmas! 🎅</p>
    </div>
  );
};

export default InteractiveSanta;
