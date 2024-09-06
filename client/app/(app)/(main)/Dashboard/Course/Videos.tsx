import React, { useState, useCallback, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import YouTubeIframe from 'react-native-youtube-iframe';
import { ThemeContext } from '@/Context/ThemeContext';
import axios from 'axios';
import { useLocalSearchParams } from 'expo-router';
import { BASE_URL } from '@env';

const Videos = () => {
    const { id } = useLocalSearchParams();
    const { theme } = useContext(ThemeContext);
    const [playing, setPlaying] = useState<string | null>(null);
    const [videos, setVideos] = useState<any[]>([]);
    const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const screenWidth = Dimensions.get('window').width;
    const playerWidth = screenWidth * 0.9;
    const playerHeight = (playerWidth * 9) / 16;

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/playlist/${id}`);
                setVideos(response.data.videos_id);
            } catch (error) {
                console.error('Error getting video list:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchVideos();
    }, [id]);

    const onStateChange = useCallback((state: string, videoId: any) => {
        if (state === 'ended') {
            setPlaying(null);
            alert(`Video with ID: ${videoId} has finished playing!`);
        }
    }, []);

    const renderSelectedVideo = () => {
        const selectedVideo = videos.find((video) => video.videoId === selectedVideoId);
        if (!selectedVideo) return null;

        return (
            <View style={[styles.selectedVideoContainer, { backgroundColor: theme.colors.surface }]}>
                <Text style={[styles.videoName, { color: 'blue' }]}>{selectedVideo.videoName}</Text>
                <YouTubeIframe
                    height={playerHeight}
                    width={playerWidth}
                    play={playing === selectedVideo.videoId}
                    videoId={selectedVideo.videoId}
                    volume={50}
                    mute={false}
                    onChangeState={(state) => onStateChange(state, selectedVideo.videoId)}
                    initialPlayerParams={{
                        loop: false,
                        controls: true,
                    }}
                />
            </View>
        );
    };

    const renderVideoItem = ({ item }: { item: any }) => (
        <TouchableOpacity
            style={[styles.videoListItem, { backgroundColor: theme.colors.surface },
            item.videoId === selectedVideoId && { borderColor: theme.colors.primary, borderWidth: 1, backgroundColor: theme.colors.secondary }
            ]}
            onPress={() => setSelectedVideoId(item.videoId)}
        >
            <Image
                source={{ uri: `https://img.youtube.com/vi/${item.videoId}/hqdefault.jpg` }}
                style={styles.thumbnail}
            />
            <View style={styles.videoInfo}>
                <Text style={[styles.videoName, { color: theme.textColors.primaryText }]}>{item.videoName}</Text>
                <Text style={[styles.videoDetails, { color: theme.textColors.secondaryText }]}>Duration: {item.duration}</Text>
            </View>
        </TouchableOpacity>
    );

    if (loading) {
        return (
            <View style={[styles.loadingContainer, { backgroundColor: theme.colors.background }]}>
                <ActivityIndicator size="large" color={theme.colors.primary} />
            </View>
        );
    }

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            {renderSelectedVideo()}
            <FlatList
                data={videos}
                keyExtractor={(item) => item._id}
                renderItem={renderVideoItem}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectedVideoContainer: {
        alignItems: 'center',
        padding: 10,
        borderRadius: 8,
        width: '95%',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        marginBottom: 20,
        alignSelf: 'center'
    },
    videoListItem: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        padding: 10,
        borderRadius: 8,
        width: '95%',
        marginVertical: 5,
        elevation: 2,
    },
    thumbnail: {
        width: 100,
        height: 56,
        borderRadius: 4,
    },
    videoInfo: {
        marginLeft: 10,
    },
    videoName: {
        fontSize: 13,
    },
    videoDetails: {
        marginTop: 2,
        fontSize: 10
    },
});

export default Videos;
