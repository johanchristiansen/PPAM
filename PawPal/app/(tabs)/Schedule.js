import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from '../supabaseClient';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';

const ScheduleScreen = () => {
  const navigation = useNavigation();
  const [schedules, setSchedules] = useState([]);
  const [pets, setPets] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();

      if (error) {
        console.error('Error fetching user:', error);
      } else {
        setUserId(user.id);
        fetchPets(user.id);
        fetchSchedules(user.id, selectedDate);
      }
    };

    fetchUser();
  }, [selectedDate]);

  const fetchPets = async (userId) => {
    const { data, error } = await supabase
      .from('pets')
      .select('id, name, picture_url')
      .eq('user_id', userId);

    if (error) {
      console.error('Error fetching pets:', error);
    } else {
      const petsMap = {};
      data.forEach(pet => {
        petsMap[pet.id] = pet;
      });
      setPets(petsMap);
    }
  };

  const fetchSchedules = async (userId, date) => {
    const { data, error } = await supabase
      .from('schedule')
      .select('*')
      .eq('uid', userId)
      .gte('start_time', date.toISOString())
      .lt('start_time', new Date(date.getTime() + 24 * 60 * 60 * 1000).toISOString());

    if (error) {
      console.error('Error fetching schedules:', error);
    } else {
      setSchedules(data);
    }
  };

  useFocusEffect(
    useCallback(() => {
      const refresh = navigation.getState().routes.find(route => route.name === 'Schedule').params?.refresh;
      if (refresh) {
        fetchSchedules(userId, selectedDate);
        navigation.setParams({ refresh: false });
      }
    }, [navigation, userId, selectedDate])
  );

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setSelectedDate(currentDate);
  };

  const renderScheduleItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('EventDetails', { eventId: item.id })}>
        <View style={styles.scheduleItem}>
          <Text style={styles.scheduleTitle}>{item.title}</Text>
          <Text style={styles.scheduleDescription}>{item.description}</Text>
          <Text style={styles.scheduleTime}>
            {new Date(item.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {new Date(item.end_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Text>
          <View style={styles.petIconsContainer}>
            {item.apply_for.split(',').map(petId => {
              const pet = pets[petId];
              return pet ? (
                <View key={petId} style={styles.petContainer}>
                  <Image source={{ uri: pet.picture_url }} style={styles.petIcon} />
                  <Text style={styles.petName}>{pet.name}</Text>
                </View>
              ) : null;
            })}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderDateItem = ({ item }) => {
    const isSelected = item.date.toDateString() === selectedDate.toDateString();
    return (
      <TouchableOpacity onPress={() => setSelectedDate(item.date)}>
        <View style={[styles.dateItem, isSelected && styles.dateItemSelected]}>
          <Text style={styles.dayLabel}>{item.day}</Text>
          <Text style={styles.dateLabel}>{item.date.getDate()}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const generateDates = () => {
    const dates = [];
    const currentDate = new Date();
    for (let i = -3; i <= 3; i++) {
      const date = new Date(currentDate);
      date.setDate(currentDate.getDate() + i);
      dates.push({
        date,
        day: date.toLocaleDateString('en-US', { weekday: 'short' })[0]
      });
    }
    return dates;
  };

  const formatDate = (date) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.headerButton}>
          <Image source={require('../../assets/backbutton.png')} style={styles.headerButtonIcon} />
        </TouchableOpacity>
        <Text style={styles.title}>Reminder</Text>
        <TouchableOpacity onPress={() => navigation.navigate('AddNewSchedule')} style={styles.headerButton}>
          <Image source={require('../../assets/addbutton.png')} style={styles.addButtonIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.dateInfo}>
        <Text style={styles.todayLabel}>Today</Text>
        <Text style={styles.date}>{formatDate(selectedDate)}</Text>
      </View>
      <View style={styles.dateContainer}>
        <FlatList
          data={generateDates()}
          renderItem={renderDateItem}
          keyExtractor={(item) => item.date.toDateString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.dateList}
        />
      </View>
      <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.datePickerButton}>
        <Text style={styles.datePickerButtonText}>Pick a date</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
      <FlatList
        data={schedules}
        renderItem={renderScheduleItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.scheduleList}
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
  addButtonIcon: {
    width: 24,
    height: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  dateInfo: {
    alignItems: 'center',
    marginVertical: 10,
  },
  todayLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 16,
    color: '#888',
  },
  dateContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  dateList: {
    paddingVertical: 10,
  },
  dateItem: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 20,
    marginHorizontal: 5,
    backgroundColor: '#BCCDD7',
  },
  dateItemSelected: {
    backgroundColor: '#445E6B',
  },
  dayLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  dateLabel: {
    fontSize: 16,
    color: '#333',
  },
  datePickerButton: {
    marginTop: 10,
    backgroundColor: '#445E6B',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'center',
  },
  datePickerButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  scheduleList: {
    padding: 20,
  },
  scheduleItem: {
    backgroundColor: '#EADDCD',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  scheduleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  scheduleDescription: {
    fontSize: 16,
    color: '#555',
  },
  scheduleTime: {
    fontSize: 14,
    color: '#888',
  },
  petIconsContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  petContainer: {
    alignItems: 'center',
    marginRight: 10,
  },
  petIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  petName: {
    fontSize: 12,
    marginTop: 5,
  },
});

export default ScheduleScreen;
