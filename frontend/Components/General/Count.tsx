import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { ThemeContext } from '@/Context/ThemeContext';

const Count = ({ count }) => {
    const { theme } = useContext(ThemeContext);

    return (
        <View style={{ backgroundColor: theme.buttonColors.successButtonBackground, borderRadius: 23, width: 45, justifyContent: 'center', }}>
            <Text style={{ color: theme.buttonColors.successButtonText, textAlign: "center", fontSize: 15, fontWeight: "bold" }}>
                {count}
            </Text>
        </View>
    )
}

export default Count

const styles = StyleSheet.create({})