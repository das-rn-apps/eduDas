import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { router } from 'expo-router';
import axios from 'axios';
import { ThemeContext } from '@/Context/ThemeContext';
import { useAuth } from '@/Context/AuthContext';
import TestList from '@/Components/Cards/TestList';
import { BASE_URL } from '@env';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const Performance = () => {
    const { userDetails } = useAuth();
    const [tests, setTests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>('');
    const { theme } = useContext(ThemeContext);

    useEffect(() => {
        const fetchTests = async () => {
            try {
                if (!userDetails) return;
                const response = await axios.get(`${BASE_URL}/tests/submit/user/${userDetails.id}`);
                setTests(response.data);
            } catch (error) {
                setError('Failed to fetch tests');
            } finally {
                setLoading(false);
            }
        };

        fetchTests();
    }, [userDetails]);

    if (loading) {
        return <Text style={[styles.loadingText, { color: theme.textColors.primaryText }]}>Loading...</Text>;
    }

    if (error) {
        return (
            <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
                <MaterialIcons name="analytics" size={50} color={theme.textColors.errorText} />
                <Text style={[styles.errorText, { color: theme.textColors.errorText }]}>
                    No performance
                </Text>
            </View>
        );
    }

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <TouchableOpacity
                onPress={() => {
                    router.push('/Dashboard/Performance/Chart');
                }}
                style={[styles.button, { backgroundColor: theme.colors.primary }]}
            >
                <Text style={[styles.buttonText, { color: theme.textColors.primaryText }]}>Show chart</Text>
            </TouchableOpacity>
            <TestList tests={tests} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loadingText: {
        textAlign: 'center',
        fontSize: 16,
    },
    errorText: {
        textAlign: 'center',
        fontSize: 15,
        marginTop: 20,
    },
    button: {
        padding: 16,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Performance;
