import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, Alert, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as FileSystem from 'expo-file-system';
import { supabase } from '../supabaseClient';
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

const AddPawPalScreen = () => {
  const navigation = useNavigation();
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [name, setName] = useState('');
  const [sex, setSex] = useState('');
  const [breed, setBreed] = useState('');
  const [birthDate, setBirthDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [characteristics, setCharacteristics] = useState('');
  const [weight, setWeight] = useState('');
  const [medicalConcerns, setMedicalConcerns] = useState('');
  const [pictureUri, setPictureUri] = useState('');
  const [pictureUrl, setPictureUrl] = useState('');
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();

      if (error) {
        console.error('Error fetching user:', error);
      } else {
        console.log('Fetched user:', user);
        setUserId(user.id);
      }
    };

    fetchUser();
  }, []);

  const handleAnimalSelect = (animal) => {
    setSelectedAnimal(selectedAnimal === animal ? null : animal);
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || birthDate;
    setShowDatePicker(false);
    setBirthDate(currentDate);
  };

  const handleImagePicker = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert('Permission to access media library is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    console.log('Image Picker Result:', result);

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const { uri } = result.assets[0];
      const newUri = Platform.OS === 'android' ? `file://${uri.split('file:/').join('')}` : uri;
      setPictureUri(newUri);
    } else {
      console.log('Image Picker Cancelled or No URI');
      Alert.alert('Image Picker', 'No image selected or operation cancelled.');
    }
  };

  const saveImageLocally = async (imageUri) => {
    const fileName = `${Date.now()}-${imageUri.split('/').pop()}`;
    const localUri = `${FileSystem.documentDirectory}${fileName}`;

    try {
      await FileSystem.copyAsync({
        from: imageUri,
        to: localUri,
      });
      return localUri;
    } catch (error) {
      console.error('Error saving image locally:', error);
      Alert.alert('Error', 'Unable to save image locally. Please try again.');
      return null;
    }
  };

  const handleSubmit = async () => {
    if (!userId) {
      Alert.alert('Error', 'No user ID available');
      return;
    }

    let uploadedUrl = pictureUrl;
    if (pictureUri) {
      const localUri = await saveImageLocally(pictureUri);
      if (!localUri) return; // If image save fails, don't proceed further.
      uploadedUrl = localUri; // Save as filename
      setPictureUrl(uploadedUrl);
    }

    const { data, error } = await supabase
      .from('pets')
      .insert([
        {
          user_id: userId,
          name: name,
          animal: selectedAnimal,
          sex: sex,
          breed: breed,
          birth_date: birthDate,
          characteristics: characteristics,
          weight: parseFloat(weight),
          medical_concerns: medicalConcerns,
          picture_url: uploadedUrl,
        }
      ]);

    if (error) {
      Alert.alert('Error', error.message);
    } else {
      Alert.alert('Success', 'Pet added successfully');
      navigation.navigate('Home');
    }
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
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={characteristics}
            onValueChange={(itemValue) => setCharacteristics(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select Characteristics*" value="" />
            <Picker.Item label="active" value="active" />
            <Picker.Item label="passive" value="passive" />
            <Picker.Item label="neutral" value="neutral" />
          </Picker>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Body Weight (0.0 kg)*"
          keyboardType="numeric"
          value={weight}
          onChangeText={setWeight}
        />
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={medicalConcerns}
            onValueChange={(itemValue) => setMedicalConcerns(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select Medical Concerns" value="" />
            <Picker.Item label="None" value="none" />
            <Picker.Item label="Overweight" value="overweight" />
            <Picker.Item label="Underweight" value="underweight" />

          </Picker>
        </View>
        <TouchableOpacity onPress={handleImagePicker} style={styles.imagePickerButton}>
          <Text style={styles.imagePickerText}>Select Picture</Text>
        </TouchableOpacity>
        {pictureUri ? (
          <Image source={{ uri: pictureUri }} style={styles.imagePreview} />
        ) : null}
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
  imagePickerButton: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#90caf9',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  imagePickerText: {
    fontSize: 16,
    color: '#fff',
  },
  imagePreview: {
    width: 100,
    height: 100,
    marginBottom: 20,
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
