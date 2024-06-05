import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Alert, TouchableOpacity } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from '../supabaseClient';
import { useRouter, useLocalSearchParams } from 'expo-router';

const PetProfile = () => {
    const [petDetails, setPetDetails] = useState(null);
    const [sexIcon, setSexIcon] = useState(null);
    const [dailyCalorieNeeds, setDailyCalorieNeeds] = useState(0);
    const [mealPlans, setMealPlans] = useState({ breakfast: null, lunch: null, dinner: null });
    const { petId } = useLocalSearchParams(); // Correct way to get params
    const router = useRouter();

    const getPetDetails = async (petId) => {
        try {
            let { data, error } = await supabase
                .from('pets')
                .select('*, characteristics, medical_concerns, sex')
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

    const getBreedSize = async (petType, breed) => {
        try {
            const { data, error } = await supabase
                .from('pet_breeds')
                .select('size_categ')
                .eq('pet_type', petType)
                .eq('breed', breed)
                .single();
    
            if (error) throw error;
            if (!data) {
                console.log('No breed size data found for:', petType, breed);
                return 'Unknown'; // Or any default value
            }
    
            return data.size_categ;
        } catch (error) {
            console.error('Error fetching breed size:', error);
            return null;
        }
    };

    const determineCalorieIntakeForDogs = async (petAge, data) => {
        const weight = data.weight;
        const breed = data.breed;
        const breedSize = await getBreedSize('Dog', breed);
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
        const breedSize = await getBreedSize('Cat', breed);
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

    const sexIcons = {
        male: require('../../assets/male_icon.png'),
        female: require('../../assets/female_icon.png')
    };

    const determineSexIcon = async (petId) => {
        try {
            const petDetails = await getPetDetails(petId);
            const sex = petDetails.sex.toLowerCase(); // assuming 'sex' is the field name and it's either 'male' or 'female'
    
            if (sex === 'male' || 'female') {
                return sexIcons[sex];
            } else {
                console.error('Unknown sex:', sex);
                return null;
            }
        } catch (error) {
            console.error('Error determining sex icon:', error.message);
            return null;
        }
    };

    const fetchMealPlans = async (petId) => {
        try {
            const { data: mealSchedules, error } = await supabase
                .from('meal_schedules')
                .select()
                .eq('pet_id', petId);

            if (error) {
                throw error;
            }

            if (mealSchedules && mealSchedules.length > 0) {
                const breakfastPlan = mealSchedules.find(schedule => schedule.meal_session === 'breakfast');
                const lunchPlan = mealSchedules.find(schedule => schedule.meal_session === 'lunch');
                const dinnerPlan = mealSchedules.find(schedule => schedule.meal_session === 'dinner');

                setMealPlans({
                    breakfast: breakfastPlan || null,
                    lunch: lunchPlan || null,
                    dinner: dinnerPlan || null
                });
            }
        } catch (error) {
            console.error('Error fetching meal plans:', error.message);
            Alert.alert('Error', 'Unable to fetch meal plans');
        }
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

                    const sexIcon = await determineSexIcon(petId);
                    setSexIcon(sexIcon);

                    await fetchMealPlans(petId);
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

    const navigateToPetMeals = (mealTime) => {
        router.push({
            pathname: 'MealPlan',
            params: { petType: petDetails.animal, mealTime, petId },
        });
    };

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
                    {petDetails.picture_url ? (
                        <Image
                            source={{ uri: petDetails.picture_url }}
                            style={styles.petImage}
                            resizeMode="cover"
                        />
                    ) : (
                        <Image
                            source={require('../../assets/iconpawpal.png')}
                            style={styles.petImage}
                            resizeMode="cover"
                        />
                    )}
                    <View style={styles.headerText}>
                        <View style={styles.nameAndIcon}>
                            <Text style={styles.petName}>{petDetails.name}</Text>
                            {sexIcon && <Image source={sexIcon} style={styles.sexIcon} />}
                        </View>
                        <Text style={styles.petDetails}>{petDetails.breed}, {calculateAge(petDetails)} y.o., {petDetails.weight} kg</Text>
                        <View style={styles.iconContainer}>
                            <View style={styles.iconItem}>
                                <Image source={require('../../assets/overweight_icon.png')} style={styles.icon} />
                                <Text style={styles.iconText}>{petDetails.medical_concerns}</Text>
                            </View>
                            <View style={styles.iconItem}>
                                <Image source={require('../../assets/activedog_icon.png')} style={styles.icon} />
                                <Text style={styles.iconText}>{petDetails.characteristics}</Text>
                            </View>
                        </View>
                        <Text style={styles.calorieText}>Daily Calorie Intake</Text>
                        <Text style={styles.calorieValue}>{dailyCalorieNeeds} kcal</Text>
                    </View>
                </View>
                <View>
                    {['breakfast', 'lunch', 'dinner'].map(mealTime => (
                        <TouchableOpacity
                            key={mealTime}
                            style={styles.cardContainer}
                            onPress={() => navigateToPetMeals(mealTime)}
                        >
                            <View style={styles.card}>
                                {/* <Text style={styles.mealTime}>{mealTime.charAt(0).toUpperCase() + mealTime.slice(1)}</Text> */}
                                {mealPlans[mealTime] ? (
                                    <>
                                        <Text style={styles.mealTime}>{mealTime.charAt(0).toUpperCase() + mealTime.slice(1)} {new Date(mealPlans[mealTime].time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })} </Text>
                                        <Text style={styles.mealDescription}>{mealPlans[mealTime].food}</Text>
                                        <View style={styles.mealDetails}>
                                            <Text style={styles.mealAmount}>{mealPlans[mealTime].cup_portion} cup(s)</Text>
                                            <Text style={styles.mealCalories}>{mealPlans[mealTime].calories} kcal</Text>
                                        </View>
                                    </>
                                ) : (
                                    <Image source={require('../../assets/plus-sign.png')} style={styles.mealIcon} />
                                )}
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
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
        height: 250,
        alignItems: 'center',
        position: 'absolute',
        top: 0,
    },
    petImage: {
        width: '100%',
        height: '85%',
    },
    headerText: {
        padding: 10,
        alignItems: 'center',
    },
    petName: {
        fontSize: 23,
        fontWeight: 'bold',
        marginRight: 5,
    },
    nameAndIcon: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    sexIcon: {
        width: 24,
        height: 24,
    },
    petDetails: {
        fontSize: 14,
        color: '#888',
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 10,
    },
    iconItem: {
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    icon: {
        width: 35,
        height: 35,
    },
    calorieText: {
        fontSize: 14,
        marginTop: 4,
    },
    calorieValue: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    cardContainer: {
        marginBottom: 15,
        paddingHorizontal: 20,
        top: 390,
    },
    card: {
        backgroundColor: '#EADDCD',
        borderRadius: 8,
        padding: 20,
        paddingTop: 10,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    mealTime: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    mealDescription: {
        fontSize: 16,
        marginVertical: 5,
        textAlign: 'center',
        marginBottom: 10,
    },
    mealDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    mealAmount: {
        fontSize: 18,
    },
    mealCalories: {
        fontSize: 18,
    },
    mealIcon: {
        width: 30,
        height: 30,
        alignSelf: 'center',
        marginVertical: 10,
    },
});

export default PetProfile;