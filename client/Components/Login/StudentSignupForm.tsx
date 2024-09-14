import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Platform, Alert, Pressable, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { ThemeContext, ThemeType } from '../../Context/ThemeContext';
import { Picker } from '@react-native-picker/picker';
import { userTypes } from '@/Constants/User';

interface StudentSignupFormProps {
    onSubmit: (formData: {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        dateOfBirth: Date;
        type: string;
    }) => void;
}

const StudentSignupForm: React.FC<StudentSignupFormProps> = ({ onSubmit }) => {
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [type, setType] = useState<string>('student');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);
    const [showPicker, setShowPicker] = useState<boolean>(false);

    const { theme } = useContext(ThemeContext);
    const styles = createStyles(theme);

    const handleDateChange = (event: any, selectedDate?: Date) => {
        const currentDate = selectedDate || new Date();
        if (event.type === 'set') {
            setDateOfBirth(currentDate);
        }
        setShowPicker(false);
    };

    const handleSubmit = () => {
        if (!firstName || !lastName || !email || !password || !dateOfBirth || !type) {
            Alert.alert('Please fill in all fields.');
            return;
        }
        const formData = {
            firstName,
            lastName,
            email,
            password,
            dateOfBirth,
            type
        };
        onSubmit(formData);
    };

    return (
        <View style={styles.all}>
            <View>
                <Text style={styles.header}>Login</Text>
            </View>
            <View style={styles.container}>
                <Text style={styles.header}>Registration</Text>
                <View style={styles.formGroup}>
                    <Text style={styles.label}>User type</Text>
                    <Picker
                        selectedValue={type}
                        onValueChange={(itemValue) => setType(itemValue)}
                        style={styles.input}
                    >
                        {userTypes?.map(option => (
                            <Picker.Item key={option.value} label={option.label} value={option.value} />
                        ))}
                    </Picker>
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>First Name</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your first name"
                        placeholderTextColor={theme.textColors.placeholderText}
                        value={firstName}
                        onChangeText={setFirstName}
                    />
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Last Name</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your last name"
                        placeholderTextColor={theme.textColors.placeholderText}
                        value={lastName}
                        onChangeText={setLastName}
                    />
                </View>
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
                <View style={styles.formGroup}>
                    <View style={styles.dateContainer}>
                        <TextInput
                            style={styles.dateInput}
                            placeholder="Enter date 2000-01-13"
                            value={dateOfBirth ? dateOfBirth.toISOString().split('T')[0] : ''}
                            editable={false}
                            placeholderTextColor={theme.textColors.placeholderText}
                        />
                        <Pressable onPress={() => setShowPicker(true)}>
                            <FontAwesome name="calendar" size={38} color={theme.colors.primary} />
                        </Pressable>
                    </View>
                    {showPicker && (
                        <DateTimePicker
                            value={dateOfBirth || new Date()}
                            mode="date"
                            display="default"
                            onChange={handleDateChange}
                        />
                    )}
                </View>
            </View>
            <View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleSubmit}
                >
                    <Text style={styles.buttonText}>Register</Text>
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
            padding: 16,
            borderRadius: 8,
            backgroundColor: theme.colors.surface,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
            elevation: 5,
        },
        formGroup: {
            marginBottom: 16,
        },
        header: {
            fontSize: 24,
            fontWeight: 'bold',
            marginBottom: 20,
            textAlign: "center",
            color: theme.textColors.primaryText,
        },
        label: {
            fontSize: 16,
            marginBottom: 8,
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
        dateContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 16,
        },
        dateInput: {
            flex: 1,
            height: 40,
            borderWidth: 1,
            borderRadius: 7,
            paddingHorizontal: 8,
            borderColor: theme.borderColors.defaultBorder,
            color: theme.textColors.primaryText,
            marginRight: 10,
        },
        button: {
            height: 48,
            borderRadius: 8,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme.buttonColors.successButtonBackground,
            marginBottom: 12,
        },
        buttonText: {
            fontSize: 16,
            fontWeight: 'bold',
            color: theme.buttonColors.primaryButtonText,
        },
    });

export default StudentSignupForm;
