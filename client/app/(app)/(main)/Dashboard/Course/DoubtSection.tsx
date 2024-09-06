import React, { useState, useRef, useContext, useEffect } from 'react';
import { StyleSheet, View, FlatList, KeyboardAvoidingView, Text, ActivityIndicator, Alert, TextInput, TouchableOpacity } from 'react-native';
import { useAuth } from '@/Context/AuthContext';
import { useLocalSearchParams } from 'expo-router';
import axios from 'axios';
import { BASE_URL } from '@env';
import { ThemeContext } from '@/Context/ThemeContext';
import { io } from 'socket.io-client';
import { format } from 'date-fns';
import { generateColorFromName } from '@/Components/ChatBox/ColorGenerator';
import mongoose from 'mongoose';

type Message = {
    sender_id: {
        _id: mongoose.Types.ObjectId;
        firstName: string;
    };
    chat: string;
    createdAt: string;
    sender: string;
};

const ChatBox = () => {
    const { id } = useLocalSearchParams();
    const { userDetails } = useAuth();
    const { theme } = useContext(ThemeContext);
    const [currentMessage, setCurrentMessage] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const flatListRef = useRef<FlatList<Message>>(null);
    const socket = useRef(io(`${BASE_URL}`));
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/doubts/${id}`);
                setMessages(response.data.chats || []);
            } catch (err) {
                setError("Error fetching messages")
                Alert.alert('Hii', 'Be the first to start conversation');
            } finally {
                setLoading(false);
            }
        };

        fetchMessages();
    }, [id]);

    useEffect(() => {
        socket.current.on('receive_message', (newMessage: Message) => {
            setMessages(prevMessages => [...prevMessages, newMessage]);
            setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
        });

        return () => {
            socket.current.off('receive_message');
        };
    }, []);

    const sendMessage = async (text: string) => {
        if (!userDetails) return Alert.alert('Error', 'Failed to send message');
        const newMessage = {
            sender_id: {
                _id: userDetails.id,
                firstName: userDetails.firstName,
            },
            chat: text,
            createdAt: new Date().toISOString(),
        };

        try {
            socket.current.emit('send_message', newMessage);
            await axios.post(`${BASE_URL}/doubts/${id}/chats`, { sender_id: userDetails.id, chat: text, sender: userDetails.firstName });
            setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 10);
        } catch (error) {
            console.error('Error sending message:', error);
            Alert.alert('Error', 'Failed to send message');
        }
    };

    const handleSend = () => {
        if (currentMessage.trim()) {
            sendMessage(currentMessage.trim());
            setCurrentMessage('');
        }
    };

    const renderItem = ({ item }: { item: Message }) => {
        // console.log(userDetails)
        // console.log(item)
        if (!userDetails || !item.sender_id) return <Text>error message!</Text>;
        const senderName = item.sender_id.firstName || 'Teacher';
        const isCurrentUser = (item.sender_id._id === userDetails.id);

        return (
            <View style={[styles.messageContainer, isCurrentUser ? styles.currentUser : styles.otherUser]}>
                <Text style={[styles.senderName, { color: generateColorFromName(senderName) }]}>{senderName}</Text>
                <Text style={[styles.messageText, { color: theme.colors.onSecondary }]}>{item.chat}</Text>
                <Text style={[styles.timestamp, { color: theme.textColors.disabledText }]}>
                    {format(new Date(item.createdAt), 'HH:mm')}
                </Text>
            </View>
        );
    };

    if (loading) {
        return (
            <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
                <ActivityIndicator size="large" color={theme.colors.primary} />
            </View>
        );
    }

    return (
        <KeyboardAvoidingView style={[styles.container, { backgroundColor: theme.colors.background }]} behavior="padding">
            <View style={[styles.header, { backgroundColor: theme.colors.surface }]}>
                <Text style={[styles.headerText, { color: theme.textColors.primaryText }]}>Doubt Section</Text>
            </View>
            {messages.length === 0 ? (
                <View style={styles.noMessagesContainer}>
                    <Text style={[styles.noMessagesText, { color: theme.textColors.secondaryText }]}>No messages yet</Text>
                </View>
            ) : (
                <FlatList
                    ref={flatListRef}
                    data={messages}
                    keyExtractor={(_, index) => index.toString()}
                    renderItem={renderItem}
                    style={[styles.messagesList, { backgroundColor: theme.colors.background }]}
                    onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
                />

            )}
            <View style={styles.inputContainer}>
                <TextInput
                    style={[styles.input, { backgroundColor: theme.colors.surface, color: theme.textColors.primaryText }]}
                    placeholder="Type a message..."
                    placeholderTextColor={theme.textColors.placeholderText}
                    value={currentMessage}
                    onChangeText={setCurrentMessage}
                />
                <TouchableOpacity
                    style={[styles.sendButton, { backgroundColor: theme.buttonColors.successButtonBackground }]}
                    onPress={handleSend}
                >
                    <Text style={[styles.sendButtonText, { color: theme.buttonColors.secondaryButtonText }]}>Send</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        padding: 10,
        alignItems: 'center',
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    messagesList: {
        flex: 1,
        paddingHorizontal: 10,
    },
    noMessagesContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noMessagesText: {
        fontSize: 16,
        fontStyle: 'italic',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    input: {
        flex: 1,
        padding: 10,
        fontSize: 16,
        borderRadius: 25,
        marginRight: 10,
    },
    sendButton: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 25,
    },
    sendButtonText: {
        fontSize: 16,
    },
    messageContainer: {
        maxWidth: '85%',
        marginVertical: 2,
        paddingTop: 10,
    },
    currentUser: {
        alignSelf: 'flex-end',
        backgroundColor: '#DCF8C6',
        // borderBottomLeftRadius: 10,
        borderBottomRightRadius: 0,
        // borderTopRightRadius: 10,
        borderTopLeftRadius: 20,
        paddingLeft: 10,
        paddingRight: 5,

    },
    otherUser: {
        alignSelf: 'flex-start',
        backgroundColor: '#ECECEC',
        borderBottomLeftRadius: 0,
        // borderBottomRightRadius: 10,
        borderTopRightRadius: 20,
        // borderTopLeftRadius: 10,
        paddingRight: 10,
        paddingLeft: 5,
    },
    senderName: {
        fontWeight: 'bold',
        marginBottom: 3,
        fontSize: 10
    },
    messageText: {
        fontSize: 13,
    },
    timestamp: {
        fontSize: 8,
        textAlign: 'right',
        marginTop: 5,
    },
});

export default ChatBox;
