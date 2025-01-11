import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
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
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.actionButtonText}>Go Back</Text>
        </TouchableOpacity>
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

  const ActionButton = ({ title, onPress, color, disabled }) => (
    <TouchableOpacity
      style={[
        styles.actionButton,
        { backgroundColor: color || '#4CAF50', opacity: disabled ? 0.5 : 1 },
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.actionButtonText}>{title}</Text>
    </TouchableOpacity>
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
            style={[
              styles.sectionButton,
              {
                backgroundColor: index % 2 === 0 ? '#FFAB40' : '#4CAF50',
              },
            ]}
            onPress={() => setSelectedSection(section)}
          >
            <Text style={styles.sectionText}>
              {index + 1}. {section}
            </Text>
          </TouchableOpacity>
        ))}
        <ActionButton
          title="Go Back to Lessons"
          onPress={() => navigation.goBack()}
          color="#F44336"
        />
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
    <ScrollView contentContainerStyle={styles.scrollableContainer}>
      <Text style={styles.lessonTitle}>{title}</Text>
      <Text style={styles.sectionHeader}>
        {sectionIndex}. {selectedSection}
      </Text>
      {sectionText && <Text style={styles.text}>{sectionText}</Text>}
      {sectionKorean && <Text style={styles.word}>{sectionKorean}</Text>}
      <View style={styles.buttonContainer}>
        <ActionButton
          title="Back"
          onPress={goBack}
          color="#FF5722"
          disabled={currentIndex === 0}
        />
        {sectionKorean && (
          <ActionButton title="Hear" onPress={speak} color="#FFC107" />
        )}
        <ActionButton
          title="Next"
          onPress={goNext}
          color="#8BC34A"
          disabled={currentIndex === sections[selectedSection]?.text.length - 1}
        />
      </View>
      <View style={styles.changeSectionContainer}>
        <ActionButton
          title="Change Section"
          onPress={resetSelection}
          color="#2196F3"
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFDE7',
  },
  scrollableContainer: {
    padding: 20,
    alignItems: 'center',
  },
  lessonTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#3F51B5',
  },
  introductionContainer: {
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#FFEB3B',
    borderRadius: 15,
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
    color: '#009688',
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
    color: '#795548',
  },
  word: {
    fontSize: 32,
    fontWeight: 'bold',
    marginVertical: 15,
    color: '#673AB7',
    textAlign: 'center',
  },
  sectionButton: {
    padding: 12,
    marginVertical: 8,
    borderRadius: 15,
    width: '90%',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
  },
  sectionText: {
    fontSize: 18,
    color: '#FFF',
    textAlign: 'center',
  },
  actionButton: {
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 20,
    alignItems: 'center',
    width: 100,
  },
  actionButtonText: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Space between Back, Hear, and Next
    width: '100%',
    marginTop: 20,
    marginBottom: 20, // Add space between navigation and change section buttons
  },
  changeSectionContainer: {
    alignItems: 'center',
  },
});
