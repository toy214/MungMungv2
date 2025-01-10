import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Updated import

export default function SettingsScreen() {
  const [language, setLanguage] = useState('English');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <View style={styles.settingRow}>
        <Text style={styles.settingLabel}>Learning Language</Text>
        <Picker
          selectedValue={language}
          style={styles.picker}
          onValueChange={(value) => setLanguage(value)}
        >
          <Picker.Item label="English" value="English" />
          <Picker.Item label="Spanish" value="Spanish" />
          <Picker.Item label="French" value="French" />
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
