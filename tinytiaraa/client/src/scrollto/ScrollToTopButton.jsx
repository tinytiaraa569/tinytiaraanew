import React, { useState, useEffect } from 'react';
import { RiArrowUpSLine } from 'react-icons/ri'; // or any other icon of your choice
import './ScrollToTopButton.css'; // Import your custom CSS for styling

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) { // Show button after scrolling down 300px
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Optional: smooth scrolling
    });
  };

  return (
    <button
      className={`scroll-to-top-button ${visible ? 'visible' : 'hidden'}`}
      onClick={scrollToTop}
    >
      <RiArrowUpSLine size={24} />
    </button>
  );
};

export default ScrollToTopButton;
