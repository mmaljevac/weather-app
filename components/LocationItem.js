import React from 'react';
import { globalStyles } from '../styles/styles';
import {
  Button,
  Text,
  TouchableOpacity,
} from 'react-native';
import { useLocationsContext } from '../contexts/AppContext';
import { useNavigation } from '@react-navigation/native';

export default function LocationItem({ item }) {
  const { setSavedLocations, setActiveLocation } = useLocationsContext();
  const navigation = useNavigation();

  const selectLocation = () => {
    setActiveLocation(`${item.name}, ${item.country}`);
    navigation.goBack();
  }

  const handleDelete = (item) => {
    setSavedLocations((prevLocs) => {
      return prevLocs.filter((loc) => loc.name != item.name);
    });
  };

  return (
    <TouchableOpacity onPress={selectLocation}>
      <Text style={globalStyles.text}>
        {item.name}, {item.country}
      </Text>
      <Button title="Delete" onPress={() => handleDelete(item)} />
    </TouchableOpacity>
  );
}
