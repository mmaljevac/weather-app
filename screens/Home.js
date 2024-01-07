import React, { useState } from 'react';
import { globalStyles } from '../styles/styles';
import {
  Button,
  Keyboard,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

export default function Home() {
  const [cookies, setCookies] = useState(0);

  const handleClick = () => {
    setCookies(cookies + 1);
    console.log(cookies + ' cookies');
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={globalStyles.container}>
        <Text>Cookies: {cookies}</Text>
        <TextInput placeholder="input"></TextInput>
        <View style={globalStyles.buttonContainer}>
          <Button title="+1" onPress={handleClick} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
