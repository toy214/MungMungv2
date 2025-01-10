import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { lessonsData } from './lessons';

export default function QuizScreen() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState('');

  useEffect(() => {
    generateQuizQuestions(10); // Generate 10 questions
  }, []);

  const generateQuizQuestions = (limit) => {
    const questionsArray = [];
    const validSections = [];

    // Preprocess valid sections
    Object.keys(lessonsData).forEach((lessonKey) => {
      const sections = lessonsData[lessonKey].sections;
      Object.keys(sections).forEach((sectionKey) => {
        const section = sections[sectionKey];
        if (section.korean && section.text) {
          validSections.push(section);
        }
      });
    });

    // Generate questions from valid sections
    validSections.forEach((section) => {
      section.korean.forEach((word, index) => {
        const englishText = section.text[index];
        if (isValidQuestion(word, englishText)) {
          const splitText = englishText.split('=');
          if (splitText.length > 1) {
            const correctAnswer = splitText[1].trim();
            questionsArray.push({
              type: 'koreanToEnglish',
              question: `What is the meaning of "${word}"?`,
              options: generateOptions(correctAnswer, section.text.map((t) => t.split('=')[1]?.trim())),
              correctAnswer: correctAnswer,
            });
          }
        }
      });

      section.text.forEach((text, index) => {
        const koreanWord = section.korean[index];
        if (isValidQuestion(koreanWord, text)) {
          const splitText = text.split('=');
          if (splitText.length > 1) {
            const correctAnswer = koreanWord;
            questionsArray.push({
              type: 'englishToKorean',
              question: `What is the Korean translation of "${splitText[0].trim()}"?`,
              options: generateOptions(correctAnswer, section.korean),
              correctAnswer: correctAnswer,
            });
          }
        }
      });
    });

    // Shuffle and limit the questions
    const limitedQuestions = shuffleArray(questionsArray).slice(0, limit);
    setQuestions(limitedQuestions);
  };

  const isValidQuestion = (word, text) => {
    if (!word || !text) return false; // Skip empty entries
    if (word.trim() === '' || text.trim() === '') return false; // Skip empty strings
    if (text.includes(word)) return false; // Skip embedded answers
    return true;
  };

  const generateOptions = (correctAnswer, allPossibleAnswers) => {
    const filteredAnswers = allPossibleAnswers.filter((answer) => answer && answer !== correctAnswer);
    const randomAnswers = shuffleArray(filteredAnswers).slice(0, 3);
    return shuffleArray([correctAnswer, ...randomAnswers]);
  };

  const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

  const handleAnswer = (selectedAnswer) => {
    setSelectedAnswer(selectedAnswer);
    if (selectedAnswer === questions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }
    setShowAnswer(true);
  };

  const nextQuestion = () => {
    setShowAnswer(false);
    setSelectedAnswer('');
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
          {selectedAnswer === currentQuestion.correctAnswer
            ? 'Correct!'
            : `Incorrect! The correct answer is "${currentQuestion.correctAnswer}".`}
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
