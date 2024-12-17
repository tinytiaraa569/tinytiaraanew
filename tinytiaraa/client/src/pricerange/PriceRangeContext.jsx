import React, { createContext, useState, useContext } from 'react';

const PriceRangeContext = createContext();

export const PriceRangeProvider = ({ children }) => {
  const [priceRange, setPriceRange] = useState([0, 50000]); // Default price range

  return (
    <PriceRangeContext.Provider value={{ priceRange, setPriceRange }}>
      {children}
    </PriceRangeContext.Provider>
  );
};

export const usePriceRange = () => useContext(PriceRangeContext);