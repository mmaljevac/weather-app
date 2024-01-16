import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useLocationsContext } from '../contexts/AppContext';
import { weatherImages, weatherImagesNight } from '../constants/constants';

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
      <View>
        <Text
          style={{
            fontSize: 15,
            padding: 5,
            fontWeight: 'bold',
          }}
        >
          {item.name}
        </Text>
        <Text style={styles.text}>
          {item.temp}°C, {item.condition}
        </Text>
      </View>
      <Image
        source={
          item.isDay
            ? weatherImages[item.condition]
            : weatherImagesNight[item.condition]
        }
        style={styles.img}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 15,
    marginVertical: 7,
    borderRadius: 12,
  },
  text: {
    fontSize: 15,
    padding: 5,
  },
  img: {
    width: 55,
    height: 55,
  },
});
