import React, { useContext } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ThemeContext } from '@/Context/ThemeContext'; // Adjust the import path as needed
import { router } from 'expo-router';

const TestList = ({ tests }) => {
    const { theme } = useContext(ThemeContext);

    const renderItem = ({ item }) => {
        const [date, time] = item.createdAt.split('T');
        const formattedDate = `${date}`;
        const formattedTime = time.split('.')[0];
        return (
            <View style={[styles.itemContainer, { backgroundColor: theme.colors.surface }]}>
                <View style={[styles.marksContainer, { backgroundColor: theme.buttonColors.primaryButtonBackground }]}>
                    <Text style={[styles.marksText, { color: theme.buttonColors.primaryButtonText }]}>{item.total_marks}</Text>
                </View>
                <View style={styles.detailsContainer}>
                    <Text style={[styles.testName, { color: theme.textColors.primaryText }]}>{item.test_id.name}</Text>
                    <View style={{ display: "flex", flexDirection: "row" }}>
                        <Text style={[styles.testDate, { color: theme.textColors.secondaryText }]}>
                            {formattedDate} {formattedTime}
                        </Text>
                        <TouchableOpacity
                            style={[styles.button, { backgroundColor: theme.buttonColors.secondaryButtonBackground }]}
                            onPress={() => {
                                // console.log("Pressed", item.test_id._id)
                                router.push(`/Dashboard/Tests/SingleTest?id=${item.test_id._id}`)
                            }}>
                            <Text style={[styles.buttonText, { color: theme.buttonColors.secondaryButtonText }]}>Attempt Again</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    };

    return (
        <FlatList
            data={tests}
            keyExtractor={(item) => item._id}
            renderItem={renderItem}
        />
    );
};

export default TestList;

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 8,
        marginBottom: 2,
    },
    marksContainer: {
        width: 45,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginRight: 16,
    },
    marksText: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    detailsContainer: {
        flex: 1,
    },
    testName: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    testDate: {
        fontSize: 10,
        flex: 5
    },
    buttonText: {
        fontSize: 8,
    },
    button: {
        padding: 5,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: "center",
        elevation: 2,
        flex: 2
    },
});
