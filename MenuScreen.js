import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function MenuScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>MungMung</Text>
      <Button title="Start Learning" onPress={() => navigation.navigate('Home')} color="#4CAF50" />
      <Button title="About" onPress={() => navigation.navigate('About')} color="#2196F3" />
      <Button title="Settings" onPress={() => navigation.navigate('Settings')} color="#FF9800" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
