import React from "react";
import startFrame from '../assets/StartFrame.png'; // Import the image

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#06141D]">
      {/* Image with flicker animation */}
      <img
        src={startFrame}
        alt="Loading"
        className="w-fit h-screen animate-flicker" // Tailwind class with flicker effect
      />
    </div>
  );
};

export default Loading;
