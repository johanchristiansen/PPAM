import React from 'react';
import { Image } from 'react-native';
import { Tabs } from 'expo-router';

// Import custom icons
import homeIcon from '../../assets/home_icon.png';
import notifIcon from '../../assets/notif_icon.png';
import profileIcon from '../../assets/profile_icon.png';

export default function TabLayout() {

  return (
    
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { padding: 35, backgroundColor: "#445E6B" },
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "grey"
      }}>
        
        <Tabs.Screen
        name="Home"
        options={{
          title: 'Home',
          tabBarLabel: "",
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={focused ? homeIcon : homeIcon} 
              style={{ width: 24, height: 24, tintColor: color }}
            />
          ),
        }}
      />
        <Tabs.Screen
          name="index" 
          options={{
            href: null,
            unmountOnBlur: true,
            tabBarStyle: {display: 'none'},
          }}
        />
        
      <Tabs.Screen
        name="AddNewSchedule" 
        options={{
          href: null,
          unmountOnBlur: true,
        }}
      />
      <Tabs.Screen
        name="AddPawPal" 
        options={{
          href: null,
          unmountOnBlur: true,
        }}
      />
      <Tabs.Screen
        name="EventDetails" 
        options={{
          href: null,
          unmountOnBlur: true,
        }}
      />
      <Tabs.Screen
        name="RecipeDetails" 
        options={{
          href: null,
          unmountOnBlur: true,
        }}
      />
      <Tabs.Screen
        name="Notification" 
        options={{
          title: 'Notification', 
          tabBarLabel: "",
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={focused ? notifIcon : notifIcon} 
              style={{ width: 30, height: 30, tintColor: color }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Register" 
        options={{
          href: null,
          unmountOnBlur: true,
          tabBarStyle: {display: 'none'},
        }}
      />
      <Tabs.Screen
        name="UserProfile" 
        options={{
          title: 'UserProfile', 
          tabBarLabel: "",
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={focused ? profileIcon : profileIcon} 
              style={{ width: 33, height: 33, tintColor: color }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="AddNewRecord" 
        options={{
          href: null,
          unmountOnBlur: true,
        }}
      />
      <Tabs.Screen
        name="CatAge" 
        options={{
          href: null,
          unmountOnBlur: true,
        }}
      />
      <Tabs.Screen
        name="FruitsSafe" 
        options={{
          href: null,
          unmountOnBlur: true,
        }}
      />
      <Tabs.Screen
        name="RecordDetails" 
        options={{
          href: null,
          unmountOnBlur: true,
        }}
      />
      <Tabs.Screen
        name="MedicalRecords" 
        options={{
          href: null,
          unmountOnBlur: true,
        }}
      />
      <Tabs.Screen
        name="PetMedicalRecords" 
        options={{
          href: null,
          unmountOnBlur: true,
        }}
      />
      <Tabs.Screen
        name="Recipes" 
        options={{
          href: null,
          unmountOnBlur: true,
        }}
      />
      <Tabs.Screen
        name="Schedule" 
        options={{
          href: null,
          unmountOnBlur: true,
        }}
      />
      <Tabs.Screen
        name="ComingSoon" 
        options={{
          href: null,
          unmountOnBlur: true,
        }}
      />
      <Tabs.Screen
        name="MealPlan" 
        options={{
          href: null,
          unmountOnBlur: true,
        }}
      />
      <Tabs.Screen
        name="PetProfile" 
        options={{
          href: null,
          unmountOnBlur: true,
        }}
      />
    </Tabs>
  );
}
