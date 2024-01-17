import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { weatherImages, weatherImagesNight } from '../constants/constants';

export default function ForecastItem({ item }) {
  return (
    <View style={styles.forecastItem}>
      <Text style={styles.text}>{item.time.substring(11, 13)}</Text>
      {/* <Text>{item.condition.text}</Text> */}
      <Image
        source={
          item.is_day
            ? weatherImages[item.condition.text]
            : weatherImagesNight[item.condition.text]
        }
        style={styles.imgForecast}
      />
      <Text style={styles.text}>{item.temp_c}°C</Text>
      {/* <Text>{item.is_day}</Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  forecastItem: {
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: 'rgba(255, 255, 255, 1)',
    borderRadius: 12,
    padding: 5,
    margin: 4,
    width: 70,
    height: 103,
    marginBottom: 15,
  },
  imgForecast: {
    width: 40,
    height: 40,
    padding: 25,
    marginVertical: 5,
  },
  text: {
    color: 'rgb(34, 138, 224)',
  },
});
