import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { ThemeContext } from '@/Context/ThemeContext';
import { router, Href } from 'expo-router';

interface CommonRowProps {
    item: {
        _id: string;
        name: string;
        photo: string;
        class?: string;
    };
    onDelete: (id: string) => void;
    editRoute: Href<string>;
}

const CommonRow: React.FC<CommonRowProps> = ({ item, onDelete, editRoute }) => {
    const { theme } = useContext(ThemeContext);
    const styles = getStyles(theme);

    return (
        <View style={styles.row}>
            <View style={styles.cell0}>
                <Image source={{ uri: item.photo || 'https://picsum.photos/200' }} style={styles.image} />
            </View>
            <View style={styles.cell}>
                <Text style={styles.cellText1}>{item.name}</Text>
                <Text style={styles.cellText2}>{item.class ? item.class : 'N/A'}</Text>
            </View>
            <View style={styles.cell2}>
                <MaterialIcons
                    name="edit"
                    size={24}
                    color={theme.buttonColors.secondaryButtonBackground}
                    onPress={() => router.push(editRoute)}
                />
                <MaterialIcons
                    name="delete"
                    size={24}
                    color={theme.buttonColors.errorButtonBackground}
                    onPress={() => onDelete(item._id)}
                />
            </View>
        </View>
    );
};

const getStyles = (theme: any) => StyleSheet.create({
    row: {
        flexDirection: 'row',
        borderBottomWidth: 0.3,
        borderColor: theme.borderColors.defaultBorder,
        paddingVertical: 8,
        alignItems: 'center',
        backgroundColor: theme.backgroundColor,
    },
    cell0: {
        width: 30,
        height: 30,
        borderRadius: 10,
        backgroundColor: "gray",
    },
    image: {
        width: 30,
        height: 30,
        borderRadius: 7,
    },
    cell: {
        flex: 1,
        flexDirection: "row",
        paddingHorizontal: 8,
        alignItems: "center",
    },
    cell2: {
        gap: 10,
        paddingHorizontal: 8,
        flexDirection: 'row',
    },
    cellText1: {
        fontSize: 16,
        flex: 1,
        color: theme.textColors.primaryText,
    },
    cellText2: {
        fontSize: 10,
        color: theme.textColors.secondaryText,
    },
});

export default CommonRow;
