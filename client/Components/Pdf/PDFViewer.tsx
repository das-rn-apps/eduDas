import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';
import { ThemeContext } from '@/Context/ThemeContext';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Loader from '../General/Loader';

interface PDFViewerProps {
    selectedBook: string | null;
    setSelectedBook: (url: string | null) => void;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ selectedBook, setSelectedBook }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const { theme } = useContext(ThemeContext);

    useEffect(() => {
        if (selectedBook) {
            setModalVisible(true);
        }
    }, [selectedBook]);

    return (
        <Modal
            visible={modalVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={() => {
                setModalVisible(false);
                setSelectedBook(null);
            }}
        >
            <View style={[styles.modalContainer, { backgroundColor: theme.colors.background }]}>
                <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => {
                        setModalVisible(false);
                        setSelectedBook(null);
                    }}
                >
                    <MaterialIcons name="cancel" size={30} color={theme.buttonColors.errorButtonText} />
                </TouchableOpacity>

                {selectedBook ? (
                    <WebView
                        source={{ uri: selectedBook }}
                        style={styles.pdf}
                        startInLoadingState
                        renderLoading={() => <Loader />}
                        javaScriptEnabled
                        domStorageEnabled
                    />
                ) : (
                    <Text style={[styles.text, { color: theme.colors.primary }]}>No PDF selected</Text>
                )}
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    pdf: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    closeButton: {
        position: 'absolute',
        top: 0,
        right: 5,
        zIndex: 1,
    },
    closeButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    text: {
        fontSize: 16,
    },
});

export default PDFViewer;
