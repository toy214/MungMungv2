import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker'; // Install with npm/yarn
import { useAppContext } from './AppContext';
import * as Speech from 'expo-speech';

export default function SettingsScreen() {
  const { textSize, setTextSize, voiceGender, setVoiceGender, dynamicTextStyle } = useAppContext();

  const testVoice = () => {
    const voiceId =
      voiceGender === 'Male' ? 'en-us-x-sfg#male_1-local' : 'en-us-x-sfg#female_1-local';
    Speech.speak('Hello! This is a test of the selected voice.', { voice: voiceId });
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, dynamicTextStyle()]}>Settings</Text>
      {/* Text Size Adjustment */}
      <View style={styles.settingRow}>
        <Text style={[styles.label, dynamicTextStyle()]}>Text Size</Text>
        <DropDownPicker
          items={[
            { label: 'Small', value: 'Small' },
            { label: 'Medium', value: 'Medium' },
            { label: 'Large', value: 'Large' },
          ]}
          defaultValue={textSize}
          containerStyle={styles.dropdown}
          onChangeItem={(item) => setTextSize(item.value)}
        />
      </View>
      {/* Pronunciation Voice */}
      <View style={styles.settingRow}>
        <Text style={[styles.label, dynamicTextStyle()]}>Voice Gender</Text>
        <DropDownPicker
          items={[
            { label: 'Male', value: 'Male' },
            { label: 'Female', value: 'Female' },
          ]}
          defaultValue={voiceGender}
          containerStyle={styles.dropdown}
          onChangeItem={(item) => setVoiceGender(item.value)}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={testVoice}>
        <Text style={styles.buttonText}>Test Voice</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 20,
  },
  settingRow: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 10,
  },
  dropdown: {
    height: 40,
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
