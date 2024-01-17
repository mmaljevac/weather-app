import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import LocationItem from '../components/LocationItem';
import { useAppContext } from '../contexts/AppContext';
import { dayMode } from '../constants/constants';

export default function Locations() {
  const { savedLocations } = useAppContext();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Saved locations</Text>
      <FlatList
        keyExtractor={(item) => `${item.name}, ${item.country}`}
        data={savedLocations}
        renderItem={({ item }) => <LocationItem item={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 70,
    backgroundColor: `rgba(${dayMode}, 0)`,
  },
  title: {
    fontSize: 30,
    marginBottom: 20,
  },
});
