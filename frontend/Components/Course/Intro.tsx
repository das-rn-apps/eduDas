import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { ThemeContext } from '@/Context/ThemeContext';

const Intro = ({ course }) => {
    const { theme } = useContext(ThemeContext);

    return (
        <View style={styles.header}>
            <Text style={[styles.title, { color: theme.colors.primary }]}>{course.courseName}</Text>
            <Text style={[styles.description, { color: theme.textColors.primaryText }]}>
                {course.description || 'No description available'}
            </Text>
            <Text style={[styles.text, { color: theme.textColors.primaryText }]}>
                Language: {course.language?.name || 'N/A'}
            </Text>
            <Text style={[styles.text, { color: theme.textColors.primaryText }]}>
                Class: {course.class || 'N/A'}
            </Text>
            <Text style={[styles.text, { color: theme.textColors.primaryText }]}>
                Duration: {course.duration || 'N/A'}
            </Text>
            <Text style={[styles.text, { color: theme.textColors.primaryText }]}>
                Start Date: {course.startDate ? new Date(course.startDate).toLocaleDateString() : 'N/A'}
            </Text>
            <Text style={[
                styles.price,
                {
                    color: course.isFree ? theme.colors.success : theme.textColors.primaryText,
                    textDecorationLine: course.isFree ? 'line-through' : 'none'
                }
            ]}>
                Price: Rs.{course.price.toFixed(2) || '0.00'}
            </Text>
            {course.isFree && (
                <Text style={[styles.freeText, { color: theme.colors.success }]}>Free</Text>
            )}
        </View>
    )
}

export default Intro

const styles = StyleSheet.create({
    header: {
        padding: 20,
        marginBottom: 10,
        backgroundColor: 'transparent',
    },
    text: {
        fontSize: 14,
        marginBottom: 4,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 12,
        textAlign: 'center',
    },
    description: {
        fontSize: 16,
        marginBottom: 8,
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 8,
        textAlign: 'center',
    },
    freeText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 8,
        textAlign: 'center',
    },
})