import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, RefreshControl, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import axios from 'axios';
import { ThemeContext } from '@/Context/ThemeContext';
import { useRefresh } from '@/Context/RefreshContext'; // Import useRefresh
import TestCard from '@/Components/Cards/TestCard';
import { BASE_URL } from '@env';

const Tests = () => {
    const { id } = useLocalSearchParams();
    const [tests, setTests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>('');
    const { theme } = useContext(ThemeContext);
    const { refreshing, setRefreshing } = useRefresh();

    const fetchTests = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/tests/course/${id}`);
            setTests(response.data.tests);
            setError('');
        } catch (error) {
            setError('Failed to fetch tests');
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchTests();
    }, [id, setRefreshing]);

    // Handler for pull-to-refresh action
    const onRefresh = () => {
        setRefreshing(true);
        fetchTests();
    };

    if (loading) {
        return <Text>Loading...</Text>;
    }

    if (error) {
        return <Text>Error: {error}</Text>;
    }

    return (
        <ScrollView
            style={{ backgroundColor: theme.colors.background, padding: 16 }}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    colors={[theme.colors.primary]}
                    tintColor={theme.colors.primary}
                />
            }
        >
            {tests.map((test) => (
                <TestCard key={test._id} test={test} />
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    // Add styles if needed
});

export default Tests;
