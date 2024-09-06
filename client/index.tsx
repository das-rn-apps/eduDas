import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { ThemeContext } from './Context/ThemeContext';
import axios from 'axios';
import CourseCard from './Components/Cards/CourseCard';
import { BASE_URL } from '@env';


const Home = () => {
    const [courses, setCourses] = useState([]);
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
        return <Text>Loading...</Text>;
    }

    if (error) {
        return <Text>Error: {error}</Text>;
    }

    return (
        <ScrollView style={{ backgroundColor: theme.colors.background, padding: 16, }}>
            {courses.map((course) => (
                <CourseCard key={course._id} course={course} />
            ))}
        </ScrollView>
    );

};


const styles = StyleSheet.create({

});

export default Home;
