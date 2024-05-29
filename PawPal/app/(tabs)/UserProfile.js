import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign, FontAwesome, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const ProfileScreen = () => {
    const router = useRouter()
    return (
    <View style={styles.container}>
        <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('Home')} style={styles.backButton}>
            <Image source={require('../../assets/backbutton_white.png')} style={styles.backButton} />
        </TouchableOpacity>
        <Text style={styles.headerText}>PROFILE</Text>
        <TouchableOpacity onPress={() => router.push('ComingSoon')} style={styles.editButton}>
        <Image source={require('../../assets/edit_icon.png')} style={styles.editButton} />
        </TouchableOpacity>
        </View>
        <View style={styles.profileSection}>
        <Image 
            source={require('../../assets/profile.png')} // replace with your actual image path
            style={styles.profileImage} 
        />
        <Text style={styles.profileName}>Fredrick Runie Taslim</Text>
        <Text style={styles.profileInfo}>(+62)87701112789 | JKT</Text>
        </View>
        <View style={styles.optionList}>
        <TouchableOpacity style={styles.optionItem}>
            <MaterialIcons name="email" size={24} color="black" />
            <Text style={styles.optionText}>Email</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionItem}>
            <FontAwesome name="lock" size={24} color="black" />
            <Text style={styles.optionText}>Password</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionItem}>
            <MaterialIcons name="policy" size={24} color="black" />
            <Text style={styles.optionText}>Privacy Policy</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionItem}>
            <FontAwesome name="globe" size={24} color="black" />
            <Text style={styles.optionText}>Language</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionItem}>
            <Ionicons name="help-circle" size={24} color="black" />
            <Text style={styles.optionText}>Help Center</Text>
        </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.signOutButton}>
        <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
    </View>
    );
    };

    const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    },
    header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#4A6572',
    paddingVertical: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    },
    backButton: {
    width: 37,
    height: 22,
    color: 'white',
    },
    headerText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    paddingRight:10,
    },
    editButton: {
    width: 24,
    height: 24,
    },
    profileSection: {
    alignItems: 'center',
    backgroundColor: '#4A6572',
    paddingVertical: 20,
    paddingBottom: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    },
    profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    },
    profileName: {
    color: 'white',
    fontSize: 18,
    marginVertical: 5,
    paddingTop: 8,
    },
    profileInfo: {
    color: 'white',
    fontSize: 14,
    },
    optionList: {
    marginVertical: 20,
    },
    optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#D3E0EA',
    marginVertical: 5,
    borderRadius: 10,
    },
    optionText: {
    marginLeft: 10,
    fontSize: 16,
    },
    signOutButton: {
    backgroundColor: '#F49C00',
    paddingVertical: 15,
    alignItems: 'center',
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 10,
    },
    signOutText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    },
});

export default ProfileScreen;
