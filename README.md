# **MungMung App**

MungMung is an interactive mobile application designed to teach the Korean language and culture. With structured lessons, quizzes, and text-to-speech functionality, MungMung makes learning Korean fun and accessible to everyone.

---

## **Features**
- **Interactive Lessons**:
  - Topics include Hangul alphabet, greetings, numbers, colors, family terms, and more.
  - Each lesson features Korean phrases, Romanization, and English translations.
  - Text-to-speech pronunciation to practice speaking Korean.

- **Quizzes**:
  - Multiple-choice questions to reinforce learning.
  - Feedback provided for each answer, including the correct answer when incorrect.

- **User-Friendly Navigation**:
  - Organized screens for lessons, quizzes, and additional resources.
  - Vibrant colors and smooth transitions enhance user engagement.

- **About Section**:
  - Insights into the app’s mission and features.
  - Encouragement to learn Korean culture alongside the language.

---

## **Screens Overview**
### **1. Title Screen**
- Welcomes the user to the app with a warm introduction.
- Button to navigate to the main menu.

### **2. Menu Screen**
- Displays the main navigation menu:
  - **Start Learning**: Opens the lesson selection (`HomeScreen`).
  - **About**: Provides an overview of the app and its mission.
  - **Quiz**: Takes the user to the quiz section.

### **3. Home Screen**
- Lists available lessons with titles and descriptions.
- Lessons include topics like:
  - Hangul Alphabet
  - Greetings
  - Numbers
  - Colors
  - Family Terms
  - Travel Phrases
- Clicking a lesson navigates to the `LessonScreen`.

### **4. Lesson Screen**
- Displays lesson content divided into sections.
- Features:
  - Navigation between sections.
  - Text-to-speech functionality for Korean phrases.
  - Reset option to choose a different section.

### **5. Quiz Screen**
- Presents multiple-choice quizzes based on lesson topics.
- Features:
  - Instant feedback for selected answers.
  - Displays the correct answer when a user selects incorrectly.
  - Final score at the end of the quiz.

### **6. About Screen**
- Describes the app’s mission and features.
- Highlights:
  - Interactive lessons
  - Fun quizzes
  - Cultural insights
  - Audio pronunciation for better learning

---

## **File Structure**
- **`App.js`**:
  - Main entry point for the app.
  - Configures stack navigation with routes for all screens.

- **`TitleScreen.js`**:
  - Initial welcome screen for the app.

- **`MenuScreen.js`**:
  - Displays navigation options for lessons, about section, and quizzes.

- **`HomeScreen.js`**:
  - Lists lessons for selection.

- **`LessonScreen.js`**:
  - Displays lesson content dynamically based on the selected lesson.

- **`QuizScreen.js`**:
  - Handles quiz questions, feedback, and scoring.

- **`AboutScreen.js`**:
  - Provides an overview of the app’s purpose and features.

- **`lessons.js`**:
  - Contains structured data for all lessons.

- **`quiz.js`**:
  - Stores questions, options, and correct answers for quizzes.

---

## **Technologies Used**
- **React Native**: Cross-platform mobile app development.
- **Expo**: Simplified development and deployment.
- **React Navigation**: Smooth navigation between screens.
- **Expo Speech API**: Enables text-to-speech pronunciation.

---

## **Installation**
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/mungmung-app.git
   cd mungmung-app
