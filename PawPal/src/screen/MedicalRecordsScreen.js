import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../supabaseClient';
import { differenceInYears } from 'date-fns';

const MedicalRecordsScreen = () => {
  const [pets, setPets] = useState([]);
  const navigation = useNavigation();
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) {
        console.error('Error fetching user:', error);
      } else {
        setUserId(user.id);
        fetchPets(user.id);
      }
    };

    const fetchPets = async (userId) => {
      const { data, error } = await supabase
        .from('pets')
        .select('*')
        .eq('user_id', userId);
      if (error) {
        console.error('Error fetching pets:', error);
      } else {
        setPets(data);
      }
    };

    fetchUser();
  }, []);

  const renderItem = ({ item }) => {
    const age = differenceInYears(new Date(), new Date(item.birth_date));
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('PetMedicalRecords', { petId: item.id })}
        style={styles.petCard}
      >
        {item.picture_url ? (
          <Image source={{ uri: item.picture_url }} style={styles.petImage} />
        ) : (
          <View style={styles.petImagePlaceholder}>
            <Text>No Image</Text>
          </View>
        )}
        <Text style={styles.petName}>{item.name}</Text>
        <Text style={styles.petBreed}>{item.breed}</Text>
        <Text style={styles.petAge}>{age} y.o.</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerButton}>
          <Image source={require('../../assets/backbutton.png')} style={styles.headerButtonIcon} />
        </TouchableOpacity>
        <Text style={styles.title}>Medical Records</Text>
      </View>
      <Text style={styles.sectionTitle}>My PawPals</Text>
      <FlatList
        data={pets}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        style={styles.petList}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  headerButton: {
    padding: 10,
  },
  headerButtonIcon: {
    width: 24,
    height: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginRight: 70,
    
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 20,
  },
  petList: {
    paddingHorizontal: 20,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  petCard: {
    width: '48%',
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  petImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 10,
  },
  petImagePlaceholder: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  petName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  petBreed: {
    fontSize: 14,
    color: '#555',
  },
  petAge: {
    fontSize: 14,
    color: '#555',
  },
});

export default MedicalRecordsScreen;
