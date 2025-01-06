// LessonScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import * as Speech from 'expo-speech';
import { lessonsData } from './lessons';

export default function LessonScreen({ route }) {
  const { title } = route.params;
  const lesson = lessonsData[title];
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!lesson) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Lesson Not Found</Text>
        <Text style={styles.text}>Sorry, the requested lesson could not be found.</Text>
      </View>
    );
  }

  const { text, korean } = lesson;
  const currentWord = korean[currentIndex];
  const currentExplanation = text[currentIndex] || "No explanation available.";

  const speak = () => {
    Speech.speak(currentWord, { language: 'ko', rate: .65 }); // Adjusted rate for slower speech
  };

  const goNext = () => {
    if (currentIndex < korean.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const goBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.text}>{currentExplanation}</Text>
      <Text style={styles.word}>{currentWord}</Text>
      <View style={styles.buttonContainer}>
        <Button title="Back" onPress={goBack} disabled={currentIndex === 0} />
        <Button title="Hear" onPress={speak} color="#4CAF50" />
        <Button title="Next" onPress={goNext} disabled={currentIndex === korean.length - 1} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#FFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 20,
  },
  word: {
    fontSize: 32,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
});
