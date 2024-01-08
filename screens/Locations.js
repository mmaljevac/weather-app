import React from 'react';
import { globalStyles } from '../styles/styles';
import {
  FlatList,
  Keyboard,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useLocationsContext } from '../contexts/AppContext';
import LocationItem from '../components/LocationItem';

export default function Locations() {
  const { savedLocations } = useLocationsContext();

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={globalStyles.locationsContainer}>
        <Text style={globalStyles.title}>Saved locations:</Text>
        <FlatList
          keyExtractor={(item) => `${item.name}, ${item.country}`}
          data={savedLocations}
          renderItem={({ item }) => (
            <LocationItem item={item} />
          )}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}
