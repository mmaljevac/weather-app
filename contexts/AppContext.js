import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const ContextProvider = ({ children }) => {
  const [savedLocations, setSavedLocations] = useState([]);
  const [activeLocation, setActiveLocation] = useState('Zagreb');
  const [isDay, setIsDay] = useState(true);

  return (
    <AppContext.Provider
      value={{
        savedLocations: savedLocations,
        setSavedLocations: setSavedLocations,
        activeLocation: activeLocation,
        setActiveLocation: setActiveLocation,
        isDay: isDay,
        setIsDay: setIsDay,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
