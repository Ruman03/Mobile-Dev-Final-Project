// Error Message Component (No External Icons)
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../styles/colors';
import spacing from '../styles/spacing';

const ErrorMessage = ({ message, style }) => {
    if (!message) return null;

    return (
        <View style={[styles.container, style]}>
            <View style={styles.iconContainer}>
                <Text style={styles.iconText}>!</Text>
            </View>
            <Text style={styles.text}>{message}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.errorLight,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        borderRadius: spacing.borderRadius.md,
        gap: spacing.sm,
    },
    iconContainer: {
        width: 18,
        height: 18,
        borderRadius: 9,
        backgroundColor: colors.error,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconText: {
        color: colors.textWhite,
        fontSize: 11,
        fontWeight: '700',
    },
    text: {
        fontSize: 13,
        color: colors.errorDark,
        flex: 1,
        fontWeight: '500',
    },
});

export default ErrorMessage;
