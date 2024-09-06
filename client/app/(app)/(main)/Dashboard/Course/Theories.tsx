import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { ThemeContext } from '@/Context/ThemeContext';
import { BASE_URL } from '@env';
import axios from 'axios';
import PDFViewer from '@/Components/Pdf/PDFViewer';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';

const Theories = () => {
    const { id } = useLocalSearchParams();
    const { theme } = useContext(ThemeContext);

    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [courseContent, setCourseContent] = useState<any>(null);
    const [selectedBook, setSelectedBook] = useState<string | null>(null);

    useEffect(() => {
        const fetchCourseContent = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/courseContent/${id}`);
                setCourseContent(response.data);
            } catch (err) {
                setError('Failed to fetch course content');
            } finally {
                setLoading(false);
            }
        };

        fetchCourseContent();
    }, [id]);

    const openPDF = (url: string) => setSelectedBook(url);

    if (loading) {
        return (
            <View style={[styles.container, styles.center]}>
                <ActivityIndicator size="large" color={theme.colors.primary} />
                <Text style={[styles.loadingText, { color: theme.colors.primary }]}>Loading...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={[styles.container, styles.center]}>
                <Text style={[styles.errorText, { color: theme.colors.error }]}>{error}</Text>
            </View>
        );
    }

    return (
        courseContent && (
            <LinearGradient
                colors={[theme.colors.background, theme.colors.primary]}
                style={styles.container}
            >
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Theory</Text>
                    <TouchableOpacity onPress={() => openPDF(courseContent.theoryPdf)} style={styles.card}>
                        <Text style={styles.cardTitle}>{courseContent.topic}</Text>
                        <MaterialIcons name="remove-red-eye" size={24} color={theme.colors.primary} />
                    </TouchableOpacity>
                </View>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Practice Papers</Text>
                    <FlatList
                        data={courseContent.practicePaperList}
                        keyExtractor={(item) => item._id}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() => openPDF(item.pdfUrl)}
                                style={styles.card}
                            >
                                <Text style={styles.cardTitle}>{item.title}</Text>
                                <MaterialIcons name="remove-red-eye" size={24} color={theme.colors.primary} />
                            </TouchableOpacity>
                        )}
                        contentContainerStyle={styles.list}
                    />
                </View>
                <PDFViewer selectedBook={selectedBook} setSelectedBook={setSelectedBook} />
            </LinearGradient>
        )
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    section: {
        marginVertical: 10,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginVertical: 15,
        marginHorizontal: 15,
        color: '#333',
    },
    card: {
        backgroundColor: '#fff',
        padding: 15,
        marginVertical: 10,
        marginHorizontal: 15,
        borderRadius: 12,
        elevation: 5,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    errorText: {
        fontSize: 18,
        textAlign: 'center',
        padding: 20,
    },
    loadingText: {
        marginTop: 10,
        fontSize: 18,
    },
    list: {
        paddingHorizontal: 15,
    },
});

export default Theories;
