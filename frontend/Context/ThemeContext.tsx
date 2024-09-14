import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { useColorScheme } from 'react-native';
import { Colors } from '../Constants/Colors';

// Define types for the theme colors structure
interface ColorsType {
    primary: string;
    primaryDark: string;
    primaryLight: string;
    secondary: string;
    background: string;
    surface: string;
    error: string;
    success: string;
    onPrimary: string;
    onSecondary: string;
    onBackground: string;
    onSurface: string;
    onError: string;
    onSuccess: string;
    shadow: string;
}

interface TextColorsType {
    primaryText: string;
    secondaryText: string;
    disabledText: string;
    placeholderText: string;
    linkText: string;
    errorText: string;
    successText: string;
}

interface ButtonColorsType {
    primaryButtonBackground: string;
    primaryButtonText: string;
    secondaryButtonBackground: string;
    secondaryButtonText: string;
    disabledButtonBackground: string;
    disabledButtonText: string;
    errorButtonBackground: string;
    errorButtonText: string;
    successButtonBackground: string;
    successButtonText: string;
}

interface BorderColorsType {
    defaultBorder: string;
    focusedBorder: string;
    errorBorder: string;
    successBorder: string;
    disabledBorder: string;
}

export interface ThemeType {
    colors: ColorsType;
    textColors: TextColorsType;
    buttonColors: ButtonColorsType;
    borderColors: BorderColorsType;
}


interface ThemeContextProps {
    theme: ThemeType;
    toggleTheme: () => void;
    isDarkMode: boolean;
}

// Create the context with a default value
export const ThemeContext = createContext<ThemeContextProps>({
    theme: Colors.lightMode,
    toggleTheme: () => { },
    isDarkMode: false,
});

interface ThemeProviderProps {
    children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const systemTheme = useColorScheme();
    const [theme, setTheme] = useState<ThemeType>(Colors.lightMode);
    const [isDarkMode, setIsDarkMode] = useState<boolean>(systemTheme === 'dark');

    useEffect(() => {
        setTheme(isDarkMode ? Colors.darkMode : Colors.lightMode);
    }, [isDarkMode, systemTheme]);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, isDarkMode }}>
            {children}
        </ThemeContext.Provider>
    );
};
