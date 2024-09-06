import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import CommonFormCRUD, { Field } from '@/Components/General/CommonFormCRUD';
import axios from 'axios';
import { BASE_URL } from '@env';
import Toast from 'react-native-root-toast';
import { useLocalSearchParams } from 'expo-router';
import Loader from '@/Components/General/Loader';
import { durationOptions } from '@/Constants/Duration';

const TestDetail = () => {
    const { id } = useLocalSearchParams();

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const [newVideo, setNewVideo] = useState({
        videoId: '',
        videoName: '',
        duration: '',
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
        try {
            setLoading(true);
            // console.log(newVideo);
            const response = await axios.post(`${BASE_URL}/playlist/append/${id}`, newVideo);

            if (response.status === 201) {
                setLoading(false);
                let toast = Toast.show('Video updated successfully!', { duration: Toast.durations.LONG });
                setTimeout(() => Toast.hide(toast), 3000);
            }
        } catch (error) {
            setError("Error updating video:");
            console.error('Error updating video:', error);
        }
    };

    const fields: Field[] = [
        { name: 'videoId', label: 'Video ID', type: 'text', value: newVideo.videoId, onChange: (value) => setNewVideo(prev => ({ ...prev, videoId: value })), options: undefined },
        { name: 'videoName', label: 'Video Name', type: 'text', value: newVideo.videoName, onChange: (value) => setNewVideo(prev => ({ ...prev, videoName: value })), options: undefined },
        { name: 'duration', label: 'Duration', type: 'select', value: newVideo.duration, onChange: (value) => setNewVideo(prev => ({ ...prev, duration: value })), options: durationOptions },
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Updating Video</Text>
            <CommonFormCRUD
                fields={fields}
                onSave={handleUpdate}
            />
        </View>
    );
};

export default TestDetail;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: "center",
    },
});
