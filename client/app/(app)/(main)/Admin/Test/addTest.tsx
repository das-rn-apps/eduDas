import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import CommonFormCRUD, { Field } from '@/Components/General/CommonFormCRUD';
import axios from 'axios';
import { BASE_URL } from '@env';
import Toast from 'react-native-root-toast';
import { useLocalSearchParams } from 'expo-router';
import Loader from '@/Components/General/Loader';

const TestDetail = () => {
    const { id } = useLocalSearchParams();
    // console.log(id);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');


    const [newQuestion, setNewQuestion] = useState({
        question: '',
        option_1: '',
        option_2: '',
        option_3: '',
        option_4: '',
        correctAnswer: '',
        photo: 'https://picsum.photos/200',
    });

    if (loading) {
        return <Loader />;
    }
    if (error) {
        return (
            <Text>{error || "Test not found"}</Text>
        );
    }

    const handleUpdate = async () => {
        // console.log("Child appended");
        // console.log(newQuestion);
        try {
            setLoading(true);
            const response = await axios.put(`${BASE_URL}/tests/addQuestion/${id}`, newQuestion);
            if (response.status === 200) {
                setLoading(false);
                let toast = Toast.show('addQuestion updated!!', { duration: Toast.durations.LONG });
                setTimeout(function hideToast() { Toast.hide(toast); }, 3000);
            }

        } catch (error) {
            setError("Error editing addQuestion:")
            // console.error('Error editing addQuestion:', error);
        }


    };

    const fields: Field[] = [
        { name: 'question', label: 'Question', type: 'text', value: newQuestion.question, onChange: (value) => setNewQuestion(prev => ({ ...prev, question: value })), options: undefined },
        { name: 'option_1', label: 'Option 1', type: 'text', value: newQuestion.option_1, onChange: (value) => setNewQuestion(prev => ({ ...prev, option_1: value })), options: undefined },
        { name: 'option_2', label: 'Option 2', type: 'text', value: newQuestion.option_2, onChange: (value) => setNewQuestion(prev => ({ ...prev, option_2: value })), options: undefined },
        { name: 'option_3', label: 'Option 3', type: 'text', value: newQuestion.option_3, onChange: (value) => setNewQuestion(prev => ({ ...prev, option_3: value })), options: undefined },
        { name: 'option_4', label: 'Option 4', type: 'text', value: newQuestion.option_4, onChange: (value) => setNewQuestion(prev => ({ ...prev, option_4: value })), options: undefined },
        { name: 'correctAnswer', label: 'Correct Answer', type: 'text', value: newQuestion.correctAnswer, onChange: (value) => setNewQuestion(prev => ({ ...prev, correctAnswer: value })), options: undefined },
        { name: 'photo', label: 'Photo URL', type: 'text', value: newQuestion.photo, onChange: (value) => setNewQuestion(prev => ({ ...prev, photo: value })), options: undefined },
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Appending Question</Text>
            <CommonFormCRUD
                fields={fields}
                onSave={handleUpdate}
            />
        </View>
    )
}

export default TestDetail

const styles = StyleSheet.create({

    container: {
        flex: 1,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: "center"
    }
})