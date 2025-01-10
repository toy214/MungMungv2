import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Speech from 'expo-speech';

export default function SettingsScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [language, setLanguage] = useState('English');
  const [voiceGender, setVoiceGender] = useState('Male');
  const [loading, setLoading] = useState(true);

  // Load settings from AsyncStorage on mount
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const savedNotifications = await AsyncStorage.getItem('notificationsEnabled');
        const savedDarkMode = await AsyncStorage.getItem('darkModeEnabled');
        const savedLanguage = await AsyncStorage.getItem('language');
        const savedVoiceGender = await AsyncStorage.getItem('voiceGender');

        if (savedNotifications !== null) setNotificationsEnabled(JSON.parse(savedNotifications));
        if (savedDarkMode !== null) setDarkModeEnabled(JSON.parse(savedDarkMode));
        if (savedLanguage !== null) setLanguage(savedLanguage);
        if (savedVoiceGender !== null) setVoiceGender(savedVoiceGender);

        setLoading(false);
      } catch (error) {
        console.error('Failed to load settings', error);
        setLoading(false);
      }
    };

    loadSettings();
  }, []);

  // Save settings to AsyncStorage
  const saveSetting = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Failed to save ${key}`, error);
    }
  };

  const toggleNotifications = () => {
    const newValue = !notificationsEnabled;
    setNotificationsEnabled(newValue);
    saveSetting('notificationsEnabled', newValue);
  };

  const toggleDarkMode = () => {
    const newValue = !darkModeEnabled;
    setDarkModeEnabled(newValue);
    saveSetting('darkModeEnabled', newValue);
  };

  const changeLanguage = () => {
    const newLanguage = language === 'English' ? 'Korean' : 'English';
    setLanguage(newLanguage);
    saveSetting('language', newLanguage);
    Speech.speak(`Language set to ${newLanguage}`, {
      voice: voiceGender === 'Male' ? 'com.apple.ttsbundle.Daniel-compact' : 'com.apple.ttsbundle.Samantha-compact',
    });
  };

  const changeVoiceGender = (newGender) => {
    setVoiceGender(newGender);
    saveSetting('voiceGender', newGender);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  const containerStyle = darkModeEnabled
    ? [styles.container, { backgroundColor: '#333' }]
    : [styles.container, { backgroundColor: '#FFF' }];

  const textStyle = darkModeEnabled
    ? { color: '#FFF' }
    : { color: '#000' };

  return (
    <View style={containerStyle}>
      <Text style={[styles.title, textStyle]}>Settings</Text>
      {/* Notifications */}
      <View style={styles.settingRow}>
        <Text style={textStyle}>Enable Notifications</Text>
        <Switch value={notificationsEnabled} onValueChange={toggleNotifications} />
      </View>
      {/* Dark Mode */}
      <View style={styles.settingRow}>
        <Text style={textStyle}>Enable Dark Mode</Text>
        <Switch value={darkModeEnabled} onValueChange={toggleDarkMode} />
      </View>
      {/* Language Preference */}
      <View style={styles.settingRow}>
        <Text style={textStyle}>Language</Text>
        <TouchableOpacity style={styles.languageButton} onPress={changeLanguage}>
          <Text style={styles.languageText}>{language}</Text>
        </TouchableOpacity>
      </View>
      {/* Voice Gender Preference */}
      <View style={styles.settingRow}>
        <Text style={textStyle}>Voice Gender</Text>
        <Picker
          selectedValue={voiceGender}
          style={[styles.picker, textStyle]}
          onValueChange={changeVoiceGender}
        >
          <Picker.Item label="Male" value="Male" />
          <Picker.Item label="Female" value="Female" />
        </Picker>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  languageButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  languageText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  picker: {
    height: 50,
    flex: 1,
    color: '#000',
  },
});
