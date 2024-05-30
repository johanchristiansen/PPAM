import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Appbar, Card, Chip, Text } from 'react-native-paper';

const recipes = [
  {
    id: '1',
    title: 'Raw Beef & Chicken Neck',
    category: 'Dog Food',
    image: require('../../assets/placeholder.jpg'),
    time: '35 mins',
    servings: '12 servings',
    calories: '491 kkal',
    ingredients: [
      "900 grams 90% lean beef",
      "1360 grams chicken neck (no skin)",
      "450 grams beef liver",
      "450 grams chicken heart",
      "450 grams beef heart",
      "10 chicken eggs (no shell)",
      "225 grams kale",
      "225 grams broccoli",
      "225 grams dandelion greens",
      "340 grams mixed berries",
    ],
    directions: [
      "Grind the necks, heart and turkey liver.",
      "If you don't have a grinder, chop the liver and heart into small cubes.",
      "Puree the eggs, kale, broccoli, dandelion greens, berries, hemp seeds, green lipped mussel and salt in a food processor.",
      "Mix the ground beef, liver, heart and veggie/berry mix together.",
      "Place the mixture into smaller containers and place them in your freezer.",
      "Freeze the food in 1-3 day portions.",
      "Feed both the necks and the meat mixture together.",
      "If you don't grind the necks into the meat mixture, feed just the necks for one meal and the meat mix for the second meal.",
    ],
  },
  {
    id: '2',
    title: 'Beef & Salmon',
    category: 'Cat Food',
    image: require('../../assets/placeholder.jpg'),
    time: '10 mins',
    servings: '22 servings',
    calories: '230 kkal',
    ingredients: [
      "900 grams ground lean beef",
      "200 grams canned salmon, no salt",
      "100 grams ground raw liver",
      "1 cup water",
      "2 raw egg yolks",
      "2 tbsp edible bone meal",
      "1 tbsp gelatin",
      "400 IU alpha tocopherol Vitamin E",
    ],
    directions: [
      "Mix together in the bowl: canned salmon, ground liver, water, egg yolks, bone meal, and gelatin.",
      "Add in ground lean beef, mix well.",
      "Portion into serving sizes and freeze.",
    ],
  },
  {
    id: '3',
    title: 'Chicken & Rice',
    category: 'Dog Food',
    image: require('../../assets/placeholder.jpg'),
    time: '40 mins',
    servings: '8 servings',
    calories: '375 kkal',
    ingredients: [
      "2 cups cooked brown rice",
      "1 cup boneless, skinless chicken breast",
      "1/2 cup vegetables (carrots, peas, broccoli)",
      "1 tbsp fish oil",
      "1/4 cup cooked lentils",
    ],
    directions: [
      "Cook the rice according to the package instructions.",
      "Boil or bake the chicken breast until fully cooked, then chop into small pieces.",
      "Steam or boil the vegetables until tender.",
      "Mix all ingredients together in a large bowl.",
      "Store in the refrigerator and serve appropriate portions as needed.",
    ],
  },
  {
    id: '4',
    title: 'Tuna & Sweet Potato',
    category: 'Cat Food',
    image: require('../../assets/placeholder.jpg'),
    time: '15 mins',
    servings: '18 servings',
    calories: '290 kkal',
    ingredients: [
      "1 can tuna in water, drained",
      "1/2 cup cooked sweet potato, mashed",
      "1 tbsp fish oil",
      "1/4 cup cooked peas",
      "1/4 cup cooked carrots, mashed",
    ],
    directions: [
      "Mix all ingredients together in a bowl.",
      "Portion into serving sizes and refrigerate or freeze.",
      "Serve appropriate portions as needed.",
    ],
  },
  {
    id: '5',
    title: 'Turkey & Quinoa',
    category: 'Dog Food',
    image: require('../../assets/placeholder.jpg'),
    time: '45 mins',
    servings: '10 servings',
    calories: '410 kkal',
    ingredients: [
      "2 cups cooked quinoa",
      "1 cup ground turkey, cooked",
      "1/2 cup spinach, chopped",
      "1/4 cup grated carrots",
      "1 tbsp olive oil",
    ],
    directions: [
      "Cook the quinoa according to the package instructions.",
      "Cook the ground turkey in a pan until fully cooked.",
      "Mix all ingredients together in a large bowl.",
      "Portion into serving sizes and refrigerate or freeze.",
      "Serve appropriate portions as needed.",
    ],
  },
  {
    id: '6',
    title: 'Chicken & Pumpkin',
    category: 'Cat Food',
    image: require('../../assets/placeholder.jpg'),
    time: '20 mins',
    servings: '15 servings',
    calories: '315 kkal',
    ingredients: [
      "1 cup cooked chicken breast, shredded",
      "1/2 cup canned pumpkin (pure pumpkin, no spices)",
      "1 tbsp olive oil",
      "1/4 cup cooked peas",
      "1/4 cup cooked carrots, mashed",
    ],
    directions: [
      "Mix all ingredients together in a bowl.",
      "Portion into serving sizes and refrigerate or freeze.",
      "Serve appropriate portions as needed.",
    ],
  },
];

const RecipesScreen = () => {
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState('');

  const filteredRecipes = recipes.filter(
    (recipe) =>
      selectedCategory === '' || recipe.category === selectedCategory
  );

  const renderRecipe = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('RecipeDetails', { recipe: item })}>
      <Card style={styles.recipeCard}>
        <Card.Cover source={item.image} style={styles.recipeImage} />
        <Card.Content>
          <Text style={styles.recipeTitle}>{item.title}</Text>
          <Text style={styles.recipeCategory}>{item.category}</Text>
          <View style={styles.recipeInfo}>
            <View style={styles.infoItem}>
              <Image source={require('../../assets/clock.png')} style={styles.infoIcon} />
              <Text style={styles.infoText}>{item.time}</Text>
            </View>
            <View style={styles.infoItem}>
              <Image source={require('../../assets/servings.png')} style={styles.infoIcon} />
              <Text style={styles.infoText}>{item.servings}</Text>
            </View>
            <View style={styles.infoItem}>
              <Image source={require('../../assets/fire.png')} style={styles.infoIcon} />
              <Text style={styles.infoText}>{item.calories}</Text>
            </View>
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <Appbar.Header>
        <Appbar.Action icon={() => <Image source={require('../../assets/backbutton.png')} style={styles.icon} />} onPress={() => navigation.navigate('Home')} />
        <Appbar.Content title="Find Some Recipes" />
      </Appbar.Header>
      <View style={styles.container}>
        <View style={styles.chipContainer}>
          <Chip
            icon={() => <Image source={require('../../assets/dog.png')} style={styles.icon} />}
            selected={selectedCategory === 'Dog Food'}
            selectedColor="white"
            style={[styles.chip, selectedCategory === 'Dog Food' && styles.selectedChip]}
            onPress={() => setSelectedCategory(selectedCategory === 'Dog Food' ? '' : 'Dog Food')}
          >
            Dog
          </Chip>
          <Chip
            icon={() => <Image source={require('../../assets/cat.png')} style={styles.icon} />}
            selected={selectedCategory === 'Cat Food'}
            selectedColor="white"
            style={[styles.chip, selectedCategory === 'Cat Food' && styles.selectedChip]}
            onPress={() => setSelectedCategory(selectedCategory === 'Cat Food' ? '' : 'Cat Food')}
          >
            Cat
          </Chip>
        </View>
        <FlatList
          data={filteredRecipes}
          renderItem={renderRecipe}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.recipeList}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 10,
  },
  chipContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  chip: {
    borderWidth: 1,
    borderColor: '#ccc',
  },
  selectedChip: {
    backgroundColor: '#6200ee',
  },
  recipeList: {
    paddingBottom: 20,
  },
  recipeCard: {
    marginBottom: 10,
  },
  recipeImage: {
    height: 150,
  },
  recipeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  recipeCategory: {
    fontSize: 14,
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
    fontSize: 12,
  },
  icon: {
    width: 20,
    height: 16,
  },
});

export default RecipesScreen;
