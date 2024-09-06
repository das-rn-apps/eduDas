import React, { useState } from 'react';
import { Text, StyleSheet, View, Alert } from 'react-native';
import axios from 'axios';
import { BASE_URL } from '@env';
import Loader from '@/Components/General/Loader';
import CommonFormCRUD, { Field } from '@/Components/General/CommonFormCRUD';
import { classLevelOptions } from '@/Constants/Class';
import Toast from 'react-native-root-toast';
import { router } from 'expo-router';

const VideoListDetail = () => {
    const [loading, setLoading] = useState(false);

    // State variables for form fields
    const [videoName, setVideoName] = useState('');
    const [classLevel, setClassLevel] = useState('');
    const [url, setUrl] = useState('https://picsum.photos/200');


    const addVideo = async () => {
        try {
            setLoading(true);
            console.log(videoName, classLevel);
            const response = await axios.post(`${BASE_URL}/playlist`, {
                video: videoName,
                class: classLevel,
                photo: url
            });
            if (response.status === 201) {
                setLoading(false)
                //show toast
                let toast = Toast.show('Video added!!', { duration: Toast.durations.LONG });
                setTimeout(function hideToast() { Toast.hide(toast); }, 3000);

                Alert.alert(
                    "Video Added",
                    "Go to Video list!",
                    [
                        {
                            text: "Add more Video",
                            onPress: () => {
                                setClassLevel('');
                                setVideoName('');
                            },
                            style: "cancel"
                        },
                        {
                            text: "Go",
                            onPress: () => { router.replace('/Admin/Video') },
                            style: "destructive"
                        }
                    ],
                    { cancelable: true }
                );
            }
        } catch (error) {
            console.error('Error creating video:', error);
        }
    };

    const fields: Field[] = [
        { name: 'videoName', label: 'Video Name', type: 'text', value: videoName, onChange: setVideoName, options: undefined },
        { name: 'url', label: 'Video Photo', type: 'text', value: url, onChange: setUrl, options: undefined },
        { name: 'classLevel', label: 'Class Level', type: 'select', value: classLevel, onChange: setClassLevel, options: classLevelOptions },
    ];

    if (loading) {
        return <Loader />;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Adding Video</Text>
            <CommonFormCRUD
                fields={fields}
                onSave={addVideo}
            />
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: "center"
    }
});

export default VideoListDetail;
