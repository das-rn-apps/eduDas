import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { jwtDecode } from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import mongoose from 'mongoose';

interface DecodedToken {
    id: mongoose.Types.ObjectId;
    firstName: string;
    lastName: string;
    email: string;
}

interface AuthContextType {
    auth: string | null;
    userDetails: DecodedToken | null;
    login: (token: string) => Promise<void>;
    logout: () => Promise<void>;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [auth, setAuth] = useState<string | null>(null);
    const [userDetails, setUserDetails] = useState<DecodedToken | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchAuth = async () => {
            const token = await AsyncStorage.getItem('token');
            if (token) {
                setAuth(token);
                try {
                    const decodedToken = jwtDecode<DecodedToken>(token);
                    setUserDetails(decodedToken);
                } catch (error) {
                    console.error('Failed to decode token:', error);
                }
            }
            setLoading(false);
        };

        fetchAuth();
    }, []);

    const login = async (token: string) => {
        try {
            await AsyncStorage.setItem('token', token);
            setAuth(token);
            const decodedToken = jwtDecode<DecodedToken>(token);
            setUserDetails(decodedToken);
        } catch (error) {
            console.error('Failed to decode token:', error);
        }
    };

    const logout = async () => {
        try {
            await AsyncStorage.removeItem('token');
            setAuth(null);
            setUserDetails(null);
        } catch (error) {
            console.error('Failed to remove token:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ auth, userDetails, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export { AuthContext, AuthProvider, useAuth };
