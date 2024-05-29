import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/screen/LoginScreen';
import HomeScreen from './src/screen/HomeScreen';
import AddPawPalScreen from './src/screen/AddPawPalScreen';
import RegisterScreen from './src/screen/RegisterScreen';
import AddNewSchedule from './src/screen/AddNewSchedule';
import ScheduleScreen from './src/screen/ScheduleScreen';
import EventDetailsScreen from './src/screen/EventDetailsScreen';
import RecipesScreen from './src/screen/RecipesScreen';
import RecipeDetailsScreen from './src/screen/RecipeDetailsScreen';

const Stack = createStackNavigator();

export default function App() {
  const [ready, setReady] = useState(false);

  const loadBackgroundAssets = async () => {
    console.log('Loading heavy assets in the background');
    // Add asset loading logic here if needed
  };

  const readyApp = async () => {
    try {
      await SplashScreen.preventAutoHideAsync();
      await loadBackgroundAssets();
      await new Promise((resolve) => setTimeout(resolve, 3000)); // Simulate asset loading delay
    } catch (e) {
      console.warn(e);
    } finally {
      setReady(true);
    }
  };

  useEffect(() => {
    readyApp();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (ready) {
      await SplashScreen.hideAsync();
    }
  }, [ready]);

  if (!ready) {
    return null;
  }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="AddPawPal" component={AddPawPalScreen} options={{ headerShown: false }} />
          <Stack.Screen name="AddNewSchedule" component={AddNewSchedule} options={{ headerShown: false }} />
          <Stack.Screen name="Schedule" component={ScheduleScreen} options={{ headerShown: false }} />
          <Stack.Screen name="EventDetails" component={EventDetailsScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Recipes" component={RecipesScreen} options={{ headerShown: false }} />
          <Stack.Screen name="RecipeDetails" component={RecipeDetailsScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
