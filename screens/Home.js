import React, { useEffect, useState } from 'react';
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
import { useLocationsContext } from '../contexts/AppContext';
import { useNavigation } from '@react-navigation/native';

export default function Home() {
  const navigation = useNavigation();

  const [search, setSearch] = useState('Zagreb');
  const [currentWeatherData, setCurrentWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const { savedLocations, setSavedLocations, activeLocation } =
    useLocationsContext();

  useEffect(() => {
    handleSearch(activeLocation);
  }, [activeLocation]);

  const handleSearch = (term) => {
    fetch(
      `https://api.weatherapi.com/v1/current.json?key=9b6b424f000143109c4120743231105&q=${term}&aqi=no`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setCurrentWeatherData(data);
      })
      .catch(() => {
        Alert.alert('Unknown city!');
      });

    fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=9b6b424f000143109c4120743231105&q=${term}&days=1&aqi=no&alerts=no`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setForecastData(data);
      })
      .catch(() => {
        Alert.alert('Unknown city!');
      });
  };

  const handleSave = () => {
    const newLocation = {
      name: currentWeatherData.location.name,
      country: currentWeatherData.location.country,
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
          onSubmitEditing={() => handleSearch(search)}
          returnKeyType="search"
        ></TextInput>

        {currentWeatherData && (
          <>
            <Text style={globalStyles.text}>
              Current weather in {currentWeatherData.location.name},{' '}
              {currentWeatherData.location.country}:
            </Text>
            <Text style={globalStyles.text}>
              Weather: {currentWeatherData.current.condition.text}
            </Text>
            <Text style={globalStyles.text}>
              Temperature: {currentWeatherData.current.temp_c}°C
            </Text>
            <Text style={globalStyles.text}>
              Humidity: {currentWeatherData.current.humidity}%
            </Text>
            <Text style={globalStyles.text}>
              Wind: {currentWeatherData.current.wind_kph}km/h
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
