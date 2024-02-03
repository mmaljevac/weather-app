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
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function LocationItem({ item }) {
  const { savedLocations, setSavedLocations, setActiveLocation } =
    useAppContext();
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

  const handleDelete = () => {
    const updatedLocations = savedLocations.filter(
      (savedItem) => savedItem.name + savedItem.country !== item.name + item.country
    );
    setSavedLocations(updatedLocations);
  };

  const rightSwipe = () => {
    return (
      <TouchableOpacity
        style={styles.deleteBox}
        onPress={handleDelete}
      >
        <Text style={{ color: 'red', fontWeight: 'bold' }}>Delete</Text>
      </TouchableOpacity>
    );
  };

  return (
    location && (
      <GestureHandlerRootView>
        <Swipeable renderRightActions={rightSwipe}>
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
        </Swipeable>
      </GestureHandlerRootView>
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
  deleteBox: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});
