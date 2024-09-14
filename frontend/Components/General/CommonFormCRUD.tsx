import React, { useContext, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View, Switch, TouchableOpacity, Pressable, Image, KeyboardAvoidingView } from 'react-native';
import { ThemeContext } from '@/Context/ThemeContext';
import DateTimePicker from '@react-native-community/datetimepicker';
import { FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';



export type FieldType = 'text' | 'number' | 'date' | 'boolean' | 'textarea' | 'email' | 'image' | 'select';

export type Field = {
    name: string;
    label: string;
    type: FieldType;
    value: any;
    onChange: (value: any) => void;
    options: any
};

export type DynamicFormProps = {
    fields: Field[];
    onSave: () => void;
    onDelete?: () => void;
};

const CommonFormCRUD: React.FC<DynamicFormProps> = ({ fields, onSave, onDelete }) => {
    const { theme } = useContext(ThemeContext);

    const handleImagePicker = async (onChange: (value: any) => void) => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 0.001,
            base64: true,
        });

        if (!result.canceled) {
            // console.log(result.assets[0].base64)
            onChange(result.assets[0].base64);
        }
    };

    const renderField = (field: Field) => {
        switch (field.type) {
            case 'text':
            case 'email':
            case 'number':
                return (
                    <View key={field.name}>
                        <Text style={[styles.label, { color: theme.textColors.secondaryText }]}>{field.label}</Text>
                        <TextInput
                            placeholder={field.label}
                            value={field.value?.toString() || ''}
                            onChangeText={(text) => field.onChange(text)}
                            keyboardType={field.type === 'number' ? 'numeric' : 'default'}
                            style={[
                                styles.input,
                                { borderColor: theme.borderColors.defaultBorder, color: theme.textColors.primaryText, backgroundColor: theme.colors.surface }
                            ]}
                            placeholderTextColor={theme.textColors.placeholderText}
                        />
                    </View>
                );
            case 'textarea':
                return (
                    <View key={field.name}>
                        <Text style={[styles.label, { color: theme.textColors.secondaryText }]}>{field.label}</Text>
                        <TextInput
                            placeholder={field.label}
                            value={field.value?.toString() || ''}
                            onChangeText={(text) => field.onChange(text)}
                            style={[
                                styles.textarea,
                                { borderColor: theme.borderColors.defaultBorder, color: theme.textColors.primaryText, backgroundColor: theme.colors.surface }
                            ]}
                            placeholderTextColor={theme.textColors.placeholderText}
                            multiline
                            numberOfLines={4}
                        />
                    </View>
                );
            case 'date':
                return (
                    <View key={field.name}>
                        <Text style={[styles.label, { color: theme.textColors.secondaryText }]}>{field.label}</Text>
                        <View style={styles.dateContainer}>
                            <TextInput
                                style={[
                                    styles.input,
                                    styles.dateInput,
                                    { borderColor: theme.borderColors.defaultBorder, color: theme.textColors.primaryText }
                                ]}
                                placeholder={field.label}
                                placeholderTextColor={theme.textColors.placeholderText}
                                value={
                                    field.value?.date
                                        ? new Date(field.value.date).toISOString().split('T')[0]
                                        : ''
                                }
                                editable={false}
                            />
                            <Pressable onPress={() => field.onChange({ ...field.value, showPicker: true })}>
                                <FontAwesome name="calendar" size={38} color={theme.colors.primary} />
                            </Pressable>
                            {field.value?.showPicker && (
                                <DateTimePicker
                                    value={field.value?.date || new Date()}
                                    mode="date"
                                    display="default"
                                    onChange={(event, selectedDate) => {
                                        if (selectedDate) {
                                            field.onChange({ date: selectedDate, showPicker: false });
                                        } else {
                                            field.onChange({ ...field.value, showPicker: false });
                                        }
                                    }}
                                />
                            )}
                        </View>
                    </View>
                );
            case 'boolean':
                return (
                    <View key={field.name} style={styles.switchContainer}>
                        <Text style={[styles.label, { color: theme.textColors.secondaryText }]}>{field.label}</Text>
                        <Switch
                            value={field.value}
                            onValueChange={field.onChange}
                            trackColor={{
                                false: theme.buttonColors.errorButtonBackground,
                                true: theme.buttonColors.successButtonBackground
                            }}
                        />
                    </View>
                );
            case 'image':
                return (
                    <View key={field.name}>
                        <Text style={[styles.label, { color: theme.textColors.secondaryText }]}>{field.label}</Text>
                        <View style={styles.imageContainer}>
                            <TextInput
                                placeholder={field.label}
                                value={field.value?.toString() || ''}
                                style={[
                                    styles.input,
                                    { borderColor: theme.borderColors.defaultBorder, color: theme.textColors.primaryText, flex: 1 }
                                ]}
                                placeholderTextColor={theme.textColors.placeholderText}
                            />
                            <FontAwesome name="image" size={38} color={theme.colors.primary} onPress={() => handleImagePicker(field.onChange)} />
                        </View>
                        {field.value && (
                            <Image source={{ uri: field.value }} style={styles.imagePreview} />
                        )}
                    </View>
                );
            case 'select':
                return (
                    <View key={field.name}>
                        <Text style={[styles.label, { color: theme.textColors.secondaryText }]}>{field.label}</Text>
                        <Picker
                            selectedValue={field.value}
                            onValueChange={(itemValue) => field.onChange(itemValue)}
                            style={[
                                styles.input,
                                { borderColor: theme.borderColors.defaultBorder, color: theme.textColors.primaryText, backgroundColor: theme.colors.surface }
                            ]}
                        >
                            {field.options?.map(option => (
                                <Picker.Item key={option.value} label={option.label} value={option.value} />
                            ))}
                        </Picker>
                    </View>
                );
            default:
                return null;
        }
    };

    return (
        <KeyboardAvoidingView
            style={[styles.container, { backgroundColor: theme.colors.background }]}
        >
            <ScrollView>
                {fields.map(renderField)}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: theme.buttonColors.primaryButtonBackground }]}
                        onPress={onSave}
                    >
                        <Text style={styles.buttonText}>Save</Text>
                    </TouchableOpacity>
                    {onDelete && (
                        <TouchableOpacity
                            style={[styles.button, { backgroundColor: theme.buttonColors.errorButtonBackground }]}
                            onPress={onDelete}
                        >
                            <Text style={styles.buttonText}>Add Childs</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    input: {
        borderRadius: 9,
        padding: 7,
        marginBottom: 7,
        fontSize: 14,
    },
    textarea: {
        borderRadius: 10,
        padding: 7,
        marginBottom: 7,
        fontSize: 14,
        height: "auto",
    },
    dateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 7,
    },
    dateInput: {
        marginRight: 10,
        flex: 1,
    },
    switchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 7,
    },
    label: {
        fontSize: 10,
        fontWeight: '500',
        color: "gray",
    },
    buttonContainer: {
        marginVertical: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        flex: 1,
        paddingVertical: 7,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 5,
    },
    buttonText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '600',
    },
    imageContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 10
    },
    imagePreview: {
        width: 50,
        height: 50,
        borderRadius: 7,
        borderWidth: 1,
        borderColor: '#ccc',
    },
});

export default CommonFormCRUD;