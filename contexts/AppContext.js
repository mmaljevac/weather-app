import React, { createContext, useContext, useState } from 'react';

const LocationsContext = createContext();

export const LocationsProvider = ({ children }) => {
  const [savedLocations, setSavedLocations] = useState([]);
  const [activeLocation, setActiveLocation] = useState('Zagreb');

  return (
    <LocationsContext.Provider
      value={{
        savedLocations: savedLocations,
        setSavedLocations: setSavedLocations,
        activeLocation: activeLocation,
        setActiveLocation: setActiveLocation,
      }}
    >
      {children}
    </LocationsContext.Provider>
  );
};

export const useLocationsContext = () => {
  return useContext(LocationsContext);
};
