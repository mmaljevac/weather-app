import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  locationsContainer: {
    flex: 1,
    margin: 20,
    marginTop: 70,
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 15,
  },
  title : {
    fontSize: 40,
  },
  text: {
    fontSize: 15,
    padding: 30,
  },
  button: {
    padding: 20,
  },
  list: {
    flex: 1,
  },
  forecastItem: {
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: 'lightblue',
    borderRadius: 10,
    padding: 5,
    margin: 3,
    width: 70,
    height: 100
  },
});
