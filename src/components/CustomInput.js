// NEXUS CustomInput Component
// Supports: default, focused, filled, error states with password toggle

import React, { useState } from 'react';
import {
    View,
    TextInput,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../constants/Colors';
import Typography from '../constants/Typography';
import Spacing from '../constants/Spacing';

const CustomInput = ({
    label,
    placeholder,
    value = '',
    onChangeText,
    secureTextEntry = false,
    showToggle = false,
    error = null,
    keyboardType = 'default',
    onBlur = null,
    autoCapitalize = 'none',
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const [isSecureVisible, setIsSecureVisible] = useState(false);

    // Determine visual state
    const hasError = error !== null && error !== undefined;

    // Get border color based on state
    const getBorderColor = () => {
        if (hasError) return Colors.border.error;
        if (isFocused) return Colors.border.focus;
        return Colors.border.default;
    };

    // Get border width based on state
    const getBorderWidth = () => {
        if (hasError) return 1.5;
        if (isFocused) return 1.5;
        return 1;
    };

    // Get label color based on state
    const getLabelColor = () => {
        if (hasError) return Colors.error.text;
        if (isFocused) return Colors.accent.primary;
        return Colors.text.secondary;
    };

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
        if (onBlur) {
            onBlur();
        }
    };

    const toggleSecureEntry = () => {
        setIsSecureVisible(!isSecureVisible);
    };

    return (
        <View style={styles.container}>
            {/* Label */}
            <Text style={[styles.label, { color: getLabelColor() }]}>
                {label}
            </Text>

            {/* Input Container */}
            <View
                style={[
                    styles.inputContainer,
                    {
                        borderColor: getBorderColor(),
                        borderWidth: getBorderWidth(),
                    },
                ]}
            >
                <TextInput
                    style={styles.input}
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    placeholderTextColor={Colors.text.placeholder}
                    secureTextEntry={secureTextEntry && !isSecureVisible}
                    keyboardType={keyboardType}
                    autoCapitalize={autoCapitalize}
                    autoCorrect={false}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />

                {/* Eye Toggle for Password */}
                {showToggle && (
                    <TouchableOpacity
                        style={styles.toggleButton}
                        onPress={toggleSecureEntry}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                        <Icon
                            name={isSecureVisible ? 'eye-off' : 'eye'}
                            size={Spacing.icon.medium}
                            color={Colors.text.placeholder}
                        />
                    </TouchableOpacity>
                )}
            </View>

            {/* Error Message */}
            {hasError && (
                <View style={styles.errorContainer}>
                    <Icon
                        name="warning"
                        size={12}
                        color={Colors.error.text}
                        style={styles.errorIcon}
                    />
                    <Text style={styles.errorText}>{error}</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    label: {
        ...Typography.label,
        marginBottom: Spacing.sm,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: Spacing.inputHeight,
        backgroundColor: Colors.background.card,
        borderRadius: Spacing.radius.input,
        paddingHorizontal: Spacing.md,
    },
    input: {
        flex: 1,
        ...Typography.input,
        height: '100%',
        padding: 0,
    },
    toggleButton: {
        padding: Spacing.xs,
        marginLeft: Spacing.sm,
    },
    errorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 6,
    },
    errorIcon: {
        marginRight: 4,
    },
    errorText: {
        ...Typography.error,
    },
});

export default CustomInput;
