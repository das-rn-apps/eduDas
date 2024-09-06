import * as React from 'react';
import { Slot } from 'expo-router';
import { AuthProvider } from '../Context/AuthContext';
import { ThemeProvider } from '../Context/ThemeContext';
import { RefreshProvider } from '@/Context/RefreshContext';
import { RootSiblingParent } from 'react-native-root-siblings';

export default function Root() {
    return (
        <RefreshProvider>
            <AuthProvider>
                <ThemeProvider>
                    <RootSiblingParent>
                        <Slot />
                    </RootSiblingParent>
                </ThemeProvider>
            </AuthProvider>
        </RefreshProvider>
    );
}
