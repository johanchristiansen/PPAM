import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import iconpawpal from '../../assets/iconpawpal.png'

const ComingSoonScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image 
          source={iconpawpal} // replace with your actual image path
          style={styles.image} 
        />
        <Text style={styles.text}>Coming Soon in PawPal</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#F0F0F0',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 250, // Adjust this value based on your image size
    height: 250, // Adjust this value based on your image size
    marginBottom: 10,
  },
  text: {
    fontSize: 30,
    justifyContent: 'center',
    fontWeight: 'bold',
  },
});

export default ComingSoonScreen;
