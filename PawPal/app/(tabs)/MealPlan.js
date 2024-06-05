import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { supabase } from '../supabaseClient';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';

const MealPlan = () => {
  const router = useRouter();
  const { petType, mealTime, petId } = useLocalSearchParams();
  const [foodOptions, setFoodOptions] = useState([]);
  const [selectedFood, setSelectedFood] = useState('');
  const [recommendedPortion, setRecommendedPortion] = useState({ cups: 0, calories: 0 });
  const [startDateTime, setStartDateTime] = useState(new Date());
  const [cupPortion, setCupPortion] = useState(0);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);

  useEffect(() => {
    const fetchFoodOptions = async () => {
      const { data, error } = await supabase
        .from('pet_foods')
        .select('food')
        .eq('pet_type', petType.charAt(0).toUpperCase() + petType.slice(1));
  
      if (error) {
        console.error('Error fetching food options:', error);
        return;
      }
  
      if (data) {
        setFoodOptions(data);
        setSelectedFood(data[0]?.food || '');
      }
    };
  
    fetchFoodOptions();
  }, [petType]);

  useEffect(() => {
    const fetchRecommendedPortion = async () => {
      if (selectedFood) {
        const { data, error } = await supabase
          .from('pet_foods')
          .select('recommended_cups_portion, calories')
          .eq('food', selectedFood)
          .single();

        if (data) {
          setRecommendedPortion({
            cups: data.recommended_cups_portion,
            calories: data.calories,
          });
        }
      }
    };

    fetchRecommendedPortion();
  }, [selectedFood]);

  const handleStartTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || startDateTime;
    setShowStartTimePicker(false);
    setStartDateTime(currentTime);
  };

  const updateMealSchedule = async () => {
    try {
      if (cupPortion <= 0 || !selectedFood) {
        console.error('Please provide valid inputs.');
        return;
      }
  
      const calories = (recommendedPortion.calories / recommendedPortion.cups) * cupPortion;
      const startTimeISO = new Date(startDateTime.getTime() - (startDateTime.getTimezoneOffset() * 60000)).toISOString();
      console.log(startTimeISO);
  
      await supabase
        .from('meal_schedules')
        .update({
          food: selectedFood,
          cup_portion: cupPortion,
          calories: Math.round(calories),
          time: startTimeISO, // save timestamp as ISO string
        })
        .eq('pet_id', petId)
        .eq('meal_session', mealTime);
  
      console.log('Meal schedule updated successfully');
    } catch (error) {
      console.error('Error updating meal schedule:', error.message);
    }
  };

  const handleBackButtonPress = () => {
    updateMealSchedule(); // Update the meal schedule before navigating back
    router.push({ pathname: 'PetProfile', params: { petId } });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackButtonPress} style={styles.backButton}>
          <Image source={require('../../assets/backbutton.png')} style={styles.backButton} />
        </TouchableOpacity>
        <Text style={styles.title}>{mealTime.charAt(0).toUpperCase() + mealTime.slice(1)}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Type of Feed</Text>
        <Picker
          selectedValue={selectedFood}
          onValueChange={(itemValue) => setSelectedFood(itemValue)}
          style={styles.picker}
        >
          {foodOptions.map((option) => (
            <Picker.Item key={option.food} label={option.food} value={option.food} />
          ))}
        </Picker>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Recommended Meal Portion</Text>
        <Text style={styles.value}>{recommendedPortion.cups} cups</Text>
        <Text style={styles.value}>{recommendedPortion.calories} kkal</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Add {mealTime.charAt(0).toUpperCase() + mealTime.slice(1)} Time and Serving</Text>
        <View style={styles.row}>
          <TouchableOpacity onPress={() => setShowStartTimePicker(true)} style={styles.timeButton}>
            <Text style={styles.timeButtonText}>{startDateTime.toTimeString().slice(0, 5)}</Text>
          </TouchableOpacity>
          <View>
            {showStartTimePicker && (
              <DateTimePicker
                value={startDateTime}
                mode="time"
                display="spinner"
                onChange={handleStartTimeChange}
                is24Hour={true}
              />
            )}
            <View style={styles.cupPortion}>
              <TextInput
                placeholder='0'
                keyboardType='numeric'
                style={styles.cupInput}
                value={cupPortion} // Convert to string
                onChangeText={setCupPortion}
              />
              <Text style={styles.cupText}>Cups</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    paddingTop: 55,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 20,
    height: 16  
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  spacer: {
    width: 20, // Same width as the back button to maintain balance
  },
  card: {
    backgroundColor: '#EADDCD',
    borderRadius: 8,
    padding: 15,
    paddingTop: 10, // Further reduced top padding to move the content higher
    marginBottom: 20,
    top: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 15,
  },
  cardTitle: {
    fontSize: 18,
    color: '#7D7D7D',
    marginBottom: 8,
    marginTop: 0, // Move the title higher
  },
  picker: {
    height: 50,
    width: '100%',
  },
  value: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#445E6B',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeButton: {
    backgroundColor: '#E4D9CB',
    padding: 10,
    borderRadius: 5,
  },
  timeButtonText: {
    fontSize: 18,
  },
  timePicker: {
    width: '100%',
  },
  cupScroll: {
    marginTop: 16,
  },
  cupInput: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 5,
    width: 60,
    color: '#445E6B',
    backgroundColor: '#E4D9CB',
    borderRadius: 5,
  },
  cupPortion: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  cupText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

export default MealPlan;
