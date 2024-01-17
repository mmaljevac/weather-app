import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAppContext } from '../contexts/AppContext';
import {
  dayMode,
  nightMode,
  weatherImages,
  weatherImagesNight,
} from '../constants/constants';

export default function LocationItem({ item }) {
  const { setSavedLocations, setActiveLocation } = useAppContext();
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
    <TouchableOpacity
      onPress={selectLocation}
      style={[
        styles.container,
        { backgroundColor: `rgba(${item.isDay ? dayMode : nightMode}, 1)` },
      ]}
    >
      <View>
        <Text
          style={{
            fontSize: 25,
            padding: 5,
            color: 'white',
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
    alignItems: 'center',
    padding: 15,
    marginVertical: 7,
    borderRadius: 12,
  },
  text: {
    fontSize: 15,
    padding: 5,
    color: 'white',
  },
  img: {
    width: 55,
    height: 55,
  },
});
