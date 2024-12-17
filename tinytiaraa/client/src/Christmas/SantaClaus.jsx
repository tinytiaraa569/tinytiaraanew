import React from 'react';
import Lottie from 'react-lottie';
import animationData from './santa.json'; // Replace with your Lottie JSON file path
import './AnimatedSanta.css';

const SantaLottie = () => {
  // Default options for the Lottie animation
  const defaultOptions = {
    loop: true,       // Animation will loop
    autoplay: true,   // Animation will play automatically
    animationData: animationData, // Lottie JSON data
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid meet', // Maintain aspect ratio, meeting the container size
    },
  };

  return (
    <div className="santa-container">
      <Lottie
        options={defaultOptions}
        height={250} // Set the height of the animation to 250px
        width={250}  // Set the width of the animation to 250px
        style={{
          position: 'absolute', // Position the animation absolutely within the container
          top: '50%',           // Position the animation vertically centered
          right: '0',           // Start the animation off-screen to the right
          transform: 'translateY(-50%)', // Center vertically
          animation: 'moveLeft 10s linear infinite', // Apply the animation to move left
          backgroundColor: 'transparent', // Ensure background is transparent
        }}
      />
    </div>
  );
};

export default SantaLottie;
