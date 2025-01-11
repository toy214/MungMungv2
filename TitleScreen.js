import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';

export default function TitleScreen({ navigation }) {
  return (
    <ImageBackground
      source={require('./assets/background.jpg')} // Replace with a suitable background image
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to MungMung!</Text>
        <Text style={styles.subtitle}>Learn Korean the fun way!</Text>
        <TouchableOpacity
          style={styles.getStartedButton}
          onPress={() => navigation.navigate('Menu')}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent overlay
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFEB3B',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 30,
  },
  getStartedButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
  },
  buttonText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
