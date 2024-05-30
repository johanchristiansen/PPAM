import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Picker, ScrollView } from 'react-native';
import { supabase } from '../supabaseClient';
import DateTimePicker from '@react-native-community/datetimepicker';

const MealPlan = () => {
  const [petType, setPetType] = useState(''); // Assuming you have a way to get the pet type
  const [foodOptions, setFoodOptions] = useState([]);
  const [selectedFood, setSelectedFood] = useState('');
  const [recommendedPortion, setRecommendedPortion] = useState({ cups: 0, calories: 0 });
  const [time, setTime] = useState(new Date());
  const [cupPortion, setCupPortion] = useState(0);

  useEffect(() => {
    // Fetch food options based on pet type
    const fetchFoodOptions = async () => {
      const { data, error } = await supabase
        .from('pet_foods')
        .select('food')
        .eq('pet_types', petType);

      if (data) {
        setFoodOptions(data);
        setSelectedFood(data[0]?.food || '');
      }
    };

    fetchFoodOptions();
  }, [petType]);

  useEffect(() => {
    // Fetch recommended portion based on selected food
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dono's Breakfast</Text>
      
      <View style={styles.section}>
        <Text style={styles.label}>Type of Feed</Text>
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

      <View style={styles.section}>
        <Text style={styles.label}>Recommended Meal Portion</Text>
        <Text style={styles.value}>{recommendedPortion.cups} cups</Text>
        <Text style={styles.value}>{recommendedPortion.calories} kkal</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Add breakfast time</Text>
        <DateTimePicker
          value={time}
          mode="time"
          display="spinner"
          onChange={(event, selectedDate) => setTime(selectedDate || time)}
          style={styles.timePicker}
        />
        <ScrollView horizontal={true} style={styles.cupScroll}>
          <Text style={styles.cupPortion}>{cupPortion.toFixed(1)} cups</Text>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  section: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  value: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  timePicker: {
    width: '100%',
  },
  cupScroll: {
    marginTop: 16,
  },
  cupPortion: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default MealPlan;
