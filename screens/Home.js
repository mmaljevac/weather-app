import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Button,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import ForecastItem from '../components/ForecastItem';
import { useLocationsContext } from '../contexts/AppContext';
import { globalStyles } from '../styles/styles';
import { apiKey, weatherImages } from '../constants/constants';

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
      `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${term}&aqi=no`
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
      `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${term}&days=1&aqi=no&alerts=no`
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
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Input city"
        onChangeText={(e) => setSearch(e)}
        onSubmitEditing={() => handleSearch(search)}
        returnKeyType="search"
      ></TextInput>

      {currentWeatherData && (
        <>
          <Text style={styles.text}>
            Current weather in {currentWeatherData.location.name},{' '}
            {currentWeatherData.location.country}:
          </Text>
          <Image
            source={weatherImages[currentWeatherData.current.condition.text]}
            style={styles.imgCurrent}
          />
          <Text style={styles.text}>
            Weather: {currentWeatherData.current.condition.text}
          </Text>
          <Text style={styles.text}>
            Temperature: {currentWeatherData.current.temp_c}°C
          </Text>
          <Text style={styles.text}>
            Humidity: {currentWeatherData.current.humidity}%
          </Text>
          <Text style={styles.text}>
            Wind: {currentWeatherData.current.wind_kph}km/h
          </Text>
          <View style={styles.button}>
            <Button title="Save" onPress={handleSave} />
          </View>
        </>
      )}

      {forecastData && (
        <>
          <Text>Forecast by hour</Text>
          <ScrollView
            horizontal={true}
            contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
          >
            <View style={{ flexDirection: 'row' }}>
              {forecastData.forecast.forecastday[0].hour.map((item, index) => (
                <ForecastItem key={index} item={item} />
              ))}
            </View>
          </ScrollView>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 100,
  },
  text: {
    fontSize: 15,
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 15,
  },
  imgCurrent: {
    width: 200,
    height: 200,
  },
});
