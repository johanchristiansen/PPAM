import React from 'react';
import { Image } from 'react-native';
import { Tabs } from 'expo-router';
// import { Colors } from '@/constants/Colors';
// import { useColorScheme } from '@/hooks/useColorScheme';
// import { Colors } from 'react-native/Libraries/NewAppScreen';

// Import custom icons
import homeIcon from '../../assets/home_icon.png';
import notifIcon from '../../assets/notif_icon.png';
import profileIcon from '../../assets/profile_icon.png';

export default function TabLayout() {
  // const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        // tabBarActiveTintColor: Colors[colorScheme ? colorScheme : 'light'].tint,
        headerShown: false,
        tabBarStyle: { padding: 35, backgroundColor: "#445E6B" },
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "grey"
      }}>
      <Tabs.Screen
        name="AddNewSchedule" // Changed the screen name to 'profile'
        options={{
          href: null,
          unmountOnBlur: true,
        }}
      />
      <Tabs.Screen
        name="AddPawPal" // Changed the screen name to 'profile'
        options={{
          href: null,
          unmountOnBlur: true,
        }}
      />
      <Tabs.Screen
        name="EventDetails" // Changed the screen name to 'profile'
        options={{
          href: null,
          unmountOnBlur: true,
        }}
      />
      <Tabs.Screen
        name="Home"
        options={{
          title: 'Home',
          tabBarLabel: "",
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={focused ? homeIcon : homeIcon} // Use homeIcon for both focused and unfocused
              style={{ width: 24, height: 24, tintColor: color }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="index" // Changed the screen name to 'profile'
        options={{
          href: null,
          unmountOnBlur: true,
          tabBarStyle: {display: 'none'}
        }}
      />
      <Tabs.Screen
        name="RecipeDetails" // Changed the screen name to 'profile'
        options={{
          href: null,
          unmountOnBlur: true,
        }}
      />
      <Tabs.Screen
        name="Recipes" // Changed the screen name to 'notifications'
        options={{
          title: 'Profile', // Changed the title to 'Notifications'
          tabBarLabel: "",
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={focused ? notifIcon : notifIcon} // Use notifIcon for both focused and unfocused
              style={{ width: 30, height: 30, tintColor: color }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Register" // Changed the screen name to 'profile'
        options={{
          href: null,
          unmountOnBlur: true,
        }}
      />
      <Tabs.Screen
        name="Schedule" // Changed the screen name to 'notifications'
        options={{
          title: 'Notifications', // Changed the title to 'Notifications'
          tabBarLabel: "",
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={focused ? profileIcon : profileIcon} // Use notifIcon for both focused and unfocused
              style={{ width: 33, height: 33, tintColor: color }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="AddNewRecord" // Changed the screen name to 'profile'
        options={{
          href: null,
          unmountOnBlur: true,
        }}
      />
      <Tabs.Screen
        name="CatAge" // Changed the screen name to 'profile'
        options={{
          href: null,
          unmountOnBlur: true,
        }}
      />
      <Tabs.Screen
        name="FruitsSafe" // Changed the screen name to 'profile'
        options={{
          href: null,
          unmountOnBlur: true,
        }}
      />
      <Tabs.Screen
        name="RecordDetails" // Changed the screen name to 'profile'
        options={{
          href: null,
          unmountOnBlur: true,
        }}
      />
      <Tabs.Screen
        name="MedicalRecords" // Changed the screen name to 'profile'
        options={{
          href: null,
          unmountOnBlur: true,
        }}
      />
      <Tabs.Screen
        name="PetMedicalRecords" // Changed the screen name to 'profile'
        options={{
          href: null,
          unmountOnBlur: true,
        }}
      />
    </Tabs>
  );
}
