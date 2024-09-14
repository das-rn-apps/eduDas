import { ThemeContext } from '@/Context/ThemeContext';
import { Stack } from 'expo-router'
import * as React from 'react'
import { useContext } from 'react';

const _layout = () => {
    const { theme } = useContext(ThemeContext);
    return (
        <Stack screenOptions={{
            headerStyle: {
                backgroundColor: theme.colors.primary,
            },
            headerTintColor: "white",
            headerTitleStyle: {
                color: 'white',
            },
            headerTitleAlign: "center",
            headerShadowVisible: false,
        }}>
            <Stack.Screen name="index" options={{ title: "Courses" }} />
        </Stack>
    )
}
export default _layout;