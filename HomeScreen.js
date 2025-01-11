import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const lessons = [
  { id: '1', title: 'Lesson 1: Hangul Alphabet', description: 'Learn the fundamentals of the Korean alphabet and simple words.' },
  { id: '2', title: 'Lesson 2: Greetings', description: 'Master common greetings used in daily Korean conversations.' },
  { id: '3', title: 'Lesson 3: Numbers', description: 'Understand how to count and use numbers in Korean.' },
  { id: '4', title: 'Lesson 4: Days and Time', description: 'Learn the days of the week and how to tell time in Korean.' },
  { id: '5', title: 'Lesson 5: Restaurant Phrases', description: 'Essential phrases for ordering food and names of common Korean dishes.' },
  { id: '6', title: 'Lesson 6: At the Shopping Center', description: 'Vocabulary for shopping and phrases for asking prices.' },
  { id: '7', title: 'Lesson 7: Useful expressions for travel', description: 'Basic phrases for navigating and asking for directions.' },
  { id: '8', title: 'Lesson 8: Family Terms', description: 'Learn terms for family members and expressing relationships.' },
  { id: '9', title: 'Lesson 9: Basic Colors', description: 'Explore common colors and simple descriptive sentences.' },
  { id: '10', title: 'Lesson 10: Asking for Directions', description: 'Important cultural phrases and polite language.' },
];

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>MungMung Korean Lessons</Text>
      <Text style={styles.subtitle}>Choose a lesson to start learning:</Text>
      <FlatList
        data={lessons}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={[
              styles.lessonButton,
              { backgroundColor: index % 2 === 0 ? '#FFAB40' : '#4CAF50' },
            ]}
            onPress={() =>
              navigation.navigate('Lesson', { title: item.title, description: item.description })
            }
          >
            <Text style={styles.lessonTitle}>{item.title}</Text>
            <Text style={styles.lessonDescription}>{item.description}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFDE7',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#3F51B5',
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    color: '#009688',
  },
  lessonButton: {
    padding: 15,
    marginVertical: 8,
    borderRadius: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
  },
  lessonTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 5,
  },
  lessonDescription: {
    fontSize: 14,
    color: '#FFF',
  },
});
