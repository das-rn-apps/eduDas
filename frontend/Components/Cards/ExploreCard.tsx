import React, { useContext } from 'react';
import { View, Text, Image, Button, StyleSheet, Pressable } from 'react-native';
import { ThemeContext } from '@/Context/ThemeContext'; // Adjust the import path as necessary

const ExploreCard = ({ title, description, onExplorePress, imageUrl }) => {
    const { theme } = useContext(ThemeContext);

    return (
        <Pressable
            style={[styles.card, { backgroundColor: theme.colors.background }]}
            onPress={onExplorePress} // Make the entire card pressable
        >
            {imageUrl ? (
                <Image
                    source={{ uri: imageUrl }}
                    style={styles.image}
                    blurRadius={5}
                />
            ) : (
                <View style={styles.image}>
                    <Text style={[styles.noImageText, { color: theme.textColors.secondaryText }]}>No image available</Text>
                </View>
            )}
            <View>
                <Text style={[styles.title, { color: theme.textColors.primaryText }]}>{title}</Text>
                <Text style={[styles.description, { color: theme.textColors.secondaryText }]}>{description}</Text>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: 8,
        overflow: 'hidden',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
    },
    image: {
        width: '100%',
        height: 150,
        position: 'absolute', // Make image position absolute to sit under the overlay
        top: 0,
        left: 0,
    },
    noImageText: {
        padding: 20,
        textAlign: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        textAlign: "center",
    },
    description: {
        fontSize: 10,
        marginBottom: 16,
    },
});

export default ExploreCard;
