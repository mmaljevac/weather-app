import React, { useEffect } from 'react';
import { globalStyles } from '../styles/styles';
import {
  Text,
  View,
} from 'react-native';

export default function ForecastItem({ item }) {

  return (
    <View style={globalStyles.forecastItem}>
      <Text>{item.time.substring(11,13)}</Text>
      <Text>{item.temp_c}°C</Text>
      <Text>{item.condition.text}</Text>
    </View> 
  );
}
