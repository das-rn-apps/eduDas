import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import { ThemeContext } from '@/Context/ThemeContext';
import { AntDesign } from '@expo/vector-icons';

const setting = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <View>
            <TouchableOpacity
                style={[styles.toggleButton, { backgroundColor: theme.colors.secondary }]}
                onPress={toggleTheme}
            >
                <AntDesign name="bulb1" size={24} color={theme.colors.primary} />
                <Text style={[styles.buttonText, { color: theme.textColors.primaryText }]}>Change Mode</Text>
            </TouchableOpacity>
        </View>
    )
}

export default setting

const styles = StyleSheet.create({
    toggleButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        marginLeft: 10,
    },
})