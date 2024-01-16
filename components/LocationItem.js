import React from 'react';
import { globalStyles } from '../styles/styles';
import { Button, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useLocationsContext } from '../contexts/AppContext';
import { useNavigation } from '@react-navigation/native';

export default function LocationItem({ item }) {
  const { setSavedLocations, setActiveLocation } = useLocationsContext();
  const navigation = useNavigation();

  const selectLocation = () => {
    setActiveLocation(`${item.name}, ${item.country}`);
    navigation.goBack();
  };

  const handleDelete = (item) => {
    setSavedLocations((prevLocs) => {
      return prevLocs.filter((loc) => loc.name != item.name);
    });
  };

  return (
    <TouchableOpacity onPress={selectLocation} style={styles.container}>
      <Text style={styles.text}>
        {item.name}, {item.country}
      </Text>
      <Text style={styles.text}>
        {item.temp}°C, {item.condition}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 12,
  },
  text: {
    fontSize: 15,
    padding: 5,
  },
});
