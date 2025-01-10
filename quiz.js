import { lessonsData } from './lessons';

export const quizData = generateQuizData(lessonsData);

function generateQuizData(lessons) {
  const quizQuestions = [];

  Object.keys(lessons).forEach((lessonKey) => {
    const sections = lessons[lessonKey].sections;

    Object.keys(sections).forEach((sectionKey) => {
      const section = sections[sectionKey];

      if (section.korean && section.text) {
        section.korean.forEach((word, index) => {
          const text = section.text[index];

          if (!word || !text) {
            console.log(`Skipping invalid entry in section "${sectionKey}":`, { word, text });
            return; // Skip invalid entries
          }

          if (isValidQuestion(word, text)) {
            const splitText = text.split('=');
            if (splitText.length > 1) {
              const question = {
                question: `What is the meaning of "${word.trim()}"?`,
                correctAnswer: splitText[1].trim(),
                options: [],
              };
              quizQuestions.push(question);
            }
          } else {
            console.log(`Skipped question due to validation:`, { word, text });
          }
        });
      } else {
        console.log(`Skipping section "${sectionKey}" with no valid korean or text.`);
      }
    });
  });

  if (quizQuestions.length === 0) {
    console.log('No valid questions found. Falling back to default questions.');
    return generateFallbackData();
  }

  return quizQuestions.map((question, _, allQuestions) => {
    const distractors = getDistractors(question.correctAnswer, allQuestions);
    return {
      ...question,
      options: shuffleArray([question.correctAnswer, ...distractors]),
    };
  });
}

function isValidQuestion(word, text) {
  if (!word || !text) return false; // Skip empty or missing entries
  if (word.trim() === '' || text.trim() === '') return false; // Skip empty strings
  if (text.includes(word)) return false; // Skip embedded answers
  return true;
}

function getDistractors(correctAnswer, allQuestions) {
  const allAnswers = allQuestions.map((q) => q.correctAnswer);
  const filteredAnswers = allAnswers.filter((answer) => answer !== correctAnswer);
  return shuffleArray(filteredAnswers).slice(0, 3); // Select 3 random distractors
}

function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

function generateFallbackData() {
  return [
    {
      question: 'What is the meaning of "안녕하세요"?',
      correctAnswer: 'Hello',
      options: shuffleArray(['Hello', 'Goodbye', 'Thank you', 'Excuse me']),
    },
    {
      question: 'What is the meaning of "감사합니다"?',
      correctAnswer: 'Thank you',
      options: shuffleArray(['Thank you', 'Hello', 'Goodbye', 'Excuse me']),
    },
  ];
}
