import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, StyleSheet, Image, Alert } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from '../supabaseClient';
import { useRouter, useLocalSearchParams } from 'expo-router';

const PetProfile = () => {
    const [petDetails, setPetDetails] = useState(null);
    const [dailyCalorieNeeds, setDailyCalorieNeeds] = useState(0);
    const { petId } = useLocalSearchParams(); // Correct way to get params

    const getPetDetails = async (petId) => {
        try {
            let { data, error } = await supabase
                .from('pets')
                .select('*')
                .eq('id', petId)
                .single();

            if (error) throw error;

            return data;
        } catch (error) {
            console.error('Error fetching pet details:', error);
            Alert.alert('Error', 'Unable to fetch pet details');
            return null;
        }
    };

    const calculateAge = (data) => {
        const birth = new Date(data.birth_date);
        const today = new Date();
        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            age--;
        }

        return age;
    };

    const determineCalorieIntakeForDogs = async (petAge, data) => {
        const weight = data.weight;
        const breed = data.breed;

        const getBreedSize = async (breed) => {
            try {
                let { data: breedData, error } = await supabase
                    .from('pet_breeds')
                    .select('size_categ')
                    .eq('pet_type', 'Dog')
                    .eq('breed', breed)
                    .single();

                if (error) throw error;

                return breedData['size_categ'];
            } catch (error) {
                console.error('Error fetching breed size:', error);
                return null;
            }
        };

        const breedSize = await getBreedSize(breed);
        const RER = 70 * Math.pow(weight, 0.75);
        let activityFactor = 1.6; // Default activity factor

        // Adjust activity factor based on breed size
        if (breedSize === 1) {
            activityFactor = 1.2; // Example value, adjust as needed
        } else if (breedSize === 2) {
            activityFactor = 1.4;
        } else if (breedSize === 3) {
            activityFactor = 1.6;
        } else if (breedSize === 4) {
            activityFactor = 1.8;
        } else if (breedSize === 5) {
            activityFactor = 2.0;
        }

        // Adjust activity factor based on age if needed
        if (petAge < 1) {
            activityFactor *= 1.2; // Growing puppies
        }

        const dailyCalorieNeeds = RER * activityFactor;
        return dailyCalorieNeeds;
    };

    const determineCalorieIntakeForCats = async (petAge, data) => {
        const weight = data.weight;
        const breed = data.breed;

        const getBreedSize = async (breed) => {
            try {
                let { data: breedData, error } = await supabase
                    .from('pet_breeds') // Assuming a different table for cat breeds
                    .select('size_categ')
                    .eq('pet_type', 'Cat')
                    .eq('Breed', breed)
                    .single();

                if (error) throw error;

                return breedData['size_categ'];
            } catch (error) {
                console.error('Error fetching breed size:', error);
                return null;
            }
        };

        const breedSize = await getBreedSize(breed);
        const RER = 70 * Math.pow(weight, 0.75);
        let activityFactor = 1.2; // Default activity factor for cats

        // Adjust activity factor based on breed size
        if (breedSize === 1) {
            activityFactor = 1.0; // Example value, adjust as needed
        } else if (breedSize === 2) {
            activityFactor = 1.2;
        } else if (breedSize === 3) {
            activityFactor = 1.4;
        } else if (breedSize === 4) {
            activityFactor = 1.6;
        } else if (breedSize === 5) {
            activityFactor = 1.8;
        }

        // Adjust activity factor based on age if needed
        if (petAge < 1) {
            activityFactor *= 1.2; // Growing kittens
        }

        const dailyCalorieNeeds = RER * activityFactor;
        return dailyCalorieNeeds;
    };

    useEffect(() => {
        const fetchPetDetails = async () => {
            if (!petId) {
                console.error('Pet ID is undefined');
                return;
            }

            try {
                const petDetails = await getPetDetails(petId);

                if (petDetails) {
                    const petAge = calculateAge(petDetails);

                    let dailyCalorieNeeds;
                    if (petDetails.animal === 'dog') {
                        dailyCalorieNeeds = await determineCalorieIntakeForDogs(petAge, petDetails);
                    } else if (petDetails.animal === 'cat') {
                        dailyCalorieNeeds = await determineCalorieIntakeForCats(petAge, petDetails);
                    }
                    dailyCalorieNeeds = Math.round(dailyCalorieNeeds);
                    setPetDetails(petDetails);
                    setDailyCalorieNeeds(dailyCalorieNeeds);
                } else {
                    console.error('Pet details not found');
                }
            } catch (error) {
                console.error('Error fetching pet details:', error.message);
                Alert.alert('Error', 'Unable to fetch pet details');
            }
        };

        fetchPetDetails();
    }, [petId]);

    if (!petDetails) {
        return (
            <SafeAreaProvider>
                <SafeAreaView style={styles.container}>
                    <Text>Loading...</Text>
                </SafeAreaView>
            </SafeAreaProvider>
        );
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <Image
                        source={{ uri: petDetails.picture_url }}
                        style={styles.dogImage}
                        resizeMode="cover"
                    />
                    <View style={styles.headerText}>
                        <Text style={styles.dogName}>{petDetails.name}</Text>
                        <Text style={styles.dogDetails}>{petDetails.breed}, {calculateAge(petDetails)} y.o., {petDetails.weight} kg</Text>
                        <View style={styles.iconContainer}>
                            <Text style={styles.icon}>⚖️ Overweight</Text>
                            <Text style={styles.icon}>🏃 Active</Text>
                        </View>
                        <Text style={styles.calorieText}>Daily Calorie Intake</Text>
                        <Text style={styles.calorieValue}>{dailyCalorieNeeds} kcal per day</Text>
                    </View>
                </View>
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <View style={styles.mealPlan}>
                        <Text style={styles.mealTime}>Breakfast 9AM</Text>
                        <Text style={styles.mealDescription}>Active Care Chicken Meal & Brown Rice</Text>
                        <View style={styles.mealDetails}>
                            <Text style={styles.mealAmount}>0.6 cups per meal</Text>
                            <Text style={styles.mealCalories}>260 total calories</Text>
                        </View>
                    </View>
                    <View style={styles.mealPlan}>
                        <Text style={styles.mealTime}>Royal Canin Chicken, Beef, and Venison</Text>
                        <View style={styles.mealDetails}>
                            <Text style={styles.mealAmount}>0.6 cups per meal</Text>
                            <Text style={styles.mealCalories}>260 total calories</Text>
                        </View>
                    </View>
                    <View style={styles.mealPlan}>
                        <Text style={styles.mealTime}>Dinner 6PM</Text>
                        <Text style={styles.mealDescription}>Royal Canin Chicken, Beef, and Venison</Text>
                        <View style={styles.mealDetails}>
                            <Text style={styles.mealAmount}>0.3 cups per meal</Text>
                            <Text style={styles.mealCalories}>130 total calories</Text>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    header: {
        width: '100%',
        height: 400,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    dogImage: {
        width: '100%',
        height: '60%',
    },
    headerText: {
        padding: 10,
        alignItems: 'center',
    },
    dogName: {
        fontSize: 24,
    },
    dogDetails: {
        fontSize: 16,
        color: '#888',
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 10,
    },
    icon: {
        fontSize: 16,
        marginHorizontal: 5,
    },
    calorieText: {
        fontSize: 18,
        marginTop: 10,
    },
    calorieValue: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    scrollContent: {
        padding: 20,
    },
    mealPlan: {
        marginBottom: 20,
    },
    mealTime: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    mealDescription: {
        fontSize: 16,
        marginVertical: 5,
    },
    mealDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    mealAmount: {
        fontSize: 16,
    },
    mealCalories: {
        fontSize: 16,
    },
});

export default PetProfile;
