import React from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Appbar, Card, Text } from 'react-native-paper';

const RecipeDetailsScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { recipe } = route.params;

  return (
    <SafeAreaView style={styles.safeArea}>
      <Appbar.Header>
        <Appbar.Action icon={() => <Image source={require('../../assets/backbutton.png')} style={styles.icon} />} onPress={() => navigation.navigate('Recipes')} />
        <Appbar.Content title={recipe.title} />
      </Appbar.Header>
      <ScrollView contentContainerStyle={styles.container}>
        <Card style={styles.recipeCard}>
          <Card.Cover source={recipe.image} style={styles.recipeImage} />
          <Card.Content>
            <Text style={styles.recipeTitle}>{recipe.title}</Text>
            <Text style={styles.recipeCategory}>{recipe.category}</Text>
            <View style={styles.recipeInfo}>
              <View style={styles.infoItem}>
                <Image source={require('../../assets/clock.png')} style={styles.infoIcon} />
                <Text style={styles.infoText}>{recipe.time}</Text>
              </View>
              <View style={styles.infoItem}>
                <Image source={require('../../assets/servings.png')} style={styles.infoIcon} />
                <Text style={styles.infoText}>{recipe.servings}</Text>
              </View>
              <View style={styles.infoItem}>
                <Image source={require('../../assets/fire.png')} style={styles.infoIcon} />
                <Text style={styles.infoText}>{recipe.calories}</Text>
              </View>
            </View>
            <Text style={styles.sectionTitle}>Ingredients</Text>
            {recipe.ingredients.map((ingredient, index) => (
              <Text key={index} style={styles.ingredient}>{ingredient}</Text>
            ))}
            <Text style={styles.sectionTitle}>Directions</Text>
            {recipe.directions.map((direction, index) => (
              <Text key={index} style={styles.direction}>{direction}</Text>
            ))}
          </Card.Content>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    padding: 10,
  },
  recipeCard: {
    marginBottom: 10,
  },
  recipeImage: {
    height: 200,
  },
  recipeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 5,
  },
  recipeCategory: {
    fontSize: 18,
    color: '#555',
  },
  recipeInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoIcon: {
    width: 16,
    height: 16,
    marginRight: 5,
  },
  infoText: {
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
  },
  ingredient: {
    fontSize: 16,
    marginBottom: 5,
  },
  direction: {
    fontSize: 16,
    marginBottom: 10,
  },
  icon: {
    width: 24,
    height: 24,
  },
});

export default RecipeDetailsScreen;
