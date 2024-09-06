import React, { useState } from 'react';
import { Text, StyleSheet, View, Alert } from 'react-native';
import axios from 'axios';
import { BASE_URL } from '@env';
import Loader from '@/Components/General/Loader';
import CommonFormCRUD, { Field } from '@/Components/General/CommonFormCRUD';
import { classLevelOptions } from '@/Constants/Class';
import Toast from 'react-native-root-toast';
import { router } from 'expo-router';
import { languageOptions } from '@/Constants/Languages';

const PaperDetail = () => {
    const [loading, setLoading] = useState(false);

    // State variables for form fields
    const [paperName, setPaperName] = useState('');
    const [classLevel, setClassLevel] = useState('');
    const [language, setLanguage] = useState('');
    const [paperUrl, setPaperUrl] = useState('https://picsum.photos/200');

    const addPaper = async () => {
        try {
            setLoading(true);
            const response = await axios.post(`${BASE_URL}/practice-papers`, {
                name: paperName,
                class: classLevel,
                language,
                photo: paperUrl
            });
            if (response.status === 201) {
                setLoading(false)
                //show toast
                let toast = Toast.show('Paper added!!', { duration: Toast.durations.LONG });
                setTimeout(function hideToast() { Toast.hide(toast); }, 3000);

                Alert.alert(
                    "Paper Added",
                    "Go to Paper list!",
                    [
                        {
                            text: "Add more Paper",
                            onPress: () => {
                                setClassLevel('');
                                setPaperName('');
                                setLanguage('');
                            },
                            style: "cancel"
                        },
                        {
                            text: "Go",
                            onPress: () => { router.replace('/Admin/Theory') },
                            style: "destructive"
                        }
                    ],
                    { cancelable: true }
                );
            }
        } catch (error) {
            console.error('Error creating Paper:', error);
        }
    };

    const fields: Field[] = [
        { name: 'paperName', label: 'Paper Name', type: 'text', value: paperName, onChange: setPaperName, options: undefined },
        { name: 'paperUrl', label: 'Paper URL', type: 'text', value: paperUrl, onChange: setPaperUrl, options: undefined },
        { name: 'classLevel', label: 'Class Level', type: 'select', value: classLevel, onChange: setClassLevel, options: classLevelOptions },
        { name: 'language', label: 'Language', type: 'select', value: language, onChange: setLanguage, options: languageOptions },
    ];

    if (loading) {
        return <Loader />;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Adding Practice Paper</Text>
            <CommonFormCRUD
                fields={fields}
                onSave={addPaper}
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

export default PaperDetail;
