import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import axios from 'axios';
import { router, useLocalSearchParams } from 'expo-router';
import { BASE_URL } from '@env';
import { Course } from '@/Constants/types';
import Loader from '@/Components/General/Loader';
import CommonFormCRUD, { Field } from '@/Components/General/CommonFormCRUD';
import { languageOptions } from '@/Constants/Languages';
import { durationOptions } from '@/Constants/Duration';
import { classLevelOptions } from '@/Constants/Class';
import Toast from 'react-native-root-toast';


const CourseDetail = () => {
    const { id } = useLocalSearchParams();
    const [course, setCourse] = useState<Course>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>('');

    const fetchCourse = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/courses/${id}`);
            setCourse(response.data);
            setError('');
        } catch (error) {
            setError('Failed to fetch course');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setLoading(true);
        fetchCourse();
    }, [id]);

    // State variables for form fields
    const [courseName, setCourseName] = useState('');
    const [description, setDescription] = useState('');
    const [duration, setDuration] = useState('Duration');
    const [language, setLanguage] = useState('');
    const [classLevel, setClassLevel] = useState('');
    const [isFree, setIsFree] = useState(false);
    const [price, setPrice] = useState('0');
    const [startDate, setStartDate] = useState<{ date: Date; showPicker: boolean }>({ date: new Date(), showPicker: false });
    // Update form field states when course data is fetched
    useEffect(() => {
        if (course) {
            setCourseName(course.name);
            setDescription(course.description);
            setDuration(course.duration);
            setLanguage(course.language);
            setClassLevel(course.class);
            setIsFree(course.isFree);
            setPrice(course.price?.toString() || '0');
            setStartDate({ date: new Date(course.startDate), showPicker: false });
        }
    }, [course]);

    const handleUpdate = async () => {
        try {
            setLoading(true);
            const response = await axios.put(`${BASE_URL}/courses/${id}`, {
                name: courseName,
                description,
                duration,
                language,
                class: classLevel,
                isFree,
                price: Number(price),
                startDate: startDate.date
            });

            if (response.status === 200) {
                //show toast
                setLoading(false);
                let toast = Toast.show('Course updated!!', { duration: Toast.durations.LONG });
                setTimeout(function hideToast() { Toast.hide(toast); }, 3000);
                //Go to list
                router.replace('/Admin/Course')
            }

        } catch (error) {
            console.error('Error editing course:', error);
        }
    };

    const handleDelete = async () => {
        try {
            setLoading(true);
            const response = await axios.delete(`${BASE_URL}/courses/${id}`);

            if (response.status === 200) {
                //show toast
                setLoading(false);
                let toast = Toast.show('Course deleted!!', { duration: Toast.durations.LONG });
                setTimeout(function hideToast() { Toast.hide(toast); }, 3000);
                //Go to list
                router.replace('/Admin/Course')
            }

        } catch (error) {
            console.error('Error deleting course:', error);
        }
    };

    if (loading) {
        return <Loader />;
    }

    if (error || !course) {
        return (
            <Text>{error}</Text>
        );
    }

    const fields: Field[] = [
        { name: 'courseName', label: 'Course Name', type: 'text', value: courseName, onChange: setCourseName, options: undefined },
        { name: 'description', label: 'Description', type: 'textarea', value: description, onChange: setDescription, options: undefined },
        { name: 'duration', label: 'Duration', type: 'select', value: duration, onChange: setDuration, options: durationOptions },
        { name: 'language', label: 'Language', type: 'select', value: language, onChange: setLanguage, options: languageOptions },
        { name: 'classLevel', label: 'Class Level', type: 'select', value: classLevel, onChange: setClassLevel, options: classLevelOptions },
        { name: 'isFree', label: 'Is Free', type: 'boolean', value: isFree, onChange: setIsFree, options: undefined },
        { name: 'price', label: 'Price', type: 'number', value: price, onChange: setPrice, options: undefined },
        { name: 'startDate', label: 'Start Date', type: 'date', value: startDate, onChange: setStartDate, options: undefined },
    ];

    return (course &&
        <View style={styles.container}>
            <Text style={styles.title}>Updating Course</Text>
            <CommonFormCRUD
                fields={fields}
                onSave={handleUpdate}
                onDelete={handleDelete}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: "center"
    }
});

export default CourseDetail;
