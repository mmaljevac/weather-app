import React, { useState } from 'react';
import { globalStyles } from '../styles/styles';
import {
  Alert,
  Button,
  FlatList,
  Keyboard,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useLocationsContext } from '../contexts/AppContext';
import { useNavigation } from '@react-navigation/native';

export default function Home() {
  const navigation = useNavigation();

  const [search, setSearch] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const { savedLocations, setSavedLocations } = useLocationsContext();

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
      })
      .catch(() => {
        Alert.alert('Unknown city!');
      });
  };

  const handleSave = () => {
    const newLocation = {
      name: weatherData.location.name,
      country: weatherData.location.country,
    };

    if (
      !savedLocations.some(
        (loc) =>
          loc.name === newLocation.name && loc.country === newLocation.country
      )
    ) {
      const sortedLocations = [...savedLocations, newLocation].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      setSavedLocations(sortedLocations);
      navigation.navigate('Locations');
    } else {
      Alert.alert('City already saved!');
    }
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
            <Text style={globalStyles.text}>
              Current weather in {weatherData.location.name},{' '}
              {weatherData.location.country}:
            </Text>
            <Text style={globalStyles.text}>
              Temperature: {weatherData.current.temp_c}°C
            </Text>
            <Text style={globalStyles.text}>
              Humidity: {weatherData.current.humidity}%
            </Text>
            <Text style={globalStyles.text}>
              Wind: {weatherData.current.wind_kph}km/h
            </Text>
            <View style={globalStyles.button}>
              <Button title="Save" onPress={handleSave} />
            </View>
          </>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}
