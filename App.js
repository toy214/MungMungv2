import React, { createContext, useState, useEffect, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MenuScreen from './MenuScreen';
import AboutScreen from './AboutScreen';
import SettingsScreen from './SettingsScreen';
import TitleScreen from './TitleScreen';
import HomeScreen from './HomeScreen';
import LessonScreen from './LessonScreen';

const Stack = createStackNavigator();

// Create App Context
const AppContext = createContext();

// Global Context Provider
function AppProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);
  const [voiceGender, setVoiceGender] = useState('Male');

  // Load saved settings on app load
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const savedDarkMode = await AsyncStorage.getItem('darkMode');
        const savedVoiceGender = await AsyncStorage.getItem('voiceGender');

        if (savedDarkMode !== null) setDarkMode(JSON.parse(savedDarkMode));
        if (savedVoiceGender !== null) setVoiceGender(savedVoiceGender);
      } catch (error) {
        console.error('Error loading settings', error);
      }
    };

    loadSettings();
  }, []);

  // Save settings to AsyncStorage
  const saveSetting = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error saving ${key}`, error);
    }
  };

  const toggleDarkMode = () => {
    const newValue = !darkMode;
    setDarkMode(newValue);
    saveSetting('darkMode', newValue);
  };

  const changeVoiceGender = (gender) => {
    setVoiceGender(gender);
    saveSetting('voiceGender', gender);
  };

  return (
    <AppContext.Provider value={{ darkMode, toggleDarkMode, voiceGender, changeVoiceGender }}>
      {children}
    </AppContext.Provider>
  );
}

// Use Context in Screens
export function useAppContext() {
  return useContext(AppContext);
}

// Main App Component
export default function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Title"
          screenOptions={({ route }) => ({
            headerStyle: styles.header,
            headerTintColor: '#FFF',
            headerTitleStyle: styles.headerTitle,
            cardStyle: { backgroundColor: '#FFF8E1' },
            ...(route.name === 'Settings' && { headerStyle: { backgroundColor: '#9C27B0' } }),
            ...TransitionPresets.SlideFromRightIOS,
          })}
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
            name="Settings"
            component={SettingsScreen}
            options={{
              headerTitle: 'Settings',
              headerStyle: [styles.header, { backgroundColor: '#9C27B0' }],
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
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
