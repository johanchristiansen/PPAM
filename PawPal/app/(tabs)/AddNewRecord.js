import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import { supabase } from '../supabaseClient';
import { useNavigation } from '@react-navigation/native';

const AddNewRecordScreen = ({ route }) => {
  const { petId } = route.params;
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date());
  const [description, setDescription] = useState('');
  const [medication, setMedication] = useState(['']);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const navigation = useNavigation();

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const handleAddMedication = () => {
    setMedication([...medication, '']);
  };

  const handleMedicationChange = (index, value) => {
    const updatedMedication = medication.map((item, i) => (i === index ? value : item));
    setMedication(updatedMedication);
  };

  const handleSubmit = async () => {
    if (!title || !description) {
      Alert.alert('Error', 'Please fill in all required fields.');
      return;
    }

    const recordData = {
      pet_id: petId,
      title,
      date: date.toISOString(),
      description,
      medication,
    };

    try {
      const { data, error } = await supabase
        .from('medical_records')
        .insert([recordData]);

      if (error) {
        console.error('Error inserting record:', error);
        Alert.alert('Error', error.message || 'An error occurred while inserting the record.');
      } else {
        Alert.alert('Success', 'Record added successfully');
        navigation.navigate('PetMedicalRecords', { petId });
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      Alert.alert('Error', 'An unexpected error occurred');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerButton}>
          <Image source={require('../../assets/backbutton.png')} style={styles.headerButtonIcon} />
        </TouchableOpacity>
        <Text style={styles.title}>Add New Record</Text>
      </View>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Title*"
          value={title}
          onChangeText={setTitle}
        />
        <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.datePickerButton}>
          <Text style={styles.datePickerText}>{date.toDateString()}</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}
        <TextInput
          style={styles.input}
          placeholder="Description*"
          value={description}
          onChangeText={setDescription}
        />
        <Text style={styles.sectionTitle}>Medication</Text>
        {medication.map((med, index) => (
          <TextInput
            key={index}
            style={styles.input}
            placeholder={`Medication ${index + 1}`}
            value={med}
            onChangeText={(value) => handleMedicationChange(index, value)}
          />
        ))}
        <TouchableOpacity onPress={handleAddMedication} style={styles.addButton}>
          <Text style={styles.addButtonText}>Add New Row</Text>
        </TouchableOpacity>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Save</Text>
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
  container: {
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  datePickerButton: {
    height: 40,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  datePickerText: {
    fontSize: 16,
    color: '#000',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#546e7a',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    backgroundColor: '#b0bec5',
    padding: 10,
    flex: 1,
    alignItems: 'center',
    marginRight: 5,
  },
  saveButton: {
    backgroundColor: '#546e7a',
    padding: 10,
    flex: 1,
    alignItems: 'center',
    marginLeft: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default AddNewRecordScreen;
