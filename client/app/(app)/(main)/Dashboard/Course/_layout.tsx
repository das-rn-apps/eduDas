import { Stack } from 'expo-router'
import * as React from 'react'

const _layout = () => {

    return (
        <Stack screenOptions={{
            headerTitleAlign: "center",
            headerShadowVisible: false,
            headerShown: false
        }}>
            <Stack.Screen name="index" options={{ title: "Home" }} />
            <Stack.Screen name="SingleCourse" options={{ title: "SingleCourse" }} />
            <Stack.Screen name="Tests" options={{ title: "Tests" }} />
            <Stack.Screen name="Videos" options={{ title: "Videos" }} />
            <Stack.Screen name="Theories" options={{ title: "Theories" }} />
            <Stack.Screen name="DoubtSection" options={{ title: "DoubtSection" }} />
        </Stack>
    )
}
export default _layout;