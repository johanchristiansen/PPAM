import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const FruitsSafeScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={require('../../assets/corgi1.jpg')} style={styles.image} />
        <Text style={styles.title}>Which Fruits Are Safe for My PawPals?</Text>
        <Text style={styles.content}>
          Fruits can be a healthy treat for your PawPals, providing essential vitamins and nutrients. However, not all fruits are safe for dogs and cats to consume. Here’s a guide to help you understand which fruits are beneficial and which ones to avoid.
        </Text>
        <Text style={styles.content}>
          <Text style={styles.bold}>Safe Fruits for Dogs and Cats:</Text>
        </Text>
        <Text style={styles.content}>
          1. <Text style={styles.bold}>Apples:</Text> Apples are a great source of vitamins A and C, as well as fiber. However, make sure to remove the seeds and core before giving them to your pet, as apple seeds contain cyanide.
        </Text>
        <Text style={styles.content}>
          2. <Text style={styles.bold}>Blueberries:</Text> Blueberries are rich in antioxidants, which can help support your pet’s immune system. They also provide fiber and vitamin C.
        </Text>
        <Text style={styles.content}>
          3. <Text style={styles.bold}>Bananas:</Text> Bananas are high in potassium and fiber. They make a great occasional treat, but due to their high sugar content, they should be given in moderation.
        </Text>
        <Text style={styles.content}>
          4. <Text style={styles.bold}>Watermelon:</Text> Watermelon is hydrating and contains vitamins A, B6, and C. Make sure to remove the seeds and rind before feeding it to your pet.
        </Text>
        <Text style={styles.content}>
          5. <Text style={styles.bold}>Strawberries:</Text> Strawberries are full of fiber and vitamin C. They also contain an enzyme that can help whiten your pet’s teeth. However, they are high in sugar, so they should be given sparingly.
        </Text>
        <Text style={styles.content}>
          <Text style={styles.bold}>Fruits to Avoid:</Text>
        </Text>
        <Text style={styles.content}>
          1. <Text style={styles.bold}>Grapes and Raisins:</Text> Grapes and raisins can cause kidney failure in dogs and cats. Even small amounts can be toxic, so it’s best to avoid them entirely.
        </Text>
        <Text style={styles.content}>
          2. <Text style={styles.bold}>Cherries:</Text> Cherry pits contain cyanide, which is poisonous to dogs and cats. The pits can also cause intestinal blockages. The flesh of the cherry is generally safe, but it’s best to avoid giving them to your pets to be safe.
        </Text>
        <Text style={styles.content}>
          3. <Text style={styles.bold}>Avocado:</Text> Avocados contain persin, which can cause vomiting and diarrhea in dogs and cats. The pit also poses a choking hazard and can cause intestinal blockages.
        </Text>
        <Text style={styles.content}>
          4. <Text style={styles.bold}>Citrus Fruits:</Text> Citrus fruits like oranges, lemons, and limes can cause stomach upset in dogs and cats. The citric acid can lead to vomiting and diarrhea.
        </Text>
        <Text style={styles.content}>
          5. <Text style={styles.bold}>Tomatoes:</Text> The green parts of the tomato plant contain solanine, which can be toxic to dogs and cats. Ripe tomatoes are generally safe in small amounts, but it’s best to avoid them.
        </Text>
        <Text style={styles.content}>
          <Text style={styles.bold}>Introducing Fruits to Your Pet's Diet:</Text>
        </Text>
        <Text style={styles.content}>
          Always introduce new fruits to your pet’s diet gradually and in small amounts. Monitor them for any signs of an adverse reaction, such as vomiting or diarrhea. Consult your veterinarian if you have any concerns about feeding fruits to your PawPals. Fruits should only be given as an occasional treat and not as a replacement for your pet’s regular diet.
        </Text>
        <Text style={styles.content}>
          <Text style={styles.bold}>Benefits of Feeding Fruits to Pets:</Text>
        </Text>
        <Text style={styles.content}>
          Incorporating safe fruits into your pet's diet can provide various health benefits. Fruits are often rich in essential vitamins, minerals, and antioxidants, which can support overall health, improve digestion, and boost the immune system. For example, blueberries are known for their high antioxidant content, which can help combat oxidative stress and support cognitive function in older pets.
        </Text>
        <Text style={styles.content}>
          <Text style={styles.bold}>Portion Control and Moderation:</Text>
        </Text>
        <Text style={styles.content}>
          It's crucial to practice portion control when offering fruits to your pets. Even safe fruits should be given in moderation to prevent potential digestive issues or an imbalance in their diet. Treats, including fruits, should not exceed 10% of your pet's daily caloric intake.
        </Text>
        <Text style={styles.content}>
          <Text style={styles.bold}>Tips for Serving Fruits:</Text>
        </Text>
        <Text style={styles.content}>
          When serving fruits to your pets, always wash them thoroughly to remove any pesticides or chemicals. Cut the fruits into small, bite-sized pieces to prevent choking hazards. Remove any seeds, pits, or rinds that could be harmful. You can also freeze small fruit pieces to create a refreshing and healthy treat for your pet on hot days.
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

export default FruitsSafeScreen;
