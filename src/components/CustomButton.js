// NEXUS CustomButton Component
// Primary action button with disabled/loading states

import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    ActivityIndicator,
    View,
} from 'react-native';
import Colors from '../constants/Colors';
import Typography from '../constants/Typography';
import Spacing from '../constants/Spacing';

const CustomButton = ({
    title,
    onPress,
    disabled = false,
    loading = false,
}) => {
    const handlePress = () => {
        if (!disabled && !loading && onPress) {
            onPress();
        }
    };

    return (
        <TouchableOpacity
            style={[
                styles.button,
                (disabled || loading) && styles.buttonDisabled,
            ]}
            onPress={handlePress}
            activeOpacity={0.7}
            disabled={disabled || loading}
        >
            {loading ? (
                <ActivityIndicator color={Colors.text.primary} size="small" />
            ) : (
                <Text style={styles.buttonText}>{title}</Text>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        width: '100%',
        height: Spacing.buttonHeight,
        backgroundColor: Colors.accent.primary,
        borderRadius: Spacing.radius.button,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonDisabled: {
        opacity: 0.4,
    },
    buttonText: {
        ...Typography.button,
    },
});

export default CustomButton;
