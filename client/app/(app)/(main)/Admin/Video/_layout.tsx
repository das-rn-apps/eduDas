import { Stack } from 'expo-router'
import * as React from 'react'

const _layout = () => {
    return (
        <Stack screenOptions={{
            headerStyle: {
                backgroundColor: '#009170',
            },
            headerTintColor: "white",
            headerTitleStyle: {
                color: 'white',
                fontWeight: "400"
            },
            headerTitleAlign: "center",
            headerShadowVisible: false,
        }}>
            <Stack.Screen name="index" options={{ title: "Home", headerShown: false }} />
            <Stack.Screen name="create" options={{ title: "create", headerShown: false }} />
            <Stack.Screen name="[id]" options={{ title: "ID", headerShown: false }} />
            <Stack.Screen name="addVideo" options={{ title: "addVideo", headerShown: false }} />
        </Stack>
    )
}
export default _layout;