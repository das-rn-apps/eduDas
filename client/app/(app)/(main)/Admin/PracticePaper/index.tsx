import React, { useContext, useEffect, useState } from 'react';
import { View, TextInput, FlatList, StyleSheet, Alert, RefreshControl, Text } from 'react-native';
import axios from 'axios';
import { Href, router } from 'expo-router';
import { BASE_URL } from '@env';
import { Paper } from '@/Constants/types';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ThemeContext } from '@/Context/ThemeContext';
import PaginationControls from '@/Components/General/PaginationControls';
import CommonRow from '@/Components/Row/CommonRow';

const ITEMS_PER_PAGE = 10;

const PracticePaperList = () => {
    const [papers, setPapers] = useState<Paper[]>([]);
    const [filteredPapers, setfilteredPapers] = useState<Paper[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState<string>('');

    const { theme } = useContext(ThemeContext);

    useEffect(() => {
        fetchPapers();
    }, []);

    const fetchPapers = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/practice-papers`);
            setPapers(response.data);
            applyPagination(response.data, 1, searchQuery);
        } catch (error) {
            // console.error(error);
            setError('Failed to fetch papers');
        }
    };

    useEffect(() => {
        applyPagination(papers, currentPage, searchQuery);
    }, [currentPage, papers, searchQuery]);

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchPapers();
        setRefreshing(false);
    };

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        applyPagination(papers, 1, query);
    };

    const applyPagination = (allPapers: Paper[], page: number, query: string) => {
        const filtered = allPapers.filter(Paper =>
            Paper.name.toLowerCase().includes(query.toLowerCase()) || Paper.class?.toLowerCase().includes(query.toLowerCase())
        );
        const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
        setTotalPages(totalPages);

        const startIndex = (page - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        setfilteredPapers(filtered.slice(startIndex, endIndex));
        setCurrentPage(page);
    };

    const handlePageChange = (direction: 'prev' | 'next') => {
        const newPage = direction === 'next'
            ? Math.min(currentPage + 1, totalPages)
            : Math.max(currentPage - 1, 1);

        applyPagination(papers, newPage, searchQuery);
    };

    const handleDelete = (PaperId: string) => {
        Alert.alert(
            "Delete Confirmation",
            "Are you sure you want to delete this Paper?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Deletion cancelled"),
                    style: "cancel"
                },
                {
                    text: "Delete",
                    onPress: () => {
                        axios.delete(`${BASE_URL}/practice-papers/${PaperId}`)
                            .then(() => {
                                const updatedPapers = papers.filter(Paper => Paper._id !== PaperId);
                                setPapers(updatedPapers);
                                applyPagination(updatedPapers, currentPage, searchQuery);
                            })
                            .catch(error => console.error(error));
                    },
                    style: "destructive"
                }
            ],
            { cancelable: true }
        );
    };

    if (error) {
        return (
            <View style={{ backgroundColor: theme.colors.background, flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text style={{ color: theme.textColors.errorText }}>
                    No courses
                </Text>
                <Ionicons name="add-circle" size={40} color={theme.buttonColors.primaryButtonBackground} onPress={() => router.push('/Admin/Theory/create')} style={{ position: "absolute", top: 0, right: 0, zIndex: 1 }} />
            </View>
        );
    }

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background, }]}>
            <View style={styles.searchContainer}>
                <TextInput
                    style={[styles.searchBox, { backgroundColor: theme.colors.surface, color: theme.textColors.primaryText, flex: 1 }]}
                    placeholder="Search papers"
                    placeholderTextColor={theme.textColors.secondaryText}
                    value={searchQuery}
                    onChangeText={handleSearch}
                />
                <Ionicons name="add-circle" size={40} color={theme.buttonColors.primaryButtonBackground} onPress={() => router.push('/Admin/Theory/create')} style={{ position: "absolute", top: 0, right: 0, zIndex: 1 }} />
            </View>
            <FlatList
                data={filteredPapers}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <CommonRow
                        item={{ _id: item._id, name: item.name, photo: item.photo, class: item.class }}
                        onDelete={handleDelete}
                        editRoute={`/Admin/Theory/${item._id}` as Href<string>}
                    />
                )}
                contentContainerStyle={styles.table}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={[theme.buttonColors.primaryButtonBackground]}
                    />
                }
            />
            <PaginationControls
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        padding: 5
    },
    searchBox: {
        padding: 7,
        borderRadius: 10,
        fontSize: 16,
        paddingLeft: 20,
    },
    table: {
        borderTopWidth: 1,
    },
    searchContainer: {
        marginBottom: 7,
        display: 'flex',
        flexDirection: "row",
        gap: 10
    }
});

export default PracticePaperList;
