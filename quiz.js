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

          // Ensure both word and text are valid
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
          }
        });
      }
    });
  });

  // Generate options for each question
  return quizQuestions.map((question, _, allQuestions) => {
    const distractors = getDistractors(question.correctAnswer, allQuestions);
    return {
      ...question,
      options: shuffleArray([question.correctAnswer, ...distractors]),
    };
  });
}

function isValidQuestion(word, text) {
  if (!word || !text) return false;
  if (word.trim() === '' || text.trim() === '') return false;
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
