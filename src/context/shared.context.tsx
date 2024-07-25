import React, { createContext } from 'react';

export const SharedContext = createContext();

export const SharedContextProvider = ({ children }) => {
  return <SharedContext.Provider value={{}}>{children}</SharedContext.Provider>;
};
