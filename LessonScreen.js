import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import * as Speech from 'expo-speech';
import { lessonsData } from './lessons';

export default function LessonScreen({ route, navigation }) {
  const { title } = route.params; // Lesson title
  const lesson = lessonsData[title];
  const [selectedSection, setSelectedSection] = useState(null); // Current section
  const [currentIndex, setCurrentIndex] = useState(0); // Current item in the section

  if (!lesson) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Lesson Not Found</Text>
        <Text style={styles.text}>
          Sorry, the requested lesson could not be found.
        </Text>
        <Button title="Go Back" onPress={() => navigation.goBack()} />
      </View>
    );
  }

  const sections = lesson.sections || {}; // Fallback if sections are undefined

  const speak = () => {
    const currentWord =
      sections[selectedSection]?.korean[currentIndex]?.trim() || '';
    if (!currentWord) {
      Alert.alert('Nothing to Speak', 'No word is available for pronunciation.');
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
    Alert.alert(
      'Change Section',
      'Are you sure you want to change sections? Your progress will be reset.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Yes',
          onPress: () => {
            setSelectedSection(null);
            setCurrentIndex(0);
          },
        },
      ]
    );
  };

  const ActionButton = ({ title, onPress, color = '#4CAF50', disabled }) => (
    <Button title={title} onPress={onPress} color={color} disabled={disabled} />
  );

  // Section Selection Screen
  if (!selectedSection) {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.lessonTitle}>{title}</Text>
        {lesson.introduction && (
          <View style={styles.introductionContainer}>
            <Text style={styles.introductionText}>{lesson.introduction}</Text>
          </View>
        )}
        <Text style={styles.headerText}>Choose a Section:</Text>
        {Object.keys(sections).map((section, index) => (
          <TouchableOpacity
            key={section}
            style={styles.sectionButton}
            onPress={() => setSelectedSection(section)}
          >
            <Text style={styles.sectionText}>
              {index + 1}. {section}
            </Text>
          </TouchableOpacity>
        ))}
        <ActionButton title="Go Back to Lessons" onPress={() => navigation.goBack()} />
      </ScrollView>
    );
  }

  // Section Content Screen
  const sectionIndex = Object.keys(sections).indexOf(selectedSection) + 1;
  const sectionText =
    sections[selectedSection]?.text[currentIndex]?.trim() || 'No content available.';
  const sectionKorean =
    sections[selectedSection]?.korean[currentIndex]?.trim() || '';

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.lessonTitle}>{title}</Text>
      <Text style={styles.sectionHeader}>
        {sectionIndex}. {selectedSection}
      </Text>
      {sectionText && <Text style={styles.text}>{sectionText}</Text>}
      {sectionKorean && <Text style={styles.word}>{sectionKorean}</Text>}
      <View style={styles.buttonContainer}>
        <ActionButton title="Back" onPress={goBack} disabled={currentIndex === 0} />
        {sectionKorean && (
          <ActionButton title="Hear" onPress={speak} color="#4CAF50" />
        )}
        <ActionButton
          title="Next"
          onPress={goNext}
          disabled={currentIndex === sections[selectedSection]?.text.length - 1}
        />
      </View>
      <ActionButton title="Change Section" onPress={resetSelection} color="#FF5722" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFF',
  },
  lessonTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  introductionContainer: {
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#FFEB3B',
    borderRadius: 8,
  },
  introductionText: {
    fontSize: 16,
    color: '#000',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#4CAF50',
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 15,
    lineHeight: 24,
  },
  word: {
    fontSize: 32,
    fontWeight: 'bold',
    marginVertical: 15,
    color: '#4CAF50',
    textAlign: 'center',
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
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    width: '100%',
  },
});
