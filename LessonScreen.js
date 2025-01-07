import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, ScrollView } from 'react-native';
import * as Speech from 'expo-speech';
import { lessonsData } from './lessons';

export default function LessonScreen({ route }) {
  const { title } = route.params;
  const lesson = lessonsData[title];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedSection, setSelectedSection] = useState("Consonants"); // Default section

  if (!lesson) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Lesson Not Found</Text>
        <Text style={styles.text}>Sorry, the requested lesson could not be found.</Text>
      </View>
    );
  }

  const sections = {
    Consonants: {
      text: lesson.text.filter((_, index) => index < 20), // Example slice for consonants
      korean: lesson.korean.filter((_, index) => index < 20),
    },
    Vowels: {
      text: lesson.text.filter((_, index) => index >= 20 && index < 40), // Example slice for vowels
      korean: lesson.korean.filter((_, index) => index >= 20 && index < 40),
    },
    Practice: {
      text: lesson.text.filter((_, index) => index >= 40), // Example slice for practice
      korean: lesson.korean.filter((_, index) => index >= 40),
    },
  };

  const currentSection = sections[selectedSection];
  const currentWord = currentSection.korean[currentIndex];
  const currentExplanation = currentSection.text[currentIndex] || "No explanation available.";

  const speak = () => {
    if (!currentWord || currentWord.trim() === "") {
      console.warn("No word to speak");
      return;
    }

    try {
      Speech.speak(currentWord, {
        language: 'ko',
        rate: 0.65,
        onError: (error) => {
          console.error("Speech failed: ", error);
          if (Platform.OS === 'android') {
            alert("Korean language may not be supported on your device.");
          }
        },
      });
    } catch (error) {
      console.error("Speech error: ", error);
    }
  };

  const goNext = () => {
    if (currentIndex < currentSection.korean.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const goBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const changeSection = (section) => {
    setSelectedSection(section);
    setCurrentIndex(0); // Reset index when switching sections
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.sectionSelector}>
        <Button title="Consonants" onPress={() => changeSection("Consonants")} />
        <Button title="Vowels" onPress={() => changeSection("Vowels")} />
        <Button title="Practice" onPress={() => changeSection("Practice")} />
      </View>
      <Text style={styles.title}>{title} - {selectedSection}</Text>
      <Text style={styles.text}>{currentExplanation}</Text>
      <Text style={styles.word}>{currentWord}</Text>
      <View style={styles.buttonContainer}>
        <Button title="Back" onPress={goBack} disabled={currentIndex === 0} />
        {currentWord && <Button title="Hear" onPress={speak} color="#4CAF50" />}
        <Button title="Next" onPress={goNext} disabled={currentIndex === currentSection.korean.length - 1} />
      </View>
    </ScrollView>
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
  sectionSelector: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 20,
    width: '100%',
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
