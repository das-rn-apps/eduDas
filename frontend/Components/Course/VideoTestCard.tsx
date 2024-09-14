import { StyleSheet, Text, TouchableOpacity, View, Image, Alert } from 'react-native'
import React, { useContext } from 'react'
import { ThemeContext } from '@/Context/ThemeContext';
import { router } from 'expo-router';

const VideoTestCard = ({ course }) => {
    const { theme } = useContext(ThemeContext);

    const goTo = (path: string, id: any) => () => {
        if (!path || !id) {
            Alert.alert(`Sorry`, `No Data in ${path}`)
            return;
        }
        const query = new URLSearchParams({ id: String(id) }).toString();
        router.push(`/Dashboard/Course/${path}?${query}`);
    };
    const image = "https://picsum.photos/600";
    return (
        <View>
            <View style={styles.cardRow}>
                <TouchableOpacity style={[styles.card, { backgroundColor: theme.colors.background }]}
                    onPress={goTo("Tests", course._id)}
                >
                    <Image source={require('@/assets/photo/quiz.png')} style={styles.image} />
                    <View style={styles.overlay}>
                        <Text style={styles.overlayTitle}>Tests</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.card, { backgroundColor: theme.colors.background }]}
                    onPress={goTo("Videos", course.playlist)}
                >
                    <Image source={require('@/assets/photo/youtube.png')} style={styles.image} />
                    <View style={styles.overlay}>
                        <Text style={styles.overlayTitle}>Videos</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.cardRow}>
                <TouchableOpacity style={[styles.card, { backgroundColor: theme.colors.background }]}
                    onPress={goTo("Theories", course.content)}
                >
                    <Image source={require('@/assets/photo/book.png')} style={styles.image} />
                    <View style={styles.overlay}>
                        <Text style={styles.overlayTitle}>Theories</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.card, { backgroundColor: theme.colors.background }]}
                    onPress={goTo("DoubtSection", course.doubt)}>
                    <Image source={require('@/assets/photo/doubt.png')} style={styles.image} />
                    <View style={styles.overlay}>
                        <Text style={styles.overlayTitle}>DoubtSection</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default VideoTestCard

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 120,
    },
    card: {
        flex: 1,
        borderRadius: 20,
        margin: 5,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        position: 'relative',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    overlayTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    cardRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 10,
        marginBottom: 20,
    },
})