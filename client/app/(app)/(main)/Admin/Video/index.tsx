import React, { useContext, useEffect, useState } from 'react';
import { View, TextInput, FlatList, StyleSheet, Alert, Text } from 'react-native';
import axios from 'axios';
import { Href, router } from 'expo-router';
import { BASE_URL } from '@env';
import { VideosList } from '@/Constants/types';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ThemeContext } from '@/Context/ThemeContext';
import PaginationControls from '@/Components/General/PaginationControls';
import Loader from '@/Components/General/Loader';
import CommonRow from '@/Components/Row/CommonRow';

const ITEMS_PER_PAGE = 10;

const videosList = () => {
    const [videos, setVideos] = useState<VideosList[]>([]);
    const [filteredVideos, setFilteredVideos] = useState<VideosList[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const { theme } = useContext(ThemeContext);


    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>('');

    const fetchVideos = async () => {
        axios.get(`${BASE_URL}/playlist`)
            .then(response => {
                setVideos(response.data);
                applyPagination(response.data, 1, searchQuery);
                setError('');
            })
            .catch(error => setError('Failed to fetch courses'))
            .finally(() => {
                setLoading(false);
            });
    };


    useEffect(() => {
        fetchVideos();
    }, []);


    useEffect(() => {
        applyPagination(videos, currentPage, searchQuery);
    }, [currentPage, videos, searchQuery]);

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        applyPagination(videos, 1, query);
    };

    const applyPagination = (allvideos: VideosList[], page: number, query: string) => {
        const filtered = allvideos.filter(video =>
            video.name.toLowerCase().includes(query.toLowerCase()) || video.class.toLowerCase().includes(query.toLowerCase())
        );
        const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
        setTotalPages(totalPages);

        const startIndex = (page - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        setFilteredVideos(filtered.slice(startIndex, endIndex));
        setCurrentPage(page);
    };

    const handlePageChange = (direction: 'prev' | 'next') => {
        const newPage = direction === 'next'
            ? Math.min(currentPage + 1, totalPages)
            : Math.max(currentPage - 1, 1);

        applyPagination(videos, newPage, searchQuery);
    };

    const handleDelete = (courseId: string) => {
        Alert.alert(
            "Delete Confirmation",
            "Are you sure you want to delete this test?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Deletion cancelled!"),
                    style: "cancel"
                },
                {
                    text: "Delete",
                    onPress: () => {
                        axios.delete(`${BASE_URL}/videos/${courseId}`)
                            .then(() => {
                                const updatedVideos = videos.filter(course => course._id !== courseId);
                                setVideos(updatedVideos);
                                applyPagination(updatedVideos, currentPage, searchQuery);
                            })
                            .catch(error => console.error(error));
                    },
                    style: "destructive"
                }
            ],
            { cancelable: true }
        );
    };

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return (
            <View style={{ backgroundColor: theme.colors.background, flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text style={{ color: theme.textColors.errorText }}>
                    No videos: {error}
                </Text>
                <Ionicons name="add-circle" size={40} color={theme.buttonColors.primaryButtonBackground} onPress={() => router.push('/Admin/Video/create')} style={{ position: "absolute", top: 0, right: 0, zIndex: 1 }} />
            </View>
        );
    }
    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background, }]}>
            <View style={styles.searchContainer}>
                <TextInput
                    style={[styles.searchBox, { backgroundColor: theme.colors.surface, color: theme.textColors.primaryText, flex: 1 }]}
                    placeholder="Search videos"
                    placeholderTextColor={theme.textColors.secondaryText}
                    value={searchQuery}
                    onChangeText={handleSearch}
                />
                <Ionicons name="add-circle" size={40} color={theme.buttonColors.primaryButtonBackground} onPress={() => router.push('/Admin/Video/create')} style={{ position: "absolute", top: 0, right: 0, zIndex: 1 }} />
            </View>
            <FlatList
                data={filteredVideos}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <CommonRow
                        item={{ _id: item._id, name: item.name, photo: item.photo, class: item.class }}
                        onDelete={handleDelete}
                        editRoute={`/Admin/Video/${item._id}` as Href<string>}
                    />
                )}
                contentContainerStyle={styles.table}
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

export default videosList;
