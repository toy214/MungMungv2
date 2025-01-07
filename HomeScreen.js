import React from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';

const lessons = [
  { id: '1', title: 'Lesson 1: Hangul Alphabet', description: 'Learn the fundamentals of the Korean alphabet and simple words.' },
  { id: '2', title: 'Lesson 2: Greetings', description: 'Master common greetings used in daily Korean conversations.' },
  { id: '3', title: 'Lesson 3: Numbers', description: 'Understand how to count and use numbers in Korean.' },
  { id: '4', title: 'Lesson 4: Days and Time', description: 'Learn the days of the week and how to tell time in Korean.' },
  { id: '5', title: 'Lesson 5: Resturant Phrases', description: 'Essential phrases for ordering food and names of common Korean dishes.' },
  { id: '6', title: 'Lesson 6: At the shopping center', description: 'Vocabulary for shopping and phrases for asking prices.' },
  { id: '7', title: 'Lesson 7: Useful expressions for travel', description: 'Basic phrases for navigating and asking for directions.' },
  { id: '8', title: 'Lesson 8: Family Terms', description: 'Learn terms for family members and expressing relationships.' },
  { id: '9', title: 'Lesson 9: Basic Colors', description: 'Explore common colors and simple descriptive sentences.' },
  { id: '10', title: 'Lesson 10: Asking for Directions', description: 'Important cultural phrases and polite language.' },
];

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Screen</Text>
      <Text>Choose a lesson to start learning:</Text>
      <FlatList
        data={lessons}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Button
            title={item.title}
            onPress={() => navigation.navigate('Lesson', { title: item.title, description: item.description })}
            color="#4CAF50"
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#E8F5E9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
