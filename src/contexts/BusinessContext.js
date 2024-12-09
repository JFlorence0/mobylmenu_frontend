import React, { createContext, useState } from 'react';

// Create the context
export const BusinessContext = createContext();

// Create a provider component
export const BusinessProvider = ({ children }) => {
  const [business, setBusiness] = useState(null);

  return (
    <BusinessContext.Provider value={{ business, setBusiness }}>
      {children}
    </BusinessContext.Provider>
  );
};
