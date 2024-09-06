import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { ThemeContext } from '../../Context/ThemeContext';
import { router } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import { useAuth } from '@/Context/AuthContext';
import { BASE_URL } from '@env';

const CourseCard = ({ course, onRefresh }) => {
    const { theme } = useContext(ThemeContext);
    const { userDetails } = useAuth();

    const handleFavoritePress = async () => {
        try {
            if (!userDetails) return;
            const response = await axios.post(`${BASE_URL}/courses/add/${userDetails.id}/${course._id}`);
            if (response.status === 200) {
                onRefresh();
                Alert.alert(
                    'Successfull',
                    'Course added!! Go to dashboard.',
                    [
                        {
                            text: 'Cancel',
                            style: 'cancel',
                        },
                        {
                            text: 'OK',
                            onPress: () => router.replace('/Dashboard/Course/')

                        },
                    ],
                    { cancelable: false }
                );
            } else {
                console.log('Unexpected response status:', response.status);
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 404) {
                    console.log('Course not found');
                } else if (error.response?.status === 400) {
                    console.log('Bad request');
                } else {
                    console.log('An error occurred:', error.message);
                }
            } else {
                console.log('An unexpected error occurred:', error);
            }
        }
    };

    return (
        <View style={[styles.card, { backgroundColor: theme.colors.surface, shadowColor: theme.colors.shadow }]}>
            <Text style={[styles.title, { color: theme.colors.primary }]}>{course.name}</Text>
            {course.photo ? (
                <Image source={{ uri: course.photo }} style={styles.image} />
            ) : (
                <Text style={[styles.noImageText, { color: theme.textColors.primaryText }]}>No photo available</Text>
            )}
            <View style={{ display: "flex", flexDirection: "row", gap: 5, marginBottom: 5 }}>
                <AntDesign name="infocirlce" size={15} color={theme.textColors.primaryText} />
                <Text style={[styles.description, { color: theme.textColors.primaryText }]}>{course.description || 'No description available'}</Text>
            </View>

            <View style={styles.infoRow}>
                <View style={styles.infoRow2}>
                    <FontAwesome name="language" size={20} color={theme.textColors.primaryText} />
                    <Text style={[styles.language, { color: theme.textColors.primaryText }]}>{course.language?.name || 'N/A'} </Text>
                </View>
                <View style={styles.infoRow2}>
                    <FontAwesome name="group" size={18} color={theme.textColors.primaryText} />
                    <Text style={[styles.text, { color: theme.textColors.primaryText }]}>{course.class || 'class N/A'}</Text>
                </View>

                <View style={styles.infoRow2}>
                    <FontAwesome name="calendar-check-o" size={18} color={theme.textColors.primaryText} />
                    <Text style={[styles.text, { color: theme.textColors.primaryText }]}>{course.startDate ? new Date(course.startDate).toLocaleDateString() : 'N/A'}</Text>
                </View>
            </View>

            <View style={styles.priceRow}>
                <Text style={[styles.price, { color: theme.textColors.primaryText, textDecorationLine: course.isFree ? 'line-through' : 'none', }]}>Rs. {course.price.toFixed(2) || '0.00'}</Text>
                {course.isFree && (
                    <Text style={[styles.freeText]}>Free</Text>
                )}
                <View style={styles.infoRow2}>
                    <Entypo name="time-slot" size={18} color={theme.textColors.primaryText} />
                    <Text style={[styles.text, { color: theme.textColors.primaryText }]}>{course.duration || 'duration N/A'}</Text>
                </View>
            </View>
            <TouchableOpacity
                style={[styles.button, { backgroundColor: theme.buttonColors.secondaryButtonBackground }]}
                onPress={handleFavoritePress}
            >
                <Text style={[styles.buttonText, { color: theme.buttonColors.secondaryButtonText }]}>Add</Text>
                <MaterialCommunityIcons name="heart-plus" size={28} color={theme.textColors.primaryText} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: 12,
        padding: 12,
        marginVertical: 5,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
        elevation: 3,
        position: 'relative', // Add this to position the favorite icon absolutely
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    text: {
        fontSize: 12,
    },
    language: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 10,
    },
    button: {
        padding: 5,
        borderRadius: 7,
        alignItems: 'center',
        elevation: 2,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        marginHorizontal: 100,
    },
    buttonText: {
        fontSize: 15,
        fontWeight: "bold"
    },
    image: {
        width: '100%',
        height: 150,
        borderRadius: 10,
        marginBottom: 5
    },
    noImageText: {
        textAlign: 'center',
        paddingVertical: 80,
        fontSize: 16,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    infoRow2: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    priceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    price: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    freeText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'green',
    },
    favoriteIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 1, // Ensure it is above other content
    },
});

export default CourseCard;
