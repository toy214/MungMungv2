import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useAppContext } from './AppContext';
import * as Speech from 'expo-speech';

export default function SettingsScreen() {
  const { textSize, setTextSize, voiceGender, setVoiceGender, dynamicTextStyle } = useAppContext();

  // State for dropdown open/close behavior
  const [textSizeOpen, setTextSizeOpen] = useState(false);
  const [voiceGenderOpen, setVoiceGenderOpen] = useState(false);

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
          open={textSizeOpen}
          setOpen={setTextSizeOpen}
          value={textSize}
          setValue={setTextSize}
          items={[
            { label: 'Small', value: 'Small' },
            { label: 'Medium', value: 'Medium' },
            { label: 'Large', value: 'Large' },
          ]}
          style={styles.dropdown}
          containerStyle={styles.dropdownContainer}
          dropDownContainerStyle={styles.dropdownContainer}
        />
      </View>

      {/* Voice Gender Selection */}
      <View style={styles.settingRow}>
        <Text style={[styles.label, dynamicTextStyle()]}>Voice Gender</Text>
        <DropDownPicker
          open={voiceGenderOpen}
          setOpen={setVoiceGenderOpen}
          value={voiceGender}
          setValue={setVoiceGender}
          items={[
            { label: 'Male', value: 'Male' },
            { label: 'Female', value: 'Female' },
          ]}
          style={styles.dropdown}
          containerStyle={styles.dropdownContainer}
          dropDownContainerStyle={styles.dropdownContainer}
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
    backgroundColor: '#EFEFEF',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#CCC',
  },
  dropdownContainer: {
    height: 40,
    marginBottom: 20,
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
