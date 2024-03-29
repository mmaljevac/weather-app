import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Locations from './screens/Locations';
import Home from './screens/Home';
import { ContextProvider } from './contexts/AppContext';
import { StatusBar } from 'react-native';

const Tab = createBottomTabNavigator();

export default function App() {

  return (
    <ContextProvider>
      <NavigationContainer>
        <StatusBar backgroundColor="#ffffff" />
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={{
            tabBarActiveTintColor: '#e91e63',
            headerShown: false,
            tabBarStyle: { 
              backgroundColor: '#202C33',
              borderTopWidth: 0,
            },
          }}
        >
          <Tab.Screen
            name="Home"
            component={Home}
            options={{
              tabBarLabel: 'Home',
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons
                  name="cloud"
                  color={color}
                  size={size}
                />
              ),
            }}
          />
          <Tab.Screen
            name="Locations"
            component={Locations}
            options={{
              tabBarLabel: 'Locations',
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons
                  name="earth"
                  color={color}
                  size={size}
                />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </ContextProvider>
  );
}
