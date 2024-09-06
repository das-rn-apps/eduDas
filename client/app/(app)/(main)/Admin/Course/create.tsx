import React, { useState } from 'react';
import { Text, StyleSheet, View, Alert } from 'react-native';
import axios from 'axios';
import { router } from 'expo-router';
import { BASE_URL } from '@env';
import Loader from '@/Components/General/Loader';
import CommonFormCRUD, { Field } from '@/Components/General/CommonFormCRUD';
import { languageOptions } from '@/Constants/Languages';
import { durationOptions } from '@/Constants/Duration';
import { classLevelOptions } from '@/Constants/Class';
import Toast from 'react-native-root-toast';

const CourseDetail = () => {
    const [loading, setLoading] = useState(false);

    // State variables for form fields
    const [courseName, setCourseName] = useState('');
    const [description, setDescription] = useState('');
    const [duration, setDuration] = useState('Duration');
    const [language, setLanguage] = useState('');
    const [classLevel, setClassLevel] = useState('');
    const [isFree, setIsFree] = useState(false);
    const [price, setPrice] = useState('0');
    const [url, setUrl] = useState('https://picsum.photos/200');
    const [startDate, setStartDate] = useState<{ date: Date; showPicker: boolean }>({ date: new Date(), showPicker: false });

    const addCourse = async () => {
        try {
            // console.log('Adding course...');
            setLoading(true);
            const response = await axios.post(`${BASE_URL}/courses`, {
                name: courseName,
                description,
                duration,
                language,
                classLevel,
                isFree,
                price: Number(price),
                startDate: startDate.date,
                photo: url
            });

            setLoading(false);

            if (response.status === 201) {
                console.log('Course added successfully!');

                let toast = Toast.show('Course added!!', { duration: Toast.durations.LONG });
                setTimeout(() => { Toast.hide(toast); }, 3000);

                Alert.alert(
                    "Course Added",
                    "Go to course list!",
                    [
                        {
                            text: "Add more course",
                            onPress: () => {
                                setCourseName("");
                                setDescription('');
                                setDuration('');
                                setLanguage('');
                                setClassLevel('');
                                setIsFree(false);
                                setPrice('0');
                                setStartDate({ date: new Date(), showPicker: false });
                            },
                            style: "cancel"
                        },
                        {
                            text: "Go",
                            onPress: () => { router.replace('/Admin/Course') },
                            style: "destructive"
                        }
                    ],
                    { cancelable: true }
                );
            }
        } catch (error) {
            console.error('Error creating course:', error);
        } finally {
            setLoading(false); // Ensure loading state is updated even if an error occurs
        }
    };




    const fields: Field[] = [
        { name: 'courseName', label: 'Course Name', type: 'text', value: courseName, onChange: setCourseName, options: undefined },
        { name: 'url', label: 'Course Photo', type: 'text', value: url, onChange: setUrl, options: undefined },
        { name: 'description', label: 'Description', type: 'textarea', value: description, onChange: setDescription, options: undefined },
        { name: 'duration', label: 'Duration', type: 'select', value: duration, onChange: setDuration, options: durationOptions },
        { name: 'language', label: 'Language', type: 'select', value: language, onChange: setLanguage, options: languageOptions },
        { name: 'classLevel', label: 'Class Level', type: 'select', value: classLevel, onChange: setClassLevel, options: classLevelOptions },
        { name: 'isFree', label: 'Is Free', type: 'boolean', value: isFree, onChange: setIsFree, options: undefined },
        { name: 'price', label: 'Price', type: 'number', value: price, onChange: setPrice, options: undefined },
        { name: 'startDate', label: 'Start Date', type: 'date', value: startDate, onChange: setStartDate, options: undefined },
    ];
    if (loading) {
        return <Loader />;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Adding Course</Text>
            <CommonFormCRUD
                fields={fields}
                onSave={addCourse}
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
