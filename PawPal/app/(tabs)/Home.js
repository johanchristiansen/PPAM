import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, StatusBar, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from '../supabaseClient';
import { useFocusEffect } from '@react-navigation/native';
import { format, differenceInYears } from 'date-fns';
import { useRouter } from 'expo-router';

const HomeScreen = ({ navigation }) => {
  const router = useRouter();
  const [pets, setPets] = useState([]);
  const [username, setUsername] = useState('User');

  const fetchPets = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      setUsername(user.email.split('@')[0]);
      const { data, error } = await supabase
        .from('pets')
        .select('*')
        .eq('user_id', user.id);
      if (error) {
        console.error(error);
      } else {
        setPets(data);
      }
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchPets();
    }, [])
  );

  const navigateToAddPawPal = () => {
    router.push('AddPawPal');
  };

  const navigateToAddNewSchedule = () => {
    router.push('Schedule');
  };

  const navigateToRecipes = () => {
    router.push('Recipes');
  };

  const navigateToMedicalRecords = () => {
    router.push('MedicalRecords');
  };

  const navigateToFruitsSafe = () => {
    router.push('FruitsSafe');
  };

  const navigateToCatAge = () => {
    router.push('CatAge');
  };

  const renderItem = ({ item }) => {
    const age = differenceInYears(new Date(), new Date(item.birth_date));
    return (
      <View style={styles.pawPalCard}>
        {item.picture_url ? (
          <Image source={{ uri: item.picture_url }} style={styles.pawPalImage} />
        ) : (
          <View style={styles.pawPalImagePlaceholder}>
            <Text>No Image</Text>
          </View>
        )}
        <Text>{item.name}</Text>
        <Text>{item.breed}</Text>
        <Text>{age} y.o.</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.homeContainer}>
        <View style={styles.header} >
          <Text style={styles.greeting}>Hello, {username}!</Text>
          <TouchableOpacity onPress={() => router.push('UserProfile')}>
            <Image
              source={require('../../assets/profile.png')}
              style={styles.profileImage}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.subGreeting}>What are you looking for?</Text>
        <View style={styles.iconsContainer}>
          <TouchableOpacity style={styles.iconButton} onPress={navigateToRecipes}>
            <Image source={require('../../assets/recipes.png')} style={styles.iconImage} />
            <Text>Recipes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={navigateToAddNewSchedule}>
            <Image source={require('../../assets/schedule.png')} style={styles.iconImage} />
            <Text>Schedule</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={navigateToMedicalRecords}>
            <Image source={require('../../assets/medical.png')} style={styles.iconImage} />
            <Text>Medical</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.sectionTitle}>My PawPals</Text>
        <FlatList
          data={pets}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          ListFooterComponent={
            <TouchableOpacity style={styles.addPawPalCard} onPress={navigateToAddPawPal}>
              <Image source={require('../../assets/plus-sign.png')} style={styles.plusIcon} />
              <Text>Add New PawPal</Text>
            </TouchableOpacity>
          }
        />
        <Text style={styles.sectionTitle}>What's New?</Text>
        <View style={styles.newsContainer}>
          <TouchableOpacity style={styles.newsCard} onPress={navigateToFruitsSafe}>
            <Text style={styles.newsTitle}>Which fruits are safe for my PawPals?</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.newsCard} onPress={navigateToCatAge}>
            <Text style={styles.newsTitle}>How Old is Your Cat in People Years?</Text>
          </TouchableOpacity>
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
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  pawPalCard: {
    width: '48%',
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pawPalImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 5,
  },
  pawPalImagePlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
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
