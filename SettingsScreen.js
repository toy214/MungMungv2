import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, Button, TouchableOpacity } from 'react-native';

export default function SettingsScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [language, setLanguage] = useState('English');

  const toggleNotifications = () => setNotificationsEnabled(!notificationsEnabled);
  const toggleDarkMode = () => setDarkModeEnabled(!darkModeEnabled);
  const changeLanguage = () => {
    setLanguage(language === 'English' ? 'Korean' : 'English');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      {/* Notifications */}
      <View style={styles.settingRow}>
        <Text>Enable Notifications</Text>
        <Switch value={notificationsEnabled} onValueChange={toggleNotifications} />
      </View>
      {/* Dark Mode */}
      <View style={styles.settingRow}>
        <Text>Enable Dark Mode</Text>
        <Switch value={darkModeEnabled} onValueChange={toggleDarkMode} />
      </View>
      {/* Language Preference */}
      <View style={styles.settingRow}>
        <Text>Language</Text>
        <TouchableOpacity style={styles.languageButton} onPress={changeLanguage}>
          <Text style={styles.languageText}>{language}</Text>
        </TouchableOpacity>
      </View>
      {/* Account Actions */}
      <View style={styles.accountActions}>
        <Button title="Change Password" onPress={() => alert('Change Password')} />
        <Button title="Log Out" onPress={() => alert('Logged Out')} color="#FF5722" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFF',
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
  accountActions: {
    marginTop: 30,
  },
});
