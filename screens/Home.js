import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import ForecastItem from '../components/ForecastItem';
import {
  apiKey,
  dayMode,
  nightMode,
  weatherImages,
  weatherImagesNight,
} from '../constants/constants';
import { useAppContext } from '../contexts/AppContext';

export default function Home() {
  const navigation = useNavigation();

  const [search, setSearch] = useState('Zagreb');
  const [currentWeatherData, setCurrentWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const { savedLocations, setSavedLocations, activeLocation, isDay, setIsDay } = useAppContext();

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
        setIsDay(data.current.is_day);
      })
      .catch(() => {});
  };

  const handleSave = () => {
    const newLocation = {
      name: currentWeatherData.location.name,
      country: currentWeatherData.location.country,
      temp: currentWeatherData.current.temp_c,
      condition: currentWeatherData.current.condition.text,
      isDay: currentWeatherData.current.is_day,
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
      Alert.alert('Location already saved!');
    }
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        backgroundColor: isDay ? `rgb(${dayMode})` : `rgb(${nightMode})`,
      }}
    >
      <View style={styles.container}>
        <TextInput
          style={styles.search}
          placeholder="Search for a location"
          placeholderTextColor="rgba(255, 255, 255, 0.6)"
          onChangeText={(e) => setSearch(e)}
          onSubmitEditing={() => handleSearch(search)}
          returnKeyType="search"
        ></TextInput>

        {currentWeatherData && (
          <>
            <Text style={{ fontSize: 30, padding: 20, color: 'white' }}>
              <Text style={{ fontWeight: 'bold' }}>
                {currentWeatherData.location.name},{' '}
              </Text>
              {currentWeatherData.location.country}
            </Text>
            <Image
              source={
                currentWeatherData.current.is_day
                  ? weatherImages[currentWeatherData.current.condition.text]
                  : weatherImagesNight[
                      currentWeatherData.current.condition.text
                    ]
              }
              style={styles.imgCurrent}
            />
            <Text
              style={{
                fontSize: 35,
                paddingTop: 15,
                paddingBottom: 10,
                color: 'white',
              }}
            >
              {currentWeatherData.current.temp_c}°C
            </Text>
            <Text style={{ fontSize: 25, marginBottom: 10, color: 'white' }}>
              {currentWeatherData.current.condition.text}
            </Text>
            <Text style={styles.text}>
              <Text style={{ fontWeight: 'bold' }}>Humidity:</Text>{' '}
              {currentWeatherData.current.humidity}% •{' '}
              <Text style={{ fontWeight: 'bold' }}>Wind:</Text>{' '}
              {currentWeatherData.current.wind_kph}km/h
            </Text>
          </>
        )}

        {forecastData && currentWeatherData && (
          <>
            <Text
              style={{
                fontSize: 18,
                padding: 7,
                marginTop: 10,
                color: 'white',
              }}
            >
              Forecast by hour (currently{' '}
              {currentWeatherData.location.localtime.substring(11)})
            </Text>
            <ScrollView
              horizontal={true}
              contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
            >
              <View style={{ flexDirection: 'row' }}>
                {forecastData.forecast.forecastday[0].hour.map(
                  (item, index) => (
                    <ForecastItem key={index} item={item} />
                  )
                )}
              </View>
            </ScrollView>
          </>
        )}
        <View style={styles.button}>
          <Button title="Save location📍" onPress={handleSave} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 75,
    // backgroundColor: '#242424'
  },
  text: {
    fontSize: 20,
    padding: 7,
    color: 'white',
  },
  search: {
    padding: 10,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 12,
    color: 'white',
  },
  imgCurrent: {
    width: 200,
    height: 200,
  },
  button: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 5,
    margin: 5,
    marginBottom: 20,
  },
});
