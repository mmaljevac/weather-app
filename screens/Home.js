import React, { useState } from 'react';
import { globalStyles } from '../styles/styles';
import {
  Alert,
  Button,
  Keyboard,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

export default function Home() {
  const [search, setSearch] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [savedLocations, setSavedLocations] = useState([]);

  const handleSearch = () => {
    fetch(
      `https://api.weatherapi.com/v1/current.json?key=9b6b424f000143109c4120743231105&q=${search}&aqi=no`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setWeatherData(data);
        console.log(weatherData);
        console.log(data);
      })
      .catch((error) => {
        Alert.alert('Unknown city!');
      });
  };

  const handleSave = () => {
    const newLocation = { name: weatherData.location.name, country: weatherData.location.country };

    if (!savedLocations.some(loc => loc.name === newLocation.name && loc.country === newLocation.country)) {
      setSavedLocations([...savedLocations, newLocation]);
    } else {
      Alert.alert('City already saved!');
    }
    console.log(savedLocations);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={globalStyles.container}>
        <TextInput
          style={globalStyles.input}
          placeholder="Input city"
          onChangeText={(e) => setSearch(e)}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        ></TextInput>

        {weatherData && (
          <>
            <Text>
              Current weather in {weatherData.location.name},{' '}
              {weatherData.location.country}:
            </Text>
            <Text>Temperature: {weatherData.current.temp_c}°C</Text>
            <Text>Humidity: {weatherData.current.humidity}%</Text>
            <Text>Wind: {weatherData.current.wind_kph}km/h</Text>
            <Button title="Save" onPress={handleSave} />
          </>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}
