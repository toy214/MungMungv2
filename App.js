import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import MenuScreen from './MenuScreen';
import AboutScreen from './AboutScreen';
import TitleScreen from './TitleScreen';
import HomeScreen from './HomeScreen';
import LessonScreen from './LessonScreen';
import QuizScreen from './QuizScreen'; // Import QuizScreen
import { StyleSheet } from 'react-native';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Title"
        screenOptions={{
          headerStyle: styles.header,
          headerTintColor: '#FFF',
          headerTitleStyle: styles.headerTitle,
          cardStyle: { backgroundColor: '#FFF8E1' },
          ...TransitionPresets.SlideFromRightIOS, // Smooth transition between screens
        }}
      >
        <Stack.Screen
          name="Title"
          component={TitleScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Menu"
          component={MenuScreen}
          options={{
            headerTitle: 'Main Menu',
            headerStyle: [styles.header, { backgroundColor: '#FF7043' }],
          }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerTitle: 'Home',
            headerStyle: [styles.header, { backgroundColor: '#4CAF50' }],
          }}
        />
        <Stack.Screen
          name="Lesson"
          component={LessonScreen}
          options={{
            headerTitle: 'Lesson Details',
            headerStyle: [styles.header, { backgroundColor: '#FFAB40' }],
          }}
        />
        <Stack.Screen
          name="About"
          component={AboutScreen}
          options={{
            headerTitle: 'About Us',
            headerStyle: [styles.header, { backgroundColor: '#2196F3' }],
          }}
        />
        <Stack.Screen
          name="Quiz"
          component={QuizScreen} // Add QuizScreen
          options={{
            headerTitle: 'Quiz',
            headerStyle: [styles.header, { backgroundColor: '#9C27B0' }],
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#6200EE',
    shadowColor: 'transparent', // Remove header shadow
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
