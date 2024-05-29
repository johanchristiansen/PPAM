import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import { supabase } from '../supabaseClient';

const PetMedicalRecordsScreen = () => {
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [pet, setPet] = useState(null);
  const navigation = useNavigation();
  const route = useRoute();
  const { petId } = route.params || {}; // Default to an empty object if route.params is undefined

  console.log("PetMedicalRecordsScreen route params:", route.params); // Debugging log

  const fetchPetDetails = async () => {
    const { data, error } = await supabase
      .from('pets')
      .select('*')
      .eq('id', petId)
      .single();
    if (error) {
      console.error('Error fetching pet details:', error);
    } else {
      setPet(data);
    }
  };

  const fetchMedicalRecords = async () => {
    const { data, error } = await supabase
      .from('medical_records')
      .select('*')
      .eq('pet_id', petId)
      .order('date', { ascending: true });
    if (error) {
      console.error('Error fetching medical records:', error);
    } else {
      setMedicalRecords(data);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchPetDetails();
      fetchMedicalRecords();
    }, [petId])
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('RecordDetails', { recordId: item.id, petId })}
      style={styles.recordCard}
    >
      <Text style={styles.recordDate}>{new Date(item.date).toDateString()}</Text>
      <Text style={styles.recordTitle}>{item.title}</Text>
      <Text style={styles.recordDescription}>{item.description}</Text>
    </TouchableOpacity>
  );

  if (!pet) {
    return <Text>Loading...</Text>;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('MedicalRecords')} style={styles.headerButton}>
          <Image source={require('../../assets/backbutton.png')} style={styles.headerButtonIcon} />
        </TouchableOpacity>
        <Text style={styles.title}>Medical Records</Text>
      </View>
      <View style={styles.petInfo}>
        <Image source={{ uri: pet.picture_url }} style={styles.petImage} />
        <Text style={styles.petName}>{pet.name}</Text>
        <Text style={styles.petDetails}>
          {pet.breed}, {pet.age} y.o., {pet.weight} kg
        </Text>
      </View>
     
      <TouchableOpacity
        style={[styles.addButton, { backgroundColor: '#546e7a' }]}
        onPress={() => navigation.navigate('AddNewRecord', { petId })}
      >
        <Text style={styles.addButtonText}>Add New Record</Text>
      </TouchableOpacity>
      <FlatList
        data={medicalRecords}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.recordsList}
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
    width: 20,
    height: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginRight: 70,
  },
  petInfo: {
    alignItems: 'center',
    padding: 20,
  },
  petImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  petName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  petDetails: {
    fontSize: 16,
    color: '#555',
  },
  addButton: {
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  recordsList: {
    paddingHorizontal: 20,
  },
  recordCard: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  recordDate: {
    fontSize: 14,
    color: '#888',
  },
  recordTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  recordDescription: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
});

export default PetMedicalRecordsScreen;
