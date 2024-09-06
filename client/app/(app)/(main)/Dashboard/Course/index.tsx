import React, { useContext, useEffect, useState, useCallback } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View, RefreshControl, Alert, TouchableOpacity } from 'react-native';
import { ThemeContext } from '@/Context/ThemeContext';
import { useRefresh } from '@/Context/RefreshContext';
import axios from 'axios';
import CourseCard from '@/Components/Cards/CourseCard';
import { Course } from '@/Constants/types';
import { useAuth } from '@/Context/AuthContext';
import { router } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { BASE_URL } from '@env';
import Loader from '@/Components/General/Loader';
import Count from '@/Components/General/Count';

const Home = () => {
    const { theme } = useContext(ThemeContext);
    const { refreshing, setRefreshing } = useRefresh();
    const [courses, setCourses] = useState<Course[]>([]);
    const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>('');
    const { userDetails } = useAuth();

    const fetchCourses = async () => {
        if (!userDetails) return;
        try {
            const response = await axios.get(`${BASE_URL}/courses/user/${userDetails.id}`);
            setCourses(response.data);
            setFilteredCourses(response.data);
            setError('');
        } catch (error) {
            setError('Failed to fetch courses');
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    useEffect(() => {
        const results = courses.filter(course =>
            (course.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (course.class.toLowerCase().includes(searchQuery.toLowerCase()))
        );
        setFilteredCourses(results);
    }, [searchQuery, courses]);

    const onRefresh = () => {
        setRefreshing(true);
        fetchCourses();
    };

    if (loading && !refreshing) {
        return <Loader />;
    }

    if (error) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity
                    style={{ alignItems: 'center' }}
                    onPress={() => {
                        router.push("/AddCourse");
                    }}
                >
                    <Ionicons name="add-circle" size={50} color="black" />
                </TouchableOpacity>
                <Text style={{ textAlign: 'center', fontSize: 15, color: theme.textColors.errorText }}>
                    Add course
                </Text>
                <TouchableOpacity
                    style={{ alignItems: 'center' }}
                    onPress={() => {
                        fetchCourses();
                    }}
                >
                    <Ionicons name="refresh" size={50} color="black" />
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <ScrollView
            style={{ backgroundColor: theme.colors.background, padding: 10 }}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    colors={[theme.colors.primary]}
                    tintColor={theme.colors.primary}
                />
            }
        >
            <View style={styles.searchContainer}>
                <TextInput
                    style={[styles.searchBox, { backgroundColor: theme.colors.surface, color: theme.textColors.primaryText, flex: 1 }]}
                    placeholder="Search courses"
                    placeholderTextColor={theme.textColors.secondaryText}
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
                {searchQuery &&
                    <Count count={filteredCourses.length} />
                }

            </View>
            {filteredCourses.length > 0 ? (
                filteredCourses.map((course) => (
                    <CourseCard key={course._id} course={course} />
                ))
            ) : (
                <Text style={[styles.noItemsText, { color: theme.textColors.errorText }]}>No items found</Text>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    searchContainer: {
        marginBottom: 7,
        display: 'flex',
        flexDirection: "row",
        gap: 10
    },
    searchBox: {
        padding: 7,
        borderRadius: 10,
        fontSize: 16,
        paddingLeft: 20,
    },
    noItemsText: {
        textAlign: 'center',
        fontSize: 18,
        marginTop: 20,
    },
});

export default Home;
