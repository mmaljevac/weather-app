import React, { createContext, useContext, useState } from 'react';

const LocationsContext = createContext();

export const LocationsProvider = ({ children }) => {
  const [savedLocations, setSavedLocations] = useState([]);

  return (
    <LocationsContext.Provider value={{ savedLocations: savedLocations, setSavedLocations: setSavedLocations }}>
      {children}
    </LocationsContext.Provider>
  );
};

export const useLocationsContext = () => {
  return useContext(LocationsContext);
};