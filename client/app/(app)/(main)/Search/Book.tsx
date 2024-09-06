import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { WebView } from 'react-native-webview';
import { BOOKS_KEY } from '@env';


const SearchBooks = () => {
    const [query, setQuery] = useState('');
    const [books, setBooks] = useState([]);
    const [selectedBook, setSelectedBook] = useState(null);

    const searchBooks = async () => {
        try {
            const response = await axios.get(
                `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${BOOKS_KEY}`
            );
            setBooks(response.data.items);
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    };

    if (selectedBook) {
        return (
            <WebView
                source={{ uri: selectedBook.volumeInfo.previewLink }}
                style={{ flex: 1 }}
            />
        );
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Search for books..."
                value={query}
                onChangeText={text => setQuery(text)}
            />
            <Button title="Search" onPress={searchBooks} />
            <FlatList
                data={books}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.bookContainer}
                        onPress={() => setSelectedBook(item)}
                    >
                        <Image
                            style={styles.thumbnail}
                            source={{ uri: item.volumeInfo.imageLinks?.thumbnail }}
                        />
                        <View style={styles.bookDetails}>
                            <Text style={styles.title}>{item.volumeInfo.title}</Text>
                            <Text style={styles.author}>{item.volumeInfo.authors?.join(', ')}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 8,
    },
    bookContainer: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    thumbnail: {
        width: 50,
        height: 75,
        marginRight: 10,
    },
    bookDetails: {
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    author: {
        fontSize: 14,
        color: '#666',
    },
});

export default SearchBooks;
