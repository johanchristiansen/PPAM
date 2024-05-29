import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { supabase } from '../supabaseClient';

const RecordDetailsScreen = () => {
  const [record, setRecord] = useState(null);
  const navigation = useNavigation();
  const route = useRoute();
  const { recordId, petId } = route.params;

  useEffect(() => {
    const fetchRecordDetails = async () => {
      const { data, error } = await supabase
        .from('medical_records')
        .select('*')
        .eq('id', recordId)
        .single();
      if (error) {
        console.error('Error fetching record details:', error);
      } else {
        setRecord(data);
      }
    };

    fetchRecordDetails();
  }, [recordId]);

  if (!record) {
    return <Text>Loading...</Text>;
  }

  const renderMedications = () => {
    if (!record.medication || !Array.isArray(record.medication) || record.medication.length === 0) {
      return <Text>None</Text>;
    }

    const medications = record.medication.map((med, index) => (
      <Text key={index} style={styles.medicationItem}>
        {index + 1}. {med.trim()}
      </Text>
    ));
    
    return medications;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('PetMedicalRecords', { petId })} style={styles.headerButton}>
          <Image source={require('../../assets/backbutton.png')} style={styles.headerButtonIcon} />
        </TouchableOpacity>
        <Text style={styles.title}>Record Details</Text>
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.recordTitle}>{record.title}</Text>
        <Text style={styles.recordDate}>On {new Date(record.date).toDateString()}</Text>
        <Text style={styles.sectionTitle}>Descriptions</Text>
        <Text style={styles.recordDescription}>{record.description}</Text>
        <Text style={styles.sectionTitle}>Medication</Text>
        <View>{renderMedications()}</View>
      </ScrollView>
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
    marginRight: 90,
  },
  container: {
    padding: 20,
  },
  recordTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  recordDate: {
    fontSize: 16,
    color: '#888',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  recordDescription: {
    fontSize: 16,
    marginBottom: 20,
  },
  medicationItem: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default RecordDetailsScreen;
