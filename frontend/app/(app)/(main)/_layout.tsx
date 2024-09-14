import React, { useEffect, useState } from 'react';
import { Tabs } from 'expo-router';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useContext } from 'react';
import { ThemeContext } from '../../../Context/ThemeContext';
import { useAuth } from '@/Context/AuthContext';
import { ActivityIndicator, View } from 'react-native';

export default function _layout() {
    const { theme } = useContext(ThemeContext);
    const { userDetails } = useAuth();


    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (userDetails) {
            setIsLoading(false);
        }
    }, [userDetails]);

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.colors.background }}>
                <ActivityIndicator size="large" color={theme.colors.primary} />
            </View>
        );
    }

    return (
        <Tabs screenOptions={{
            tabBarActiveTintColor: theme.colors.primary,
            tabBarInactiveTintColor: theme.textColors.secondaryText,
            tabBarStyle: {
                minHeight: 60,
                padding: 5,
                backgroundColor: theme.colors.background,
                paddingBottom: 10
            },
            headerShown: false,
        }}>
            <Tabs.Screen
                name="Dashboard"
                options={{
                    headerShown: false,
                    title: "Dashboard",
                    tabBarIcon: ({ focused }) =>
                        focused ? (
                            <MaterialIcons name="dashboard" size={30} color={theme.colors.primary} />
                        ) : (
                            <MaterialIcons name="dashboard" size={24} color={theme.textColors.secondaryText} />
                        ),
                }}
            />
            <Tabs.Screen
                name="Search"
                redirect={userDetails.type !== "teacher"}
                options={{
                    headerShown: false,
                    title: "Search",
                    tabBarIcon: ({ focused }) =>
                        focused ? (
                            <Ionicons name="search" size={30} color={theme.colors.primary} />
                        ) : (
                            <Ionicons name="search" size={24} color={theme.textColors.secondaryText} />
                        ),
                }}
            />
            <Tabs.Screen
                name="AddCourse"
                options={{
                    headerShown: false,
                    title: "AddCourse",
                    tabBarIcon: ({ focused }) =>
                        focused ? (
                            <Ionicons name="add-circle" size={30} color={theme.colors.primary} />
                        ) : (
                            <Ionicons name="add-circle" size={24} color={theme.textColors.secondaryText} />
                        ),
                }}
            />
            <Tabs.Screen
                name="Profile"
                options={{
                    headerShown: false,
                    title: "Profile",
                    tabBarIcon: ({ focused }) =>
                        focused ? (
                            <Ionicons name="people" size={30} color={theme.colors.primary} />
                        ) : (
                            <Ionicons name="people" size={24} color={theme.textColors.secondaryText} />
                        ),
                }}
            />
            <Tabs.Screen
                name="Admin"
                redirect={userDetails.type !== "teacher"}
                options={{
                    headerShown: false,
                    title: "Admin",
                    tabBarIcon: ({ focused }) =>
                        focused ? (
                            <MaterialIcons name="admin-panel-settings" size={30} color={theme.colors.primary} />
                        ) : (
                            <MaterialIcons name="admin-panel-settings" size={24} color={theme.textColors.secondaryText} />
                        ),
                }}
            />

        </Tabs>
    );
}
