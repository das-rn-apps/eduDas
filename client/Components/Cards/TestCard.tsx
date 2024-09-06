import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { ThemeContext } from '../../Context/ThemeContext';
import { router } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import axios from 'axios';
import { useAuth } from '@/Context/AuthContext';
import { BASE_URL } from '@env';

const TestCard = ({ test }) => {
    const { theme } = useContext(ThemeContext);
    const [given, setGiven] = useState(false);
    const { userDetails } = useAuth();

    const handlePress = () => {
        router.push(`/Dashboard/Tests/SingleTest?id=${test._id}`);
    };

    useEffect(() => {
        const checkTestStatus = async () => {
            if (!userDetails) return;
            try {
                const response = await axios.get(`${BASE_URL}/tests/submit/${userDetails.id}/${test._id}`);
                if (response.data) {
                    setGiven(true);
                }
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    // console.log("Test status not found. User has not submitted this test.");
                } else {
                    console.error("An error occurred:", error);
                }
            }
        };

        checkTestStatus();
    }, [userDetails, test._id]);


    return (
        <View style={[styles.card, { backgroundColor: theme.colors.surface, shadowColor: theme.colors.shadow }]}>
            <Text style={[styles.title, { color: theme.colors.primary }]}>{test.name}</Text>
            {
                given &&
                <View
                    style={
                        {
                            display: "flex", flexDirection: "row", backgroundColor: theme.colors.success, marginHorizontal: 65, padding: 2, borderRadius: 5, marginBottom: 3, justifyContent: "center"
                        }
                    }
                >
                    <Ionicons name="checkmark-done-circle-sharp" size={20} color={theme.textColors.successText} />
                    <Text
                        style={
                            {
                                color: theme.textColors.successText, fontWeight: "bold", fontSize: 10, textAlign: "center", verticalAlign: "middle"
                            }
                        }>Test attempted already</Text>
                </View>
            }


            {test.photo ? (
                <Image source={{ uri: test.photo }} style={styles.image} />
            ) : (
                <Text style={[styles.noImageText, { color: theme.textColors.primaryText }]}>No photo available</Text>
            )}


            <View style={{ display: "flex", flexDirection: "row", gap: 5, marginBottom: 5 }}>
                <AntDesign name="infocirlce" size={15} color={theme.textColors.primaryText} />
                <Text style={[styles.description, { color: theme.textColors.primaryText }]}>{test.description || 'No description available'}</Text>
            </View>


            <View style={styles.infoRow}>
                <View style={styles.infoRow2}>
                    <FontAwesome name="language" size={20} color={theme.textColors.primaryText} />
                    <Text style={[styles.language, { color: theme.textColors.primaryText }]}>{test.language?.name || 'N/A'} </Text>
                </View>
                <View style={styles.infoRow2}>
                    <FontAwesome name="group" size={18} color={theme.textColors.primaryText} />
                    <Text style={[styles.text, { color: theme.textColors.primaryText }]}>{test.class || 'class N/A'}</Text>
                </View>

                <View style={styles.infoRow2}>
                    <FontAwesome name="calendar-check-o" size={18} color={theme.textColors.primaryText} />
                    <Text style={[styles.text, { color: theme.textColors.primaryText }]}>
                        {test.startDate ? new Date(test.startDate).toLocaleDateString() : 'N/A'}
                    </Text>
                </View>
            </View>


            <View style={styles.priceRow}>
                <View style={styles.infoRow2}>
                    <Entypo name="time-slot" size={18} color={theme.textColors.primaryText} />
                    <Text style={[styles.text, { color: theme.textColors.primaryText }]}>{test.duration || 'duration N/A'}</Text>
                </View>
                <TouchableOpacity
                    style={[styles.button, { backgroundColor: theme.buttonColors.secondaryButtonBackground }]}
                    onPress={handlePress}
                >
                    <Text style={[styles.buttonText, { color: theme.buttonColors.secondaryButtonText }]}>{given ? "Attempt Again" : "Attempt"}</Text>
                </TouchableOpacity>
            </View>

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
        padding: 7,
        borderRadius: 7,
        alignItems: 'center',
        elevation: 2,
        marginTop: 3,
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
});

export default TestCard;
