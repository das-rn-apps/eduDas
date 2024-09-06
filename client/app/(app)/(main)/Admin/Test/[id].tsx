import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { router, useLocalSearchParams } from 'expo-router';
import { BASE_URL } from '@env';
import CommonFormCRUD, { Field } from '@/Components/General/CommonFormCRUD';
import { Test } from '@/Constants/types';
import Loader from '@/Components/General/Loader';
import { Text, View, StyleSheet } from 'react-native';
import { languageOptions } from '@/Constants/Languages';
import { durationOptions } from '@/Constants/Duration';
import { classLevelOptions } from '@/Constants/Class';
import Toast from 'react-native-root-toast';

const TestDetail = () => {
    const { id } = useLocalSearchParams();
    // console.log(id);

    const [test, setTest] = useState<Test>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>('');

    const fetchTest = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/tests/${id}`);
            setTest(response.data);
            setError('');
        } catch (error) {
            setError('Failed to fetch test');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setLoading(true);
        fetchTest();
    }, [id]);

    const [testName, setTestName] = useState('');
    const [description, setDescription] = useState('');
    const [duration, setDuration] = useState('');
    const [classLevel, setClassLevel] = useState('');
    const [language, setLanguage] = useState('');
    const [startDate, setStartDate] = useState<{ date: Date; showPicker: boolean }>({ date: new Date(), showPicker: false });
    // Update form state when test data is fetched
    useEffect(() => {
        if (test) {
            setTestName(test.name);
            setDescription(test.description);
            setDuration(test.duration);
            setClassLevel(test.class);
            setLanguage(test.language);
            setStartDate({ date: new Date(test.startDate), showPicker: false });
        }
    }, [test]);

    const handleUpdate = async () => {
        try {
            setLoading(true);
            const response = await axios.put(`${BASE_URL}/tests/${id}`, {
                name: testName,
                description,
                duration,
                language,
                classLevel,
                startDate: startDate.date
            });

            if (response.status === 200) {
                //show toast
                setLoading(false);
                let toast = Toast.show('Test updated!!', { duration: Toast.durations.LONG });
                setTimeout(function hideToast() { Toast.hide(toast); }, 3000);
                //Go to list
                router.replace('/Admin/Test')
            }

        } catch (error) {
            console.error('Error editing test:', error);
        }
    };

    const addTestQuestions = async () => {
        router.push(`/Admin/Test/addTest/?id=${id}`);
    };

    if (loading) {
        return <Loader />;
    }

    if (error || !test) {
        return (
            <Text>{error || "Test not found"}</Text>
        );
    }

    const fields: Field[] = [
        { name: 'testName', label: 'Test Name', type: 'text', value: testName, onChange: setTestName, options: undefined },
        { name: 'description', label: 'Description', type: 'textarea', value: description, onChange: setDescription, options: undefined },
        { name: 'duration', label: 'Duration', type: 'select', value: duration, onChange: setDuration, options: durationOptions },
        { name: 'language', label: 'Language', type: 'select', value: duration, onChange: setLanguage, options: languageOptions },
        { name: 'classLevel', label: 'Class Level', type: 'select', value: classLevel, onChange: setClassLevel, options: classLevelOptions },
        { name: 'startDate', label: 'Start Date', type: 'date', value: startDate, onChange: setStartDate, options: undefined },
    ];




    return (test &&
        <View style={styles.container}>
            <Text style={styles.title}>Updating Test</Text>
            <CommonFormCRUD
                fields={fields}
                onSave={handleUpdate}
                onDelete={addTestQuestions}
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
export default TestDetail;
