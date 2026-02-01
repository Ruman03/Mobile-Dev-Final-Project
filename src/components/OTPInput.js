// NEXUS OTPInput Component
// 4-box OTP input with hidden TextInput

import React, { useRef } from 'react';
import {
    View,
    TextInput,
    Text,
    StyleSheet,
    Pressable,
} from 'react-native';
import Colors from '../constants/Colors';
import Typography from '../constants/Typography';
import Spacing from '../constants/Spacing';

const OTP_LENGTH = 4;

const OTPInput = ({ value = '', onChangeText, error = false }) => {
    const inputRef = useRef(null);

    const handlePress = () => {
        inputRef.current?.focus();
    };

    const handleChange = (text) => {
        // Only allow numeric input
        const numericText = text.replace(/[^0-9]/g, '');
        if (numericText.length <= OTP_LENGTH) {
            onChangeText(numericText);
        }
    };

    // Determine box states
    const getBoxStyle = (index) => {
        const isFilled = index < value.length;
        const isActive = index === value.length && index < OTP_LENGTH;
        const isError = error;

        if (isError) {
            return {
                borderColor: Colors.border.error,
                borderWidth: 1.5,
            };
        }
        if (isActive) {
            return {
                borderColor: Colors.border.focus,
                borderWidth: 2,
            };
        }
        if (isFilled) {
            return {
                borderColor: Colors.border.focus,
                borderWidth: 1.5,
            };
        }
        return {
            borderColor: Colors.border.default,
            borderWidth: 1.5,
        };
    };

    const getDigitStyle = (index) => {
        if (error) {
            return { color: Colors.error.text };
        }
        return { color: Colors.text.primary };
    };

    return (
        <Pressable onPress={handlePress} style={styles.container}>
            {/* Hidden TextInput */}
            <TextInput
                ref={inputRef}
                style={styles.hiddenInput}
                value={value}
                onChangeText={handleChange}
                keyboardType="numeric"
                maxLength={OTP_LENGTH}
                autoFocus={false}
            />

            {/* Visual Boxes */}
            <View style={styles.boxContainer}>
                {Array(OTP_LENGTH).fill(0).map((_, index) => (
                    <View
                        key={index}
                        style={[styles.box, getBoxStyle(index)]}
                    >
                        <Text style={[styles.digit, getDigitStyle(index)]}>
                            {value[index] || ''}
                        </Text>
                    </View>
                ))}
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
    },
    hiddenInput: {
        position: 'absolute',
        width: 1,
        height: 1,
        opacity: 0,
    },
    boxContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: Spacing.otp.gap,
    },
    box: {
        width: Spacing.otp.boxWidth,
        height: Spacing.otp.boxHeight,
        backgroundColor: Colors.background.card,
        borderRadius: Spacing.radius.otp,
        justifyContent: 'center',
        alignItems: 'center',
    },
    digit: {
        ...Typography.otpDigit,
    },
});

export default OTPInput;
