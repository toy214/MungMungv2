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

// Create Context
const AppContext = createContext();

// Context Provider
function AppProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);

  // Load settings from AsyncStorage
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const savedDarkMode = await AsyncStorage.getItem('darkMode');
        if (savedDarkMode !== null) setDarkMode(JSON.parse(savedDarkMode));
      } catch (error) {
        console.error('Failed to load dark mode setting', error);
      }
    };

    loadSettings();
  }, []);

  // Save dark mode to AsyncStorage
  const toggleDarkMode = async () => {
    const newValue = !darkMode;
    setDarkMode(newValue);
    try {
      await AsyncStorage.setItem('darkMode', JSON.stringify(newValue));
    } catch (error) {
      console.error('Failed to save dark mode setting', error);
    }
  };

  // Global theme styles
  const themeStyles = darkMode
    ? {
        backgroundColor: '#121212',
        textColor: '#FFFFFF',
        cardColor: '#1E1E1E',
        headerColor: '#333333',
      }
    : {
        backgroundColor: '#FFFFFF',
        textColor: '#000000',
        cardColor: '#FFF8E1',
        headerColor: '#6200EE',
      };

  return (
    <AppContext.Provider value={{ darkMode, toggleDarkMode, themeStyles }}>
      {children}
    </AppContext.Provider>
  );
}

// Custom Hook to Access Context
export function useAppContext() {
  return useContext(AppContext);
}

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Title"
          screenOptions={({ route }) => ({
            headerStyle: { backgroundColor: useAppContext().themeStyles.headerColor },
            headerTintColor: useAppContext().themeStyles.textColor,
            cardStyle: { backgroundColor: useAppContext().themeStyles.cardColor },
            headerTitleStyle: {
              fontSize: 20,
              fontWeight: 'bold',
              color: useAppContext().themeStyles.textColor,
            },
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
            }}
          />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              headerTitle: 'Home',
            }}
          />
          <Stack.Screen
            name="Lesson"
            component={LessonScreen}
            options={{
              headerTitle: 'Lesson Details',
            }}
          />
          <Stack.Screen
            name="About"
            component={AboutScreen}
            options={{
              headerTitle: 'About Us',
            }}
          />
          <Stack.Screen
            name="Settings"
            component={SettingsScreen}
            options={{
              headerTitle: 'Settings',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}
