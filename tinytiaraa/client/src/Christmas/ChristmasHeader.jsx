import React from "react";

const ChristmasHeader = () => {
  return (
    <div
      className="relative bg-red-600 text-white text-center py-6"
      style={{
        backgroundImage: "url('https://i.imgur.com/PLlHnRk.png')", // Optional: Garland image
        backgroundRepeat: "repeat-x",
      }}
    >
      <h1 className="text-5xl font-bold drop-shadow-lg">
        🎄 Merry Christmas 🎅
      </h1>
      <p className="text-lg mt-2 drop-shadow-md">
        Wishing you a joyful and festive season!
      </p>
    </div>
  );
};

export default ChristmasHeader;
