import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { StatusBar } from 'react-native';

const AddPawPalScreen = () => {
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [name, setName] = useState('');
  const [sex, setSex] = useState('');
  const [breed, setBreed] = useState('');
  const [birthDate, setBirthDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleAnimalSelect = (animal) => {
    setSelectedAnimal(selectedAnimal === animal ? null : animal);
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || birthDate;
    setShowDatePicker(false);
    setBirthDate(currentDate);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.title}>Add New Pawpal</Text>
        <View style={styles.animalButtons}>
          <TouchableOpacity
            style={[styles.animalButton, selectedAnimal === 'dog' && styles.selectedButton]}
            onPress={() => handleAnimalSelect('dog')}
          >
            <Image source={require('../../assets/dog.png')} style={styles.animalImage} />
            <Text style={[styles.animalButtonText, selectedAnimal === 'dog' && styles.selectedText]}>Dog</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.animalButton, selectedAnimal === 'cat' && styles.selectedButton]}
            onPress={() => handleAnimalSelect('cat')}
          >
            <Image source={require('../../assets/cat.png')} style={styles.animalImage} />
            <Text style={[styles.animalButtonText, selectedAnimal === 'cat' && styles.selectedText]}>Cat</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Name*"
          value={name}
          onChangeText={setName}
        />
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={sex}
            onValueChange={(itemValue) => setSex(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select Sex*" value="" />
            <Picker.Item label="Male" value="male" />
            <Picker.Item label="Female" value="female" />
          </Picker>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Breed*"
          value={breed}
          onChangeText={setBreed}
        />
        <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.datePickerButton}>
          <Text style={styles.datePickerText}>{birthDate.toDateString()}</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={birthDate}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}
        <TextInput
          style={styles.input}
          placeholder="Characteristics*"
        />
        <TextInput
          style={styles.input}
          placeholder="Body Weight (0.0 kg)*"
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Medical Concerns"
        />
        <TextInput
          style={styles.input}
          placeholder="Insert Picture*"
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.cancelButton} onPress={() => {}}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.saveButton} onPress={() => {}}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollViewContent: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  animalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  animalButton: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  selectedButton: {
    backgroundColor: '#90caf9',
  },
  animalButtonText: {
    fontSize: 16,
    color: '#000',
  },
  selectedText: {
    color: '#fff',
  },
  animalImage: {
    width: 30,
    height: 30,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
  },
  picker: {
    height: 40,
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

export default AddPawPalScreen;
