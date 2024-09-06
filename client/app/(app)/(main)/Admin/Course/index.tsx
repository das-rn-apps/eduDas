import React, { useContext, useEffect, useState } from 'react';
import { View, TextInput, FlatList, StyleSheet, Alert, RefreshControl, Text } from 'react-native';
import axios from 'axios';
import { Href, router } from 'expo-router';
import { BASE_URL } from '@env';
import { Course } from '@/Constants/types';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ThemeContext } from '@/Context/ThemeContext';
import PaginationControls from '@/Components/General/PaginationControls';
import CommonRow from '@/Components/Row/CommonRow';

const ITEMS_PER_PAGE = 10;

const CoursesList = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState<string>('');

    const { theme } = useContext(ThemeContext);

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/courses`);
            setCourses(response.data);
            applyPagination(response.data, 1, searchQuery);
        } catch (error) {
            // console.error(error);
            setError('Failed to fetch courses');
        }
    };

    useEffect(() => {
        applyPagination(courses, currentPage, searchQuery);
    }, [currentPage, courses, searchQuery]);

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchCourses();
        setRefreshing(false);
    };

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        applyPagination(courses, 1, query);
    };

    const applyPagination = (allCourses: Course[], page: number, query: string) => {
        const filtered = allCourses.filter(course =>
            course.name.toLowerCase().includes(query.toLowerCase()) || course.class.toLowerCase().includes(query.toLowerCase())
        );
        const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
        setTotalPages(totalPages);

        const startIndex = (page - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        setFilteredCourses(filtered.slice(startIndex, endIndex));
        setCurrentPage(page);
    };

    const handlePageChange = (direction: 'prev' | 'next') => {
        const newPage = direction === 'next'
            ? Math.min(currentPage + 1, totalPages)
            : Math.max(currentPage - 1, 1);

        applyPagination(courses, newPage, searchQuery);
    };

    const handleDelete = (courseId: string) => {
        Alert.alert(
            "Delete Confirmation",
            "Are you sure you want to delete this course?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Deletion cancelled"),
                    style: "cancel"
                },
                {
                    text: "Delete",
                    onPress: () => {
                        axios.delete(`${BASE_URL}/courses/${courseId}`)
                            .then(() => {
                                const updatedCourses = courses.filter(course => course._id !== courseId);
                                setCourses(updatedCourses);
                                applyPagination(updatedCourses, currentPage, searchQuery);
                            })
                            .catch(error => console.error(error));
                    },
                    style: "destructive"
                }
            ],
            { cancelable: true }
        );
    };

    if (error) {
        return (
            <View style={{ backgroundColor: theme.colors.background, flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text style={{ color: theme.textColors.errorText }}>
                    No courses
                </Text>
                <Ionicons name="add-circle" size={40} color={theme.buttonColors.primaryButtonBackground} onPress={() => router.push('/Admin/Course/create')} style={{ position: "absolute", top: 0, right: 0, zIndex: 1 }} />
            </View>
        );
    }
    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background, }]}>
            <View style={styles.searchContainer}>
                <TextInput
                    style={[styles.searchBox, { backgroundColor: theme.colors.surface, color: theme.textColors.primaryText, flex: 1 }]}
                    placeholder="Search Courses"
                    placeholderTextColor={theme.textColors.secondaryText}
                    value={searchQuery}
                    onChangeText={handleSearch}
                />
                <Ionicons name="add-circle" size={40} color={theme.buttonColors.primaryButtonBackground} onPress={() => router.push('/Admin/Course/create')} style={{ position: "absolute", top: 0, right: 0, zIndex: 1 }} />
            </View>
            <FlatList
                data={filteredCourses}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <CommonRow
                        item={{ _id: item._id, name: item.name, photo: item.photo, class: item.class }}
                        onDelete={handleDelete}
                        editRoute={`/Admin/Course/${item._id}` as Href<string>}
                    />
                )}
                contentContainerStyle={styles.table}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={[theme.buttonColors.primaryButtonBackground]}
                    />
                }
            />
            <PaginationControls
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        padding: 5
    },
    searchBox: {
        padding: 7,
        borderRadius: 10,
        fontSize: 16,
        paddingLeft: 20,
    },
    table: {
        borderTopWidth: 1,
    },
    searchContainer: {
        marginBottom: 7,
        display: 'flex',
        flexDirection: "row",
        gap: 10
    }
});

export default CoursesList;
