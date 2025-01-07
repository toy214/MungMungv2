import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, ScrollView, TouchableOpacity } from 'react-native';
import * as Speech from 'expo-speech';
import { lessonsData } from './lessons';

export default function LessonScreen({ route, navigation }) {
  const { title } = route.params;
  const lesson = lessonsData[title];
  const [selectedSection, setSelectedSection] = useState(null); // Current section
  const [currentIndex, setCurrentIndex] = useState(0); // Current item in the section

  if (!lesson) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Lesson Not Found</Text>
        <Text style={styles.text}>Sorry, the requested lesson could not be found.</Text>
      </View>
    );
  }

  const sections = lesson.sections || {}; // Ensure fallback if sections are undefined

  const speak = () => {
    const currentWord = sections[selectedSection]?.korean[currentIndex] || "";
    if (!currentWord.trim()) {
      console.warn("No word to speak");
      return;
    }
    Speech.speak(currentWord, { language: 'ko', rate: 0.65 });
  };

  const goNext = () => {
    if (currentIndex < sections[selectedSection].text.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const goBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const resetSelection = () => {
    setSelectedSection(null);
    setCurrentIndex(0);
  };

  // Section Selection Screen
  if (!selectedSection) {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.text}>Choose a Section:</Text>
        {Object.keys(sections).map((section) => (
          <TouchableOpacity
            key={section}
            style={styles.sectionButton}
            onPress={() => setSelectedSection(section)}
          >
            <Text style={styles.sectionText}>{section}</Text>
          </TouchableOpacity>
        ))}
        <Button title="Go Back to Lessons" onPress={() => navigation.goBack()} />
      </ScrollView>
    );
  }

  // Section Content Screen
  const sectionText = sections[selectedSection].text[currentIndex];
  const sectionKorean = sections[selectedSection].korean[currentIndex] || "";

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{title} - {selectedSection}</Text>
      <Text style={styles.text}>{sectionText}</Text>
      <Text style={styles.word}>{sectionKorean}</Text>
      <View style={styles.buttonContainer}>
        <Button title="Back" onPress={goBack} disabled={currentIndex === 0} />
        {sectionKorean.trim() && <Button title="Hear" onPress={speak} color="#4CAF50" />}
        <Button title="Next" onPress={goNext} disabled={currentIndex === sections[selectedSection].text.length - 1} />
      </View>
      <Button title="Change Section" onPress={resetSelection} color="#FF5722" />
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
  sectionButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    marginVertical: 10,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
  },
  sectionText: {
    fontSize: 18,
    color: '#FFF',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
});
