import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { ThemeContext } from '../../Context/ThemeContext';
import { router } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Entypo from '@expo/vector-icons/Entypo';

const CardComponent = ({ course }) => {
    const { theme } = useContext(ThemeContext);

    const handlePress = () => {
        const query = new URLSearchParams({ id: course._id }).toString();
        router.push(`/Dashboard/Course/SingleCourse?${query}`);
    };

    return (
        <View style={[styles.card, { backgroundColor: theme.colors.surface, shadowColor: theme.colors.shadow }]}>
            <Text style={[styles.title, { color: theme.colors.primary }]}>{course.courseName}</Text>
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
                onPress={handlePress}
            >
                <Text style={[styles.buttonText, { color: theme.buttonColors.secondaryButtonText }]}>Explore</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: 12,
        padding: 12,
        marginVertical: 8,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
        elevation: 3,
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
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
        marginTop: 10,
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: 'center',
        elevation: 2,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: "bold"
    },
    image: {
        width: '100%',
        height: 200,
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
        fontSize: 16,
        fontWeight: 'bold',
    },
    freeText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'green',
    },
});

export default CardComponent;
