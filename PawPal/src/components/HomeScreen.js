import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {
  const navigateToAddPawPal = () => {
    navigation.navigate('AddPawPal');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.homeContainer}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Hello, User!</Text>
          <Image
            source={require('../../assets/profile.png')}
            style={styles.profileImage}
          />
        </View>
        <Text style={styles.subGreeting}>What are you looking for?</Text>
        <View style={styles.iconsContainer}>
          <TouchableOpacity style={styles.iconButton}>
            <Image source={require('../../assets/recipes.png')} style={styles.iconImage} />
            <Text>Recipes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Image source={require('../../assets/schedule.png')} style={styles.iconImage} />
            <Text>Schedule</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Image source={require('../../assets/medical.png')} style={styles.iconImage} />
            <Text>Medical</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.sectionTitle}>My PawPals</Text>
        <View style={styles.pawPalContainer}>
          <TouchableOpacity style={styles.addPawPalCard} onPress={navigateToAddPawPal}>
            <Image source={require('../../assets/plus-sign.png')} style={styles.plusIcon} />
            <Text>Add New PawPal</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.sectionTitle}>What's New?</Text>
        <View style={styles.newsContainer}>
          <View style={styles.newsCard}>
            <Text style={styles.newsTitle}>Which fruits are safe for my PawPals?</Text>
          </View>
          <View style={styles.newsCard}>
            <Text style={styles.newsTitle}>How Old is Your Cat in People Years?</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  homeContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  subGreeting: {
    fontSize: 18,
    marginBottom: 20,
  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  iconButton: {
    alignItems: 'center',
  },
  iconImage: {
    width: 50,
    height: 50,
    marginBottom: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  pawPalContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  addPawPalCard: {
    width: '48%',
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  plusIcon: {
    width: 30,
    height: 30,
    marginBottom: 5,
  },
  newsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  newsCard: {
    width: '48%',
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
