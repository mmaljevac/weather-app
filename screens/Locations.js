import React from 'react';
import { globalStyles } from '../styles/styles';
import {
  Button,
  FlatList,
  Keyboard,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useLocationsContext } from '../contexts/AppContext';

export default function Locations() {
  const { savedLocations, setSavedLocations } = useLocationsContext();

  const handleDelete = (item) => {
    setSavedLocations((prevLocs) => {
      return prevLocs.filter(loc => loc.name != item.name)
    })
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={globalStyles.locationsContainer}>
        <Text style={globalStyles.title}>Saved locations:</Text>
        <FlatList
          keyExtractor={(item) => `${item.name}, ${item.country}`}
          data={savedLocations}
          renderItem={({ item }) => (
            <TouchableOpacity>
              <Text style={globalStyles.text}>
                {item.name}, {item.country}
              </Text>
              <Button title='Delete' onPress={() => handleDelete(item)} />
            </TouchableOpacity>
          )}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}
