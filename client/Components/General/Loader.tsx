import React from 'react';
import { ActivityIndicator, View, StyleSheet, Text } from 'react-native';
import { ThemeContext } from '@/Context/ThemeContext';

const Loader = ({ text = "Loading..." }) => {
    const { theme } = React.useContext(ThemeContext);

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <ActivityIndicator size='large' color={theme.colors.primary || theme.colors.primary} />
            <Text style={[styles.message, { color: theme.textColors.primaryText }]}>{text}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    message: {
        marginTop: 10,
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Loader;
