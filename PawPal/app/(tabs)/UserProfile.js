import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '../supabaseClient'; // Adjust the import path as needed


const UserProfileScreen = ({ navigation }) => {
    const router = useRouter()
    const [username, setUsername] = useState('User');
    
    useEffect(() => {
        const getUserData = async () => {
            const { data: { user }, error } = await supabase.auth.getUser();
            if (user) {
                const fullName = user.user_metadata.full_name;
                setUsername(fullName);
            } else {
                console.error('Error fetching user:', error.message);
                Alert.alert('Error', 'Unable to fetch user data');
            }
        };
        getUserData();  
    }, []);

    const handleSignOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
          console.error('Error signing out:', error.message);
        } else {
          router.push('/'); // Navigate to the sign-in screen or home screen
        }
      };
    
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
            <TouchableOpacity onPress={() => router.push('ComingSoon')}>
                <Image 
                    source={require('../../assets/profile.png')} // replace with your actual image path
                    style={styles.profileImage} 
                />
            </TouchableOpacity>
            <Text style={styles.profileName}>{username}</Text>
        </View>
        <View style={styles.optionList}>
            <TouchableOpacity style={styles.optionItem} onPress={() => router.push('ComingSoon')}>
                <Image source={require('../../assets/email_icon.png')} style={styles.optionIcon} />
                <Text style={styles.optionText}>Email</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionItem} onPress={() => router.push('ComingSoon')}>
                <Image source={require('../../assets/password_icon.png')} style={styles.optionIcon} />
                <Text style={styles.optionText}>Password</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionItem}onPress={() => router.push('ComingSoon')}>
                <Image source={require('../../assets/privacy_icon.png')} style={styles.optionIcon} />
                <Text style={styles.optionText}>Privacy Policy</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionItem}onPress={() => router.push('ComingSoon')}>
                <Image source={require('../../assets/globe_icon.png')} style={styles.optionIcon} />   
                <Text style={styles.optionText}>Language</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionItem}onPress={() => router.push('ComingSoon')}>
                <Image source={require('../../assets/help_icon.png')} style={styles.optionIcon} />
                <Text style={styles.optionText}>Help Center</Text>
            </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
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
        paddingHorizontal: 30,
        paddingBottom: 20,
    },
    backButton: {
        width: 23,
        height: 16,
    },
    headerText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        paddingLeft: 4,
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
        alignItems: 'center',
    },
    optionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 20,
        backgroundColor: '#D3E0EA',
        marginVertical: 10,
        borderRadius: 10,
        width: 350,
    },
    optionIcon: {
        width: 24,
        height: 24,
    },
    optionText: {
    marginLeft: 10,
    fontSize: 16,
    },
    signOutButton: {
    backgroundColor: '#D47937',
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

export default UserProfileScreen;
