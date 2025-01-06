import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

export default function AboutScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image 
        source={{ uri: 'https://your-app-logo-link.com/logo.png' }} 
        style={styles.logo} 
        resizeMode="contain" 
      />
      <Text style={styles.title}>Welcome to MungMung!</Text>
      <Text style={styles.subtitle}>Learn Korean Language & Culture</Text>
      <Text style={styles.description}>
        MungMung is your friendly companion on the journey to mastering the Korean language.
        Whether you're a beginner or an advanced learner, our interactive lessons, quizzes,
        and fun activities are designed to make learning Korean enjoyable and effective.
      </Text>
      <Text style={styles.sectionTitle}>Features:</Text>
      <Text style={styles.bulletPoint}>• Interactive lessons covering essential topics like greetings, numbers, food, and travel.</Text>
      <Text style={styles.bulletPoint}>• Fun quizzes to test and improve your knowledge.</Text>
      <Text style={styles.bulletPoint}>• Cultural insights to help you understand Korean traditions and customs.</Text>
      <Text style={styles.bulletPoint}>• Audio pronunciation to perfect your accent.</Text>
      <Text style={styles.bulletPoint}>• Learn at your own pace, anytime, anywhere!</Text>
      <Text style={styles.sectionTitle}>Why Choose MungMung?</Text>
      <Text style={styles.description}>
        We understand that learning a new language can be challenging, so we make it fun! 
        With an engaging design and personalized learning experience, MungMung is your best 
        companion for embracing Korean culture and language.
      </Text>
      <Text style={styles.sectionTitle}>Our Mission:</Text>
      <Text style={styles.description}>
        Our mission is to connect people to the beauty of Korean culture and language 
        in an enjoyable and meaningful way. Join thousands of learners who are discovering 
        the magic of Korea with MungMung!
      </Text>
      <Text style={styles.footer}>
        Thank you for choosing MungMung! Let's embark on this exciting journey together.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#FFF8E1',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#4CAF50',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
    color: '#555',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 15,
    color: '#333',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#FF7043',
  },
  bulletPoint: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 8,
    textAlign: 'left',
    alignSelf: 'flex-start',
    paddingLeft: 20,
    color: '#444',
  },
  footer: {
    fontSize: 14,
    lineHeight: 20,
    marginTop: 20,
    textAlign: 'center',
    color: '#777',
  },
});
