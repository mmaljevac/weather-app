import React from 'react';
import {
  FlatList,
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import LocationItem from '../components/LocationItem';
import { useLocationsContext } from '../contexts/AppContext';

export default function Locations() {
  const { savedLocations } = useLocationsContext();

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Text style={styles.title}>Saved locations</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    marginTop: 70,
  },
  title : {
    fontSize: 30,
    marginBottom: 20,
  },
});