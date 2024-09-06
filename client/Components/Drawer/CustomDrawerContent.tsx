import React, { useContext, useState } from 'react';
import { View, Text, Switch, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { useAuth } from '@/Context/AuthContext';
import { router } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import { ThemeContext } from '@/Context/ThemeContext';

export default function CustomDrawerContent(props: any) {
    const [isLoggedOut, setIsLoggedOut] = useState(false);

    const { theme, toggleTheme, isDarkMode } = useContext(ThemeContext);
    const { logout } = useAuth();

    const handleLogout = () => {
        Alert.alert(
            'Confirm Logout',
            'Are you sure you want to log out?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Yes',
                    onPress: () => {
                        setIsLoggedOut(true);
                        logout();
                        router.replace('/auth');
                    },
                },
            ],
            { cancelable: true }
        );
    };

    return (
        <DrawerContentScrollView {...props} contentContainerStyle={{ backgroundColor: theme.colors.surface }}>
            <DrawerItemList {...props} />
            <View style={[styles.themeToggleContainer, { borderColor: theme.borderColors.defaultBorder }]}>
                <View style={styles.themeToggleContent}>
                    <AntDesign name="bulb1" size={24} color={theme.colors.primary} />
                    <Text style={[styles.themeToggleText, { color: theme.textColors.primaryText }]}>
                        {isDarkMode ? "Activate Light Mode" : "Activate Dark Mode"}
                    </Text>
                </View>
                <Switch
                    value={isDarkMode}
                    onValueChange={toggleTheme}
                />
            </View>
            <TouchableOpacity style={[styles.logoutContainer, { borderColor: theme.borderColors.defaultBorder }]} onPress={handleLogout}>
                <AntDesign name="logout" size={24} color={theme.colors.primary} />
                <Text style={[styles.logoutText, { color: theme.textColors.primaryText }]}>Logout</Text>
            </TouchableOpacity>
        </DrawerContentScrollView>
    );
}

const styles = StyleSheet.create({
    logoutContainer: {
        padding: 16,
        borderTopWidth: 1,
        flexDirection: "row",
        gap: 10
    },
    logoutText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    themeToggleContainer: {
        padding: 16,
        borderTopWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    themeToggleContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    themeToggleText: {
        fontSize: 16,
        marginLeft: 8,
    },
});
