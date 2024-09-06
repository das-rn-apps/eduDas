import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { router, useLocalSearchParams } from 'expo-router';
import { BASE_URL } from '@env';
import CommonFormCRUD, { Field } from '@/Components/General/CommonFormCRUD';
import Loader from '@/Components/General/Loader';
import { Text, View, StyleSheet } from 'react-native';
import { classLevelOptions } from '@/Constants/Class';
import { Paper } from '@/Constants/types';
import { languageOptions } from '@/Constants/Languages';
import Toast from 'react-native-root-toast';

const PracticePaperDetail = () => {
    const { id } = useLocalSearchParams();
    const [paper, setPaper] = useState<Paper>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>('');

    const [paperName, setPaperName] = useState('');
    const [classLevel, setClassLevel] = useState('');
    const [language, setLanguage] = useState('');


    const fetchPaper = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/practice-papers/${id}`);  // Changed endpoint from tests to Papers
            setPaper(response.data);
            setError('');
        } catch (error) {
            setError('Failed to fetch Paper');  // Changed error message
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (paper) {
            setPaperName(paper.name);
            setClassLevel(paper.class);
            setLanguage(paper.language)
        }
    }, [paper]);


    useEffect(() => {
        setLoading(true);
        fetchPaper();
    }, [id]);




    const handleUpdate = async () => {
        try {
            setLoading(true);
            const response = await axios.put(`${BASE_URL}/practice-papers/${id}`, {
                name: paperName,
                language,
                classLevel,
            });

            if (response.status === 200) {
                //show toast
                setLoading(false);
                let toast = Toast.show('PracticePaper updated!!', { duration: Toast.durations.LONG });
                setTimeout(function hideToast() { Toast.hide(toast); }, 3000);
                //Go to list
                router.replace('/Admin/PracticePaper')
            }

        } catch (error) {
            console.error('Error editing PracticePaper:', error);
        }
    };

    const handleDelete = async () => {
        try {
            setLoading(true);
            const response = await axios.delete(`${BASE_URL}/practice-papers/${id}`);

            if (response.status === 200) {
                //show toast
                setLoading(false);
                let toast = Toast.show('PracticePaper deleted!!', { duration: Toast.durations.LONG });
                setTimeout(function hideToast() { Toast.hide(toast); }, 3000);
                //Go to list
                router.replace('/Admin/PracticePaper')
            }

        } catch (error) {
            console.error('Error deleting PracticePaper:', error);
        }
    };

    if (loading) {
        return <Loader />;
    }

    if (error || !paper) {
        return (
            <Text>{error || "Paper not found"}</Text>  // Changed message
        );
    }

    const fields: Field[] = [
        { name: 'paperName', label: 'Paper Name', type: 'text', value: paperName, onChange: setPaperName, options: undefined },
        { name: 'classLevel', label: 'Class Level', type: 'select', value: classLevel, onChange: setClassLevel, options: classLevelOptions },
        { name: 'language', label: 'Language', type: 'select', value: language, onChange: setLanguage, options: languageOptions },

    ];


    return (paper &&
        <View style={styles.container}>
            <Text style={styles.title}>Updating Paper</Text>
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

export default PracticePaperDetail;
