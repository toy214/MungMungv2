import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Correct Picker import
import * as Speech from 'expo-speech'; // For TTS functionality

export default function SettingsScreen() {
  const [textSize, setTextSize] = useState('Medium');
  const [voiceGender, setVoiceGender] = useState('Male');

  // Voice IDs for iOS and Android
  const getVoiceId = () => {
    if (Platform.OS === 'ios') {
      return voiceGender === 'Male'
        ? 'com.apple.ttsbundle.Daniel-compact' // Male voice for iOS
        : 'com.apple.ttsbundle.Samantha-compact'; // Female voice for iOS
    } else if (Platform.OS === 'android') {
      return voiceGender === 'Male'
        ? 'en-us-x-sfg#male_1-local' // Male voice for Android
        : 'en-us-x-sfg#female_1-local'; // Female voice for Android
    }
    return null; // Fallback in case of unsupported platforms
  };

  // Test TTS with the selected voice
  const testVoice = () => {
    const voiceId = getVoiceId();
    Speech.speak('Hello! This is a test of the selected voice.', {
      voice: voiceId,
    });
  };

  // Dynamically determine text style based on size
  const dynamicTextStyle = () => {
    switch (textSize) {
      case 'Small':
        return styles.smallText;
      case 'Large':
        return styles.largeText;
      default:
        return styles.mediumText;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, dynamicTextStyle()]}>Settings</Text>
      {/* Text Size Adjustment */}
      <View style={styles.settingRow}>
        <Text style={[styles.settingLabel, dynamicTextStyle()]}>Text Size</Text>
        <Picker
          selectedValue={textSize}
          style={styles.picker}
          onValueChange={(value) => setTextSize(value)}
        >
          <Picker.Item label="Small" value="Small" />
          <Picker.Item label="Medium" value="Medium" />
          <Picker.Item label="Large" value="Large" />
        </Picker>
      </View>
      {/* Pronunciation Voice */}
      <View style={styles.settingRow}>
        <Text style={[styles.settingLabel, dynamicTextStyle()]}>Voice Gender</Text>
        <Picker
          selectedValue={voiceGender}
          style={styles.picker}
          onValueChange={(value) => setVoiceGender(value)}
        >
          <Picker.Item label="Male" value="Male" />
          <Picker.Item label="Female" value="Female" />
        </Picker>
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
    backgroundColor: '#FFF',
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 20,
  },
  settingRow: {
    marginBottom: 15,
  },
  settingLabel: {
    marginBottom: 5,
  },
  picker: {
    height: 50,
    backgroundColor: '#EFEFEF',
    borderRadius: 5,
  },
  smallText: {
    fontSize: 14,
  },
  mediumText: {
    fontSize: 18,
  },
  largeText: {
    fontSize: 22,
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
