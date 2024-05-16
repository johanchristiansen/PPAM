import { StatusBar } from 'expo-status-bar';
import { useState, useEffect, useCallback } from "react";
import { StyleSheet, Text, View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';

export default function App() {
  //This state keeps track if the app has rendered
  const [ready,setReady]=useState();
  const loadBackgroundAssets=async()=>{
    //Write all the code to load heavy images, fonts in the background
    console.log('Loading heavy assets in the background')
  }
  const readyApp=async()=> {
    try {
      // Keep the splash screen visible while we fetch resources
      console.log('Trigger the Splash Screen visible till this try block resolves the promise')
      await SplashScreen.preventAutoHideAsync();
      // Load background assets here
      await loadBackgroundAssets();
      //Explicit delay to mock some loading time
      await new Promise(resolve => setTimeout(resolve, 3000));
    } catch (e) {
      console.warn(e);
    } finally {
      console.log('Render the application screen')
      //Set ready to true to render the application
      setReady(true);
    }
  }
  useEffect(() => {
    readyApp()
  }, []);
  const onLayoutRootView = useCallback(async () => {
    if (ready) {
      console.log('Hide the splash screen immediately')
      await SplashScreen.hideAsync();
    }
  }, [ready]);
  if (!ready) {
    return null;
  }
  return (
    <View style={styles.container}  onLayout={onLayoutRootView} >
      <Text>Welcome! *Whoof Whoof* 👋</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
