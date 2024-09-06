import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Platform, Alert, Pressable } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { ThemeContext } from '../../Context/ThemeContext'; // Import ThemeContext
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

    const { theme } = useContext(ThemeContext); // Access the color context

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
        <View style={[styles.container, { backgroundColor: theme.colors.surface }]}>
            <Text style={[styles.label, { color: theme.textColors.primaryText }]}>User type</Text>
            <Picker
                selectedValue={type}
                onValueChange={(itemValue) => setType(itemValue)}
                style={[styles.input, { borderColor: theme.borderColors.defaultBorder, color: theme.textColors.primaryText }]}
            >
                {userTypes?.map(option => (
                    <Picker.Item key={option.value} label={option.label} value={option.value} />
                ))}
            </Picker>
            <Text style={[styles.label, { color: theme.textColors.primaryText }]}>First Name</Text>
            <TextInput
                style={[styles.input, { borderColor: theme.borderColors.defaultBorder, color: theme.textColors.primaryText }]}
                placeholder="Enter your first name"
                placeholderTextColor={theme.textColors.placeholderText}
                value={firstName}
                onChangeText={setFirstName}
            />
            <Text style={[styles.label, { color: theme.textColors.primaryText }]}>Last Name</Text>
            <TextInput
                style={[styles.input, { borderColor: theme.borderColors.defaultBorder, color: theme.textColors.primaryText }]}
                placeholder="Enter your last name"
                placeholderTextColor={theme.textColors.placeholderText}
                value={lastName}
                onChangeText={setLastName}
            />
            <Text style={[styles.label, { color: theme.textColors.primaryText }]}>Email address</Text>
            <TextInput
                style={[styles.input, { borderColor: theme.borderColors.defaultBorder, color: theme.textColors.primaryText }]}
                placeholder="Enter your email"
                placeholderTextColor={theme.textColors.placeholderText}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <Text style={[styles.label, { color: theme.textColors.primaryText }]}>Password</Text>
            <TextInput
                style={[styles.input, { borderColor: theme.borderColors.defaultBorder, color: theme.textColors.primaryText }]}
                placeholder="Enter your password"
                placeholderTextColor={theme.textColors.placeholderText}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
            />
            <Text style={[styles.label, { color: theme.textColors.primaryText }]}>Date of Birth</Text>
            <View style={styles.dateContainer}>
                <TextInput
                    style={[styles.input, styles.dateInput, { borderColor: theme.borderColors.defaultBorder, color: theme.textColors.primaryText }]}
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
            <Button
                title="Sign Up"
                onPress={handleSubmit}
                color={theme.buttonColors.primaryButtonBackground}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 16,
        borderRadius: 4,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderRadius: 4,
        paddingHorizontal: 8,
        marginBottom: 16,
    },
    dateContainer: {
        flexDirection: 'row',
        gap: 5
        // alignItems: 'center',
    },
    dateInput: {
        flex: 1,
    },
});

export default StudentSignupForm;
