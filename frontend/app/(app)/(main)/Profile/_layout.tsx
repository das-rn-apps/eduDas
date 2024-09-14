import { Drawer } from 'expo-router/drawer';
import React, { useContext } from 'react';
import CustomDrawerContent from '@/Components/Drawer/CustomDrawerContent';
import { ThemeContext } from '@/Context/ThemeContext';

export default function Layout() {
    const { theme } = useContext(ThemeContext);

    return (
        <Drawer
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={{
                drawerStyle: {
                    backgroundColor: theme.colors.surface,
                },
                headerStyle: {
                    backgroundColor: theme.colors.primary,
                },
                headerTintColor: theme.colors.onPrimary,
                drawerLabelStyle: {
                    color: theme.textColors.primaryText,
                },
            }}
        >
            <Drawer.Screen
                name="index"
                options={{
                    drawerLabel: 'Profile',
                    title: 'Profile',
                }}
            />
            <Drawer.Screen
                name="User/[id]"
                options={{
                    drawerLabel: '[id]',
                    title: 'User Overview',
                }}
            />
            <Drawer.Screen
                name="User/index"
                options={{
                    drawerLabel: 'User Overview',
                    title: 'User Overview',
                }}
            />
            <Drawer.Screen
                name="User/setting"
                options={{
                    drawerLabel: 'Setting',
                    title: 'Setting',
                }}
            />
        </Drawer>
    );
}
