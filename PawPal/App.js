// App.js
import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';
import LoginScreen from './src/components/LoginScreen';
import HomeScreen from './src/components/HomeScreen';
import AddPawPalScreen from './src/components/AddPawPalScreen';
import RegisterScreen from './src/components/RegisterScreen';
import AddNewSchedule from './src/components/AddNewSchedule';
import ScheduleScreen from './src/components/ScheduleScreen';
import EventDetailsScreen from './src/components/EventDetailsScreen';
import RecipesScreen from './src/components/RecipesScreen';
import RecipeDetailsScreen from './src/components/RecipeDetailsScreen';

const Stack = createStackNavigator();

export default function App() {
  const [ready, setReady] = useState(false);

  const loadBackgroundAssets = async () => {
    console.log('Loading heavy assets in the background');
    // Add asset loading logic here (e.g., fonts, images)
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
      <PaperProvider>
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
      </PaperProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
