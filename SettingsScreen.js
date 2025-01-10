import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useAppContext } from './App';

export default function SettingsScreen() {
  const { darkMode, toggleDarkMode, voiceGender, changeVoiceGender } = useAppContext();

  const containerStyle = darkMode
    ? [styles.container, { backgroundColor: '#333' }]
    : [styles.container, { backgroundColor: '#FFF' }];

  const textStyle = darkMode
    ? { color: '#FFF' }
    : { color: '#000' };

  return (
    <View style={containerStyle}>
      <Text style={[styles.title, textStyle]}>Settings</Text>
      {/* Dark Mode Toggle */}
      <View style={styles.settingRow}>
        <Text style={textStyle}>Enable Dark Mode</Text>
        <Switch value={darkMode} onValueChange={toggleDarkMode} />
      </View>
      {/* Voice Gender Picker */}
      <View style={styles.settingRow}>
        <Text style={textStyle}>Voice Gender</Text>
        <Picker
          selectedValue={voiceGender}
          style={styles.picker}
          onValueChange={(value) => changeVoiceGender(value)}
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
  picker: {
    height: 50,
    flex: 1,
  },
});
