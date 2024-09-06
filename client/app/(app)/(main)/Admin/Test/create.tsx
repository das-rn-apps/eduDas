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

const TestDetail = () => {
    const [loading, setLoading] = useState(false);

    // State variables for form fields
    const [testName, setTestName] = useState('');
    const [description, setDescription] = useState('');
    const [duration, setDuration] = useState('');
    const [classLevel, setClassLevel] = useState('');
    const [language, setLanguage] = useState('');
    const [url, setUrl] = useState('https://picsum.photos/200');

    const [startDate, setStartDate] = useState<{ date: Date; showPicker: boolean }>({ date: new Date(), showPicker: false });

    const addTest = async () => {
        try {
            setLoading(true);
            const response = await axios.post(`${BASE_URL}/tests`, {
                name: testName,
                description,
                duration,
                language,
                class: classLevel,
                startDate: startDate.date,
                photo: url
            });
            if (response.status === 201) {
                setLoading(false)
                //show toast
                let toast = Toast.show('test added!!', { duration: Toast.durations.LONG });
                setTimeout(function hideToast() { Toast.hide(toast); }, 3000);

                Alert.alert(
                    "test Added",
                    "Go to test list!",
                    [
                        {
                            text: "Add more test",
                            onPress: () => {
                                setTestName("");
                                setDescription('');
                                setDuration('');
                                setLanguage('');
                                setClassLevel('');
                                setStartDate({ date: new Date(), showPicker: false });
                            },
                            style: "cancel"
                        },
                        {
                            text: "Go",
                            onPress: () => { router.replace('/Admin/Test') },
                            style: "destructive"
                        }
                    ],
                    { cancelable: true }
                );
            }
        } catch (error) {
            console.error('Error creating test:', error);
        }
    };

    const fields: Field[] = [
        { name: 'testName', label: 'Test Name', type: 'text', value: testName, onChange: setTestName, options: undefined },
        { name: 'url', label: 'Test Photo', type: 'text', value: url, onChange: setUrl, options: undefined },
        { name: 'description', label: 'Description', type: 'textarea', value: description, onChange: setDescription, options: undefined },
        { name: 'duration', label: 'Duration', type: 'select', value: duration, onChange: setDuration, options: durationOptions },
        { name: 'language', label: 'Language', type: 'select', value: language, onChange: setLanguage, options: languageOptions },
        { name: 'classLevel', label: 'Class Level', type: 'select', value: classLevel, onChange: setClassLevel, options: classLevelOptions },
        { name: 'startDate', label: 'Start Date', type: 'date', value: startDate, onChange: setStartDate, options: undefined },
    ];
    if (loading) {
        return <Loader />;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Adding Test</Text>
            <CommonFormCRUD
                fields={fields}
                onSave={addTest}
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
