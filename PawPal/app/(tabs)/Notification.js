import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from '../supabaseClient';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const Notification = () => {
  const navigation = useNavigation();
  const [notifications, setNotifications] = useState([]);
  const [pets, setPets] = useState({});
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();

      if (error) {
        console.error('Error fetching user:', error);
      } else {
        setUserId(user.id);
        fetchPets(user.id);
        fetchNotifications(user.id);
      }
    };

    fetchUser();
  }, []);

  const fetchPets = async (userId) => {
    const { data, error } = await supabase
      .from('pets')
      .select('id, name')
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

  const fetchNotifications = async (userId) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const { data, error } = await supabase
      .from('schedule')
      .select('*')
      .eq('uid', userId)
      .gte('start_time', today.toISOString())
      .lt('start_time', tomorrow.toISOString());

    if (error) {
      console.error('Error fetching notifications:', error);
    } else {
      setNotifications(data);
    }
  };

  const renderNotificationItem = ({ item }) => {
    const petNames = item.apply_for.split(',').map(petId => pets[petId]?.name).join(', ');

    const iconSource = item.category === 'meal'
      ? require('../../assets/meal.png')
      : require('../../assets/appointment.png');

    return (
      <View style={styles.notificationItem}>
        <Image source={iconSource} style={styles.icon} />
        <View style={styles.notificationContent}>
          <Text style={styles.notificationTitle}>{item.title}</Text>
          <Text style={styles.notificationDescription}>{item.description}</Text>
          <Text style={styles.notificationTime}>{new Date(item.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
          <Text style={styles.petNames}>For {petNames}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerButton}>
          <Image source={require('../../assets/backbutton.png')} style={styles.headerButtonIcon} />
        </TouchableOpacity>
        <Text style={styles.title}>Notifications</Text>
      </View>
      <FlatList
        data={notifications}
        renderItem={renderNotificationItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.notificationList}
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
    flex: 1,
    textAlign: 'center',
  },
  notificationList: {
    padding: 20,
  },
  notificationItem: {
    flexDirection: 'row',
    backgroundColor: '#EADDCD',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 15,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  notificationDescription: {
    fontSize: 16,
    color: '#555',
  },
  notificationTime: {
    fontSize: 14,
    color: '#888',
  },
  petNames: {
    fontSize: 14,
    color: '#555',
  },
});

export default Notification;
