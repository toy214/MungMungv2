import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { lessonsData } from './lessons';

export default function QuizScreen() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    generateQuizQuestions();
  }, []);

  // Generate questions dynamically from lessonsData
  const generateQuizQuestions = () => {
    const questionsArray = [];

    Object.keys(lessonsData).forEach((lessonKey) => {
      const sections = lessonsData[lessonKey].sections;
      Object.keys(sections).forEach((sectionKey) => {
        const section = sections[sectionKey];

        // Add Korean -> English questions
        if (section.korean && section.korean.length > 0) {
          section.korean.forEach((word, index) => {
            if (word && section.text[index]) {
              questionsArray.push({
                type: 'koreanToEnglish',
                question: `What is the meaning of "${word}"?`,
                options: shuffleArray([
                  section.text[index].split('=')[1].trim(),
                  'Meaning A',
                  'Meaning B',
                  'Meaning C',
                ]),
                correctAnswer: section.text[index].split('=')[1].trim(),
              });
            }
          });
        }

        // Add English -> Korean questions
        if (section.text && section.text.length > 0) {
          section.text.forEach((text, index) => {
            if (section.korean && section.korean[index]) {
              const splitText = text.split('=');
              if (splitText.length > 1) {
                questionsArray.push({
                  type: 'englishToKorean',
                  question: `What is the Korean translation of "${splitText[0].trim()}"?`,
                  options: shuffleArray([
                    section.korean[index],
                    'Option A',
                    'Option B',
                    'Option C',
                  ]),
                  correctAnswer: section.korean[index],
                });
              }
            }
          });
        }
      });
    });

    setQuestions(questionsArray);
  };

  // Shuffle array utility
  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  // Handle answer selection
  const handleAnswer = (selectedAnswer) => {
    if (selectedAnswer === questions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }
    setShowAnswer(true);
  };

  // Move to next question
  const nextQuestion = () => {
    setShowAnswer(false);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  if (questions.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Loading Quiz...</Text>
      </View>
    );
  }

  if (currentQuestionIndex >= questions.length) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Quiz Complete!</Text>
        <Text style={styles.score}>Your Score: {score}/{questions.length}</Text>
      </View>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quiz</Text>
      <Text style={styles.question}>{currentQuestion.question}</Text>
      <FlatList
        data={currentQuestion.options}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.option}
            onPress={() => handleAnswer(item)}
            disabled={showAnswer}
          >
            <Text style={styles.optionText}>{item}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      {showAnswer && (
        <Text style={styles.feedback}>
          {currentQuestion.correctAnswer === currentQuestion.options.find((o) => o === currentQuestion.correctAnswer)
            ? 'Correct!'
            : 'Incorrect!'} The correct answer is "{currentQuestion.correctAnswer}".
        </Text>
      )}
      {showAnswer && (
        <TouchableOpacity style={styles.nextButton} onPress={nextQuestion}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  question: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  option: {
    backgroundColor: '#4CAF50',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  optionText: {
    color: '#FFF',
    textAlign: 'center',
  },
  feedback: {
    fontSize: 16,
    marginTop: 20,
    textAlign: 'center',
  },
  nextButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    marginTop: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  score: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
});
