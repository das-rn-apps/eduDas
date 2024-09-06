import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { ThemeContext } from '@/Context/ThemeContext';
import axios from 'axios';
import CourseCard from '@/Components/Cards/CourseCard';
import { BASE_URL } from '@env';
import { Course } from '@/Constants/types';

const Home = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const { theme } = useContext(ThemeContext);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/courses`);
                setCourses(response.data);
            } catch (error) {
                setError('Failed to fetch courses');
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    if (loading) {
        return <Text style={[styles.loadingText, { color: theme.textColors.primaryText }]}>Loading...</Text>;
    }

    if (error) {
        return <Text style={[styles.errorText, { color: theme.textColors.errorText }]}>Error: {error}</Text>;
    }

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.colors.background }]}>
            <ScrollView >
                {courses.map((course) => (
                    <CourseCard key={course._id} course={course} />
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        padding: 10,
    },

    loadingText: {
        textAlign: 'center',
        marginTop: 20,
    },
    errorText: {
        textAlign: 'center',
        marginTop: 20,
    },
    searchButton: {
        padding: 10,
        borderRadius: 5,
        margin: 16,
        alignItems: 'center',
    },
    searchButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Home;
