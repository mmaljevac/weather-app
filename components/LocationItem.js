import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAppContext } from '../contexts/AppContext';
import {
  apiKey,
  dayMode,
  nightMode,
  weatherImages,
  weatherImagesNight,
} from '../constants/constants';

export default function LocationItem({ item }) {
  const { setSavedLocations, setActiveLocation } = useAppContext();
  const navigation = useNavigation();

  const [location, setLocation] = useState('');

  useEffect(() => {
    fetch(
      `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${
        item.name + ', ' + item.country
      }&aqi=no`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setLocation(data);
      })
      .catch(() => {});
  }, []);

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
    location && (
      <TouchableOpacity
        onPress={selectLocation}
        style={[
          styles.container,
          {
            backgroundColor: `rgba(${
              location.current.is_day ? dayMode : nightMode
            }, 1)`,
          },
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
            {location.current.temp_c}°C, {location.current.condition.text}
          </Text>
        </View>
        <Image
          source={
            location.current.is_day
              ? weatherImages[location.current.condition.text]
              : weatherImagesNight[location.current.condition.text]
          }
          style={styles.img}
        />
      </TouchableOpacity>
    )
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
