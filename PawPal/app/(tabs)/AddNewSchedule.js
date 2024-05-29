import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { supabase } from '../supabaseClient';
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AddNewSchedule = () => {
  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [startDateTime, setStartDateTime] = useState(new Date());
  const [endDateTime, setEndDateTime] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);
  const [applyFor, setApplyFor] = useState('');
  const [repeat, setRepeat] = useState('');
  const [alert, setAlert] = useState('');
  const [userId, setUserId] = useState(null);
  const [pets, setPets] = useState([]);

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

  const handleStartDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || startDateTime;
    setShowStartDatePicker(false);
    setStartDateTime(currentDate);
  };

  const handleStartTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || startDateTime;
    setShowStartTimePicker(false);
    setStartDateTime(currentTime);
  };

  const handleEndDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || endDateTime;
    setShowEndDatePicker(false);
    setEndDateTime(currentDate);
  };

  const handleEndTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || endDateTime;
    setShowEndTimePicker(false);
    setEndDateTime(currentTime);
  };

  const handleSubmit = async () => {
    if (!userId) {
      Alert.alert('Error', 'No user ID available');
      return;
    }

    if (!title || !category || !applyFor) {
      Alert.alert('Error', 'Please fill in all required fields.');
      return;
    }

    if (endDateTime <= startDateTime) {
      Alert.alert('Error', 'End time must be after start time.');
      return;
    }

    // Convert to local timezone string
    const startTimeISO = new Date(startDateTime.getTime() - (startDateTime.getTimezoneOffset() * 60000)).toISOString();
    const endTimeISO = new Date(endDateTime.getTime() - (endDateTime.getTimezoneOffset() * 60000)).toISOString();

    const scheduleData = {
      uid: userId,
      title,
      description,
      category,
      start_time: startTimeISO,
      end_time: endTimeISO,
      apply_for: applyFor,
      repeat,
      alert,
    };

    console.log('Schedule Data:', scheduleData);

    try {
      const { data, error } = await supabase
        .from('schedule')
        .insert([scheduleData]);

      if (error) {
        console.error('Error inserting schedule:', error);
        Alert.alert('Error', error.message || 'An error occurred while inserting the schedule.');
      } else {
        console.log('Schedule inserted successfully:', data);
        Alert.alert('Success', 'Schedule added successfully');
        navigation.navigate('Home');
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      Alert.alert('Error', 'An unexpected error occurred');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.title}>New Reminder</Text>
        <TextInput
          style={styles.input}
          placeholder="Title*"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={styles.input}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
        />
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={category}
            onValueChange={(itemValue) => setCategory(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select Category*" value="" />
            <Picker.Item label="Meal" value="meal" />
            <Picker.Item label="Appointment" value="appointment" />
          </Picker>
        </View>
        <TouchableOpacity onPress={() => setShowStartDatePicker(true)} style={styles.datePickerButton}>
          <Text style={styles.datePickerText}>{`Start Date: ${startDateTime.toDateString()}`}</Text>
        </TouchableOpacity>
        {showStartDatePicker && (
          <DateTimePicker
            value={startDateTime}
            mode="date"
            display="default"
            onChange={handleStartDateChange}
          />
        )}
        <TouchableOpacity onPress={() => setShowStartTimePicker(true)} style={styles.datePickerButton}>
          <Text style={styles.datePickerText}>{`Start Time: ${startDateTime.toTimeString().slice(0, 5)}`}</Text>
        </TouchableOpacity>
        {showStartTimePicker && (
          <DateTimePicker
            value={startDateTime}
            mode="time"
            display="default"
            onChange={handleStartTimeChange}
          />
        )}
        <TouchableOpacity onPress={() => setShowEndDatePicker(true)} style={styles.datePickerButton}>
          <Text style={styles.datePickerText}>{`End Date: ${endDateTime.toDateString()}`}</Text>
        </TouchableOpacity>
        {showEndDatePicker && (
          <DateTimePicker
            value={endDateTime}
            mode="date"
            display="default"
            onChange={handleEndDateChange}
          />
        )}
        <TouchableOpacity onPress={() => setShowEndTimePicker(true)} style={styles.datePickerButton}>
          <Text style={styles.datePickerText}>{`End Time: ${endDateTime.toTimeString().slice(0, 5)}`}</Text>
        </TouchableOpacity>
        {showEndTimePicker && (
          <DateTimePicker
            value={endDateTime}
            mode="time"
            display="default"
            onChange={handleEndTimeChange}
          />
        )}
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={applyFor}
            onValueChange={(itemValue) => setApplyFor(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Apply For*" value="" />
            <Picker.Item label="All PawPals" value="all_pawpals" />
            {pets.map((pet) => (
              <Picker.Item key={pet.id} label={pet.name} value={pet.id} />
            ))}
          </Picker>
        </View>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={repeat}
            onValueChange={(itemValue) => setRepeat(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Repeat" value="" />
            <Picker.Item label="Does not repeat" value="does not repeat" />
            <Picker.Item label="Daily" value="daily" />
            <Picker.Item label="Weekly" value="weekly" />
            {/* Add more options as needed */}
          </Picker>
        </View>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={alert}
            onValueChange={(itemValue) => setAlert(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Alert" value="" />
            <Picker.Item label="None" value="none" />
            <Picker.Item label="10 minutes before" value="10m_before" />
            {/* Add more options as needed */}
          </Picker>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.navigate('Home')}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
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

export default AddNewSchedule;
