import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { ThemeContext } from '@/Context/ThemeContext';
import { useAuth } from '@/Context/AuthContext';
import { router } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';

export default function Profile() {
    const { userDetails, logout } = useAuth();

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({ ...userDetails });
    const { theme, toggleTheme } = useContext(ThemeContext);

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleInputChange = (name: string, value: string) => {
        setFormData({ ...formData, [name]: value });
    };

    const updateUserDetails = (formData: any) => {
        console.log(formData);
    };

    const handleSave = () => {
        updateUserDetails(formData);
        setIsEditing(false);
    };

    const handleLogout = async () => {
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
                        logout();
                        router.replace('/auth');
                    },
                },
            ],
            { cancelable: true }
        );
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={[styles.container, { backgroundColor: theme.colors.background }]}
        >
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.profileHeader}>
                    <Image
                        source={{ uri: userDetails.profilePicture || 'https://via.placeholder.com/100' }}
                        style={[styles.profileImage, { borderColor: theme.colors.primary }]}
                    />
                    <View style={styles.userInfo}>
                        {isEditing ? (
                            <>
                                <TextInput
                                    style={[styles.input, { color: theme.textColors.primaryText, borderColor: theme.colors.primary, backgroundColor: theme.colors.surface }]}
                                    value={formData.firstName}
                                    onChangeText={(text) => handleInputChange('firstName', text)}
                                    placeholder="First Name"
                                    placeholderTextColor={theme.textColors.secondaryText}
                                />
                                <TextInput
                                    style={[styles.input, { color: theme.textColors.primaryText, borderColor: theme.colors.primary, backgroundColor: theme.colors.surface }]}
                                    value={formData.lastName}
                                    onChangeText={(text) => handleInputChange('lastName', text)}
                                    placeholder="Last Name"
                                    placeholderTextColor={theme.textColors.secondaryText}
                                />
                            </>
                        ) : (
                            <>
                                <Text style={[styles.name, { color: theme.textColors.primaryText }]}>{userDetails.firstName} {userDetails.lastName}</Text>
                            </>
                        )}
                        <Text style={[styles.email, { color: theme.textColors.secondaryText }]}>{userDetails.email}</Text>
                    </View>
                </View>

                <View style={styles.detailsContainer}>
                    <Text style={[styles.label, { color: theme.textColors.primaryText }]}>Bio:</Text>
                    {isEditing ? (
                        <TextInput
                            style={[styles.input, { color: theme.textColors.primaryText, borderColor: theme.colors.primary, backgroundColor: theme.colors.surface }]}
                            value={formData.bio}
                            onChangeText={(text) => handleInputChange('bio', text)}
                            placeholder="Bio"
                            placeholderTextColor={theme.textColors.secondaryText}
                            multiline
                        />
                    ) : (
                        <Text style={[styles.text, { color: theme.textColors.secondaryText }]}>{userDetails.bio}</Text>
                    )}

                    <Text style={[styles.label, { color: theme.textColors.primaryText }]}>Date of Birth:</Text>
                    {isEditing ? (
                        <TextInput
                            style={[styles.input, { color: theme.textColors.primaryText, borderColor: theme.colors.primary, backgroundColor: theme.colors.surface }]}
                            value={formData.dateOfBirth}
                            onChangeText={(text) => handleInputChange('dateOfBirth', text)}
                            placeholder="YYYY-MM-DD"
                            placeholderTextColor={theme.textColors.secondaryText}
                        />
                    ) : (
                        <Text style={[styles.text, { color: theme.textColors.secondaryText }]}>{userDetails.dateOfBirth}</Text>
                    )}
                </View>

                <TouchableOpacity style={[styles.saveButton, { backgroundColor: theme.buttonColors.primaryButtonBackground }]} onPress={handleSave}>
                    <Text style={[styles.buttonText, { color: theme.buttonColors.primaryButtonText }]}>Save</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.editButton, { backgroundColor: theme.buttonColors.secondaryButtonBackground }]} onPress={handleEditToggle}>
                    <Text style={[styles.buttonText, { color: theme.buttonColors.secondaryButtonText }]}>{isEditing ? 'Cancel' : 'Edit Profile'}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.logoutButton, { backgroundColor: theme.buttonColors.errorButtonBackground }]} onPress={handleLogout}>
                    <Text style={[styles.buttonText, { color: theme.buttonColors.errorButtonText }]}>Logout</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.toggleButton, { backgroundColor: theme.colors.secondary }]}
                    onPress={toggleTheme}
                >
                    <AntDesign name="bulb1" size={24} color={theme.colors.primary} />
                    <Text style={[styles.buttonText, { color: theme.textColors.primaryText }]}>Change Mode</Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContainer: {
        flexGrow: 1,
        padding: 20,
        alignItems: 'center',
    },
    profileHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 2,
        marginRight: 20,
    },
    userInfo: {
        flex: 1,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    email: {
        fontSize: 16,
        marginBottom: 10,
    },
    detailsContainer: {
        width: '100%',
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        fontWeight: '600',
    },
    text: {
        fontSize: 18,
        marginBottom: 15,
    },
    input: {
        fontSize: 18,
        marginBottom: 15,
        padding: 10,
        borderWidth: 1,
        borderRadius: 5,
    },
    saveButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 20,
    },
    editButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 20,
    },
    logoutButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 20,
    },
    toggleButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 18,
        marginLeft: 10,
    },
});
