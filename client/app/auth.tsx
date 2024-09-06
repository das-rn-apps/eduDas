import React, { useState, useContext } from 'react';
import axios from 'axios';
import { View, Text, Button, Alert, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { useAuth } from '../Context/AuthContext';
import { ThemeContext } from '../Context/ThemeContext';
import StudentLoginForm from '../Components/Login/StudentLoginForm';
import StudentSignupForm from '../Components/Login/StudentSignupForm';
import { router } from 'expo-router';
import { BASE_URL } from '@env';
import Loader from '@/Components/General/Loader';

type FormData = {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
};

export default function Auth() {
    const [isSignup, setIsSignup] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { login } = useAuth();
    const { theme } = useContext(ThemeContext);

    const handleLoginError = (error: any) => {
        if (axios.isAxiosError(error) && error.response) {
            const { status, data } = error.response;

            switch (status) {
                case 400:
                    Alert.alert(
                        'Error',
                        data.message === 'Email and password are required'
                            ? 'Please provide both email and password.'
                            : data.message === 'Invalid credentials'
                                ? 'The email or password you entered is incorrect.'
                                : data.message || 'Bad Request'
                    );
                    break;
                case 404:
                    Alert.alert(
                        'Error',
                        data.message === 'Student not found' || data.message === 'Teacher not found'
                            ? 'No account found for this email.'
                            : data.message || 'Resource not found'
                    );
                    break;
                case 500:
                    Alert.alert('Error', 'An internal server error occurred. Please try again later.');
                    break;
                default:
                    Alert.alert('Error', 'An unexpected error occurred.');
                    break;
            }
        } else {
            Alert.alert('Error', 'Network Error: Unable to connect to the server.');
        }
    };

    const handleLogin = async (formData: { email: string; password: string }) => {
        setIsLoading(true);
        try {
            const response = await axios.post(`${BASE_URL}/user/login`, formData);
            login(response.data.token);
            router.replace('/(main)/Dashboard/Course');
        } catch (error) {
            handleLoginError(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSignup = async (formData: FormData) => {
        setIsLoading(true);
        try {
            await axios.post(`${BASE_URL}/user`, formData);
            Alert.alert('Success', 'Registration successful!');
            setIsSignup(false);
        } catch (error) {
            Alert.alert('Error', 'An error occurred while registering.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
            {isLoading ? (
                <Loader text={isSignup ? "Creating Account..." : "Authenticating..."} />
            ) : (
                <ScrollView contentContainerStyle={styles.innerContainer}>
                    <Text style={[styles.title, { color: theme.textColors.primaryText }]}>
                        {isSignup ? 'Create Your Account' : 'Login to Your Account'}
                    </Text>
                    {isSignup ? (
                        <StudentSignupForm onSubmit={handleSignup} />
                    ) :
                        <StudentLoginForm onSubmit={handleLogin} />
                    }
                    <View style={styles.switchContainer}>
                        <Text style={{ color: theme.textColors.primaryText }}>
                            {isSignup ? 'Already have an account? ' : 'Don’t have an account? '}
                            <Text
                                style={[styles.link, { color: theme.textColors.linkText }]}
                                onPress={() => setIsSignup(!isSignup)}
                            >
                                {isSignup ? 'Login' : 'Sign Up'}
                            </Text>
                        </Text>
                    </View>
                </ScrollView>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    innerContainer: {
        padding: 20,
        justifyContent: 'center',
        flexGrow: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    switchContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    link: {
        fontWeight: 'bold',
    },
});
