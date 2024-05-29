import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const CatAgeScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={require('../../assets/cat1.jpg')} style={styles.image} />
        <Text style={styles.title}>How Old is Your Cat in People Years?</Text>
        <Text style={styles.content}>
          Understanding your cat’s age in human years can help you take better care of them. Cats age differently than humans, and their needs change as they grow older. Here’s a guide to help you understand your cat’s age in human years and what you can do to keep them healthy at every stage of life.
        </Text>
        <Text style={styles.content}>
          <Text style={styles.bold}>Kittenhood (0-6 months):</Text>
        </Text>
        <Text style={styles.content}>
          In this stage, kittens grow rapidly and are equivalent to a human baby or toddler. They are playful and curious, and it’s essential to provide them with a safe environment to explore. Regular vet check-ups, vaccinations, and proper nutrition are crucial during this period. At around 6 months, a kitten is approximately 10 human years old.
        </Text>
        <Text style={styles.content}>
          <Text style={styles.bold}>Junior (7 months-2 years):</Text>
        </Text>
        <Text style={styles.content}>
          By the time your cat reaches 1 year old, they are equivalent to a 15-year-old human. At 2 years old, they are similar to a young adult in their early twenties. During this time, continue regular vet visits and ensure they have a balanced diet and plenty of playtime to support their growth and development.
        </Text>
        <Text style={styles.content}>
          <Text style={styles.bold}>Prime (3-6 years):</Text>
        </Text>
        <Text style={styles.content}>
          During this stage, cats are in the prime of their life, equivalent to a human in their late twenties to early forties. They are typically healthy and active, but it’s essential to maintain regular vet check-ups and monitor their diet to prevent obesity and other health issues. A 3-year-old cat is about 28 human years old, and a 6-year-old cat is around 40 human years old.
        </Text>
        <Text style={styles.content}>
          <Text style={styles.bold}>Mature (7-10 years):</Text>
        </Text>
        <Text style={styles.content}>
          Cats in this age range are considered mature adults, equivalent to humans in their mid-forties to mid-fifties. It's essential to watch for signs of aging and adjust their care as needed. Regular veterinary care becomes even more important to catch any potential health issues early. A 10-year-old cat is roughly 56 human years old.
        </Text>
        <Text style={styles.content}>
          <Text style={styles.bold}>Senior (11-14 years):</Text>
        </Text>
        <Text style={styles.content}>
          Senior cats are similar to humans in their sixties and seventies. They may start to show signs of aging, such as decreased mobility, changes in appetite, and more frequent health issues. Providing a comfortable and enriched environment, along with regular veterinary care, can help manage these changes and maintain their quality of life. A 14-year-old cat is about 72 human years old.
        </Text>
        <Text style={styles.content}>
          <Text style={styles.bold}>Geriatric (15+ years):</Text>
        </Text>
        <Text style={styles.content}>
          Geriatric cats are equivalent to humans aged 76 years and older. At this stage, your cat will need special attention to their health and comfort. They may have chronic health issues that require ongoing management, such as arthritis, kidney disease, or dental problems. Regular vet visits, a balanced diet tailored to their specific needs, and a comfortable living environment are crucial for their well-being.
        </Text>
        <Text style={styles.content}>
          Understanding your cat’s age in human years can help you provide the best care throughout their life. Regular vet visits, a nutritious diet, and plenty of love and attention can help ensure your cat lives a long, healthy, and happy life.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    padding: 20,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  content: {
    fontSize: 16,
    marginBottom: 10,
    lineHeight: 22,
  },
  bold: {
    fontWeight: 'bold',
  },
});

export default CatAgeScreen;
