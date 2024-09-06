import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ThemeContext } from '@/Context/ThemeContext';
import axios from 'axios';
import { Course } from '@/Constants/types';
import VideoTestCard from '@/Components/Course/VideoTestCard';
import Intro from '@/Components/Course/Intro';
import { BASE_URL } from '@env';

const SingleCourse = () => {
    const { id } = useLocalSearchParams();
    const [course, setCourse] = useState<Course | undefined>(undefined);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const { theme } = useContext(ThemeContext);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/courses/${id}`);
                setCourse(response.data);
            } catch (error) {
                setError('Failed to fetch course');
            } finally {
                setLoading(false);
            }
        };
        fetchCourse();
    }, [id]);

    if (loading) {
        return <ActivityIndicator size="large" color={theme.colors.primary} style={styles.loader} />;
    }

    if (error) {
        return <Text style={[styles.errorText, { color: theme.colors.error }]}>{error}</Text>;
    }

    return (
        course && (
            <ScrollView style={[styles.main, { backgroundColor: theme.colors.onPrimary }]}>
                <Intro course={course} />
                <VideoTestCard course={course} />
            </ScrollView>
        )
    );
};

const styles = StyleSheet.create({
    main: {
        flex: 1,
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        fontSize: 16,
        textAlign: 'center',
        padding: 20,
    },
});

export default SingleCourse;
