import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemeContext, ThemeType } from '../../Context/ThemeContext'; // Import ThemeContext

interface StudentLoginFormProps {
    onSubmit: (formData: { email: string; password: string }) => void;
}

const StudentLoginForm: React.FC<StudentLoginFormProps> = ({ onSubmit }) => {
    const [email, setEmail] = useState<string>('student1@gmail.com');
    // const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('das');
    // const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');

    const { theme } = useContext(ThemeContext);
    const styles = createStyles(theme);

    const handleSubmit = () => {
        if (!email || !password) {
            setError('Please fill in all fields.');
            return;
        }
        setError('');
        const formData = { email, password };
        onSubmit(formData);
    };

    return (
        <View style={styles.all}>
            <View>
                <Text style={styles.header}>Login</Text>
            </View>
            <View style={styles.container}>
                <View style={styles.formGroup}>
                    <Text style={styles.label}>Email address</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your email"
                        placeholderTextColor={theme.textColors.placeholderText}
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                </View>
                <View style={styles.formGroup}>
                    <Text style={styles.label}>Password</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your password"
                        placeholderTextColor={theme.textColors.placeholderText}
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        autoCapitalize="none"
                    />
                </View>
                {error ? (
                    <Text style={styles.error}>{error}</Text>
                ) : null}
            </View>
            <View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleSubmit}
                >
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const createStyles = (theme: ThemeType) =>
    StyleSheet.create({
        all: {
            flex: 1,
            gap: 10,
            justifyContent: "center"
        },
        container: {
            width: '100%',
            padding: 20,
            borderRadius: 8,
            backgroundColor: theme.colors.surface,
            shadowColor: theme.colors.primary,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
            elevation: 5,
        },
        header: {
            fontSize: 24,
            fontWeight: 'bold',
            marginBottom: 20,
            textAlign: "center",
            color: theme.textColors.primaryText,
        },
        formGroup: {
            marginBottom: 16,
        },
        label: {
            fontSize: 16,
            fontWeight: '600',
            color: theme.textColors.primaryText,
        },
        input: {
            height: 40,
            borderWidth: 0.5,
            borderRadius: 7,
            paddingHorizontal: 12,
            marginBottom: 8,
            borderColor: theme.borderColors.defaultBorder,
            color: theme.textColors.primaryText,
        },
        error: {
            fontSize: 14,
            marginBottom: 16,
            color: theme.colors.error,
        },
        button: {
            height: 45,
            borderRadius: 8,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme.buttonColors.primaryButtonBackground,
            marginTop: 10
        },
        buttonText: {
            color: theme.buttonColors.primaryButtonText,
            fontSize: 16,
            fontWeight: 'bold',
        },
    });

export default StudentLoginForm;
