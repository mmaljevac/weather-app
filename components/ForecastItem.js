import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { weatherImages } from '../constants/constants';

export default function ForecastItem({ item }) {
  return (
    <View style={styles.forecastItem}>
      <Text>{item.time.substring(11, 13)}</Text>
      {/* <Text>{item.condition.text}</Text> */}
      <Image
        source={weatherImages[item.condition.text]}
        style={styles.imgForecast}
      />
      <Text>{item.temp_c}°C</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  forecastItem: {
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: 'white',
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
});
