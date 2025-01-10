import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as Speech from 'expo-speech';

export default function SettingsScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [language, setLanguage] = useState('English');
  const [voiceGender, setVoiceGender] = useState('Male');

  const toggleNotifications = () => setNotificationsEnabled(!notificationsEnabled);
  const toggleDarkMode = () => setDarkModeEnabled(!darkModeEnabled);
  const changeLanguage = () => {
    setLanguage(language === 'English' ? 'Korean' : 'English');
    Speech.speak(`Language set to ${language === 'English' ? 'Korean' : 'English'}`, {
      voice: voiceGender === 'Male' ? 'com.apple.ttsbundle.Daniel-compact' : 'com.apple.ttsbundle.Samantha-compact',
    });
  };

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
          style={styles.picker}
          onValueChange={(itemValue) => setVoiceGender(itemValue)}
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
    color: '#000', // Adjust text color
  },
});
