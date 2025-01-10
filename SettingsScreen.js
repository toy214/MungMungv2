import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { useAppContext } from './App';

export default function SettingsScreen() {
  const { darkMode, toggleDarkMode, themeStyles } = useAppContext();

  const containerStyle = { backgroundColor: themeStyles.backgroundColor, flex: 1, padding: 20 };
  const textStyle = { color: themeStyles.textColor };

  return (
    <View style={containerStyle}>
      <Text style={[styles.title, textStyle]}>Settings</Text>
      {/* Dark Mode Toggle */}
      <View style={styles.settingRow}>
        <Text style={textStyle}>Enable Dark Mode</Text>
        <Switch value={darkMode} onValueChange={toggleDarkMode} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
});
