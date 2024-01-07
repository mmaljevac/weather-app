import React from 'react';
import { globalStyles } from '../styles/styles';
import { Keyboard, Text, TouchableWithoutFeedback, View } from 'react-native';

export default function Locations() {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={globalStyles.container}>
        <Text>Saved locations</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}
