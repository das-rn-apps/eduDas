import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View, RefreshControl } from 'react-native';
import { ThemeContext } from '@/Context/ThemeContext';
import { useRefresh } from '@/Context/RefreshContext';
import axios from 'axios';
import { Course } from '@/Constants/types';
import AddCourse from '@/Components/Cards/AddCourse';
import { useAuth } from '@/Context/AuthContext';
import { BASE_URL } from '@env';
import Count from '@/Components/General/Count';
import Loader from '@/Components/General/Loader';

const Home = () => {
    const { theme } = useContext(ThemeContext);
    const { refreshing, setRefreshing } = useRefresh();
    const [courses, setCourses] = useState<Course[]>([]);
    const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const { userDetails } = useAuth();

    const fetchCourses = async () => {
        if (!userDetails) return;
        try {
            setIsLoading(true);
            const response = await axios.get(`${BASE_URL}/courses/exceptUser/${userDetails.id}`);
            setCourses(response.data);
            setFilteredCourses(response.data);
            setError('');
        } catch (error) {
            setError('Failed to fetch courses');
        } finally {
            setIsLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        if (userDetails && userDetails.id) {
            fetchCourses();
        }
    }, [userDetails]);

    useEffect(() => {
        const results = courses.filter(course =>
            course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.class.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredCourses(results);
    }, [searchQuery, courses]);

    const onRefresh = () => {
        setRefreshing(true);
        fetchCourses();
    };

    if (isLoading && !refreshing) {
        return <Loader />;
    }

    if (error) {
        return <Text style={[styles.errorText, { color: theme.textColors.errorText, backgroundColor: theme.colors.background }]}>All courses are added to your account!!</Text>;
    }

    return (
        <ScrollView
            style={[styles.container, { backgroundColor: theme.colors.background }]}
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
                    style={[styles.searchBox, { backgroundColor: theme.colors.surface, color: theme.textColors.primaryText }]}
                    placeholder="Search courses"
                    placeholderTextColor={theme.textColors.secondaryText}
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
                {searchQuery && <Count count={filteredCourses.length} />}
            </View>
            {filteredCourses.length > 0 ? (
                filteredCourses.map((course) => (
                    <AddCourse key={course._id} course={course} onRefresh={onRefresh} />
                ))
            ) : (
                <Text style={[styles.noItemsText, { color: theme.textColors.secondaryText }]}>No items found</Text>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5
    },
    searchContainer: {
        marginBottom: 7,
        flexDirection: 'row',
        gap: 10,
    },
    searchBox: {
        padding: 7,
        borderRadius: 10,
        fontSize: 16,
        paddingLeft: 20,
        flex: 1,
    },
    noItemsText: {
        textAlign: 'center',
        fontSize: 18,
        marginTop: 20,
    },
    errorText: {
        flex: 1,
        textAlign: 'center',
        fontSize: 15,
        textAlignVertical: "center"
    },
});

export default Home;