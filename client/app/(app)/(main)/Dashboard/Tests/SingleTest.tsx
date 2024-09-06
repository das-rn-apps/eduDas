import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, StyleSheet, Alert } from 'react-native';
import { ThemeContext } from '@/Context/ThemeContext';
import { useAuth } from '@/Context/AuthContext';
import { router, useLocalSearchParams } from 'expo-router';
import axios from 'axios';
import { Question, Result } from '@/Constants/types';
import { BASE_URL } from '@env';



const SingleTest = () => {
    const { id } = useLocalSearchParams();
    // console.log(id, "In single test");
    const { theme } = useContext(ThemeContext);
    const { userDetails } = useAuth();


    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showResults, setShowResults] = useState(false);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [selectedOptions, setSelectedOptions] = useState<Array<string | null>>(Array(questions.length).fill(null));

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/tests/${id}`);
                setQuestions(response.data.questions);
            } catch (error) {
                setError('Failed to fetch courses');
            } finally {
                setLoading(false);
            }
        };
        fetchCourses();
    }, [id]);

    if (loading) {
        return <Text style={[styles.text, { color: theme.textColors.primaryText }]}>Loading...</Text>;
    }

    if (error) {
        return <Text style={[styles.text, { color: theme.textColors.primaryText }]}>Error: {error}</Text>;
    }

    const handleOptionSelect = (optionIndex: number) => {
        const updatedSelections = [...selectedOptions];
        updatedSelections[currentQuestion] = questions[currentQuestion].options[optionIndex].text;
        setSelectedOptions(updatedSelections);
    };

    const handleNext = () => {
        if (selectedOptions[currentQuestion] === null) {
            Alert.alert('Incomplete', 'Please select an option before moving to the next question.');
        } else {
            if (currentQuestion < questions.length - 1) {
                setCurrentQuestion(currentQuestion + 1);
            } else {
                setShowResults(true);
                generateResultsJson();
            }
        }
    };

    const calculateScore = () => {
        let score = 0;
        questions.forEach((question, index) => {
            if (selectedOptions[index] === question.correctAnswer) {
                score++;
            }
        });
        return score;
    };

    const generateResultsJson = () => {
        const results: Result[] = questions.map((question, index) => ({
            number: question.number,
            question: question.question,
            options: question.options,
            correctAnswer: question.correctAnswer,
            givenAnswer: selectedOptions[index] || '',
            isRight: selectedOptions[index] === question.correctAnswer,
            photo: question.photo
        }));
        submitTestResults(results);
    };

    const submitTestResults = async (results: Result[]) => {
        const total_marks = calculateScore();
        const marks_string = `${total_marks}/${questions.length}`;
        if (!userDetails) return Alert.alert('Error', 'Failed to send message');
        try {
            const response = await axios.post(`${BASE_URL}/tests/submit`, {
                test_id: id,
                user_id: userDetails.id,
                questions: results,
                total_marks: marks_string
            });

        } catch (error) {
            console.error('Error submitting test:', error);
        }
    };

    const handleRetakeTest = () => {
        setCurrentQuestion(0);
        setSelectedOptions(Array(questions.length).fill(null));
        setShowResults(false);
    };

    const handleFinishTest = () => {
        router.replace(`/Dashboard/Tests`);
    };

    return (
        <ScrollView contentContainerStyle={[styles.container, { backgroundColor: theme.colors.background }]}>
            {!showResults ? (
                <View style={styles.questionContainer}>
                    <Text style={[styles.questionNumber, { color: theme.textColors.primaryText }]}>
                        Question {questions[currentQuestion]?.number}
                    </Text>
                    <Text style={[styles.questionText, { color: theme.textColors.primaryText }]}>
                        {questions[currentQuestion]?.question}
                    </Text>
                    {questions[currentQuestion]?.photo &&
                        <Image source={{ uri: questions[currentQuestion].photo }} style={styles.image} />
                    }

                    {questions[currentQuestion]?.options.map((option, optionIndex) => (
                        <TouchableOpacity
                            key={optionIndex}
                            style={[
                                styles.optionButton,
                                { backgroundColor: theme.colors.surface },
                                selectedOptions[currentQuestion] === option.text && {
                                    backgroundColor: theme.colors.primaryLight,
                                }
                            ]}
                            onPress={() => handleOptionSelect(optionIndex)}
                        >
                            <Text style={[styles.optionText, { color: theme.textColors.primaryText }]}>
                                {option.label}. {option.text}
                            </Text>
                        </TouchableOpacity>
                    ))}
                    <TouchableOpacity
                        style={[styles.nextButton, { backgroundColor: theme.buttonColors.primaryButtonBackground }]}
                        onPress={handleNext}
                    >
                        <Text style={[styles.nextButtonText, { color: theme.buttonColors.primaryButtonText }]}>
                            {currentQuestion < questions.length - 1 ? 'Next' : 'Submit'}
                        </Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <ScrollView style={styles.resultContainer}>
                    <View style={styles.marksContainer}>
                        <Text style={[styles.marksText, { color: theme.textColors.primaryText }]}>
                            Score: {calculateScore()}/{questions.length}
                        </Text>
                        <TouchableOpacity
                            style={[styles.retestButton, { backgroundColor: theme.colors.primary }]}
                            onPress={handleRetakeTest}
                        >
                            <Text style={[styles.retestButtonText, { color: theme.buttonColors.primaryButtonText }]}>
                                Retake
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.retestButton, { backgroundColor: theme.colors.success }]}
                            onPress={handleFinishTest}
                        >
                            <Text style={[styles.retestButtonText, { color: theme.buttonColors.successButtonText }]}>
                                Finish
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {questions.map((question, questionIndex) => (
                        <View key={questionIndex} style={styles.questionContainer}>
                            <Text style={[styles.questionNumber, { color: theme.textColors.primaryText }]}>
                                Question {question.number}
                            </Text>
                            <Text style={[styles.questionText, { color: theme.textColors.primaryText }]}>
                                {question.question}
                            </Text>
                            {question.photo &&
                                <Image source={{ uri: question.photo }} style={styles.image} />
                            }
                            {question.options.map((option, optionIndex) => (
                                <View
                                    key={optionIndex}
                                    style={[
                                        styles.optionButton,
                                        option.text === question.correctAnswer && {
                                            backgroundColor: theme.colors.success,
                                        },
                                        selectedOptions[questionIndex] === option.text &&
                                        selectedOptions[questionIndex] !== question.correctAnswer && {
                                            backgroundColor: theme.colors.error
                                        }
                                    ]}
                                >
                                    <Text style={[styles.optionText, { color: theme.textColors.primaryText }]}>
                                        {option.label}. {option.text}
                                    </Text>
                                </View>
                            ))}
                        </View>
                    ))}
                </ScrollView>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    questionContainer: {
        marginBottom: 20,
    },
    questionNumber: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    questionText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    image: {
        width: '100%',
        height: 200,
        marginBottom: 10,
        borderRadius: 8,
    },
    optionButton: {
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    optionText: {
        fontSize: 15,
    },
    nextButton: {
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    nextButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    resultContainer: {
        // marginTop: 20,
    },
    marksContainer: {
        display: "flex",
        flexDirection: "row",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
    },
    marksText: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    retestButton: {
        padding: 8,
        borderRadius: 8,
        alignItems: 'center',
    },
    retestButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    text: {
        fontSize: 16,
    },
});

export default SingleTest;
