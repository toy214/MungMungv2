import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function TitleScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to MungMung!</Text>
      <Text>Learn Korean the fun way!</Text>
      <Button title="Get Started" onPress={() => navigation.navigate('Menu')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
