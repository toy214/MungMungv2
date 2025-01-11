import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function TitleScreen({ navigation }) {
  return (
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFDE7', // Vibrant light yellow background
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#4CAF50', // Green for the title text
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#757575', // Subtle gray for subtitle
    textAlign: 'center',
    marginBottom: 30,
  },
  getStartedButton: {
    backgroundColor: '#2196F3', // Blue button color
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    elevation: 5, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
  },
  buttonText: {
    fontSize: 18,
    color: '#FFFFFF', // White text for contrast
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
