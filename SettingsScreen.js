import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Correct Picker import

export default function SettingsScreen() {
  const [textSize, setTextSize] = useState('Medium');
  const [voiceGender, setVoiceGender] = useState('Male');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      {/* Text Size Adjustment */}
      <View style={styles.settingRow}>
        <Text style={styles.settingLabel}>Text Size</Text>
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
        <Text style={styles.settingLabel}>Voice Gender</Text>
        <Picker
          selectedValue={voiceGender}
          style={styles.picker}
          onValueChange={(value) => setVoiceGender(value)}
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
    backgroundColor: '#FFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  settingRow: {
    marginBottom: 15,
  },
  settingLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
  picker: {
    height: 50,
    backgroundColor: '#EFEFEF',
    borderRadius: 5,
  },
});
