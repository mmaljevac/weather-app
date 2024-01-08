import React from 'react';
import { globalStyles } from '../styles/styles';
import {
  Button,
  Text,
  TouchableOpacity,
} from 'react-native';
import { useLocationsContext } from '../contexts/AppContext';

export default function LocationItem({ item }) {
  const { setSavedLocations } = useLocationsContext();

  const handleDelete = (item) => {
    setSavedLocations((prevLocs) => {
      return prevLocs.filter((loc) => loc.name != item.name);
    });
  };

  return (
    <TouchableOpacity>
      <Text style={globalStyles.text}>
        {item.name}, {item.country}
      </Text>
      <Button title="Delete" onPress={() => handleDelete(item)} />
    </TouchableOpacity>
  );
}
